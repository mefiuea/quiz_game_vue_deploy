<template>
  <div class="antialiased text-gray-700 bg-gray-100" @click="debug()">
    <div class="flex justify-center">
      <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-4 rounded-full" @click="fetchData">
        Pobierz dane
      </button>
    </div>
    <div class="container mx-auto">
      <div class="flex justify-center">
        <p>Questions:</p>
        <p class="">{{ questions }}</p>
      </div>
    </div>
    <div class="flex w-full h-screen justify-center items-center">
      <div class="w-full max-w-xl">
        <h1 class="font-bold text-5xl text-center text-indigo-700">Quiz game</h1>
        <!--        question and answer container-->
        <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
          <p v-if="questions.length > 0" class="text-2xl font-bold">{{ questions[questionIndex - 1]['question'] }}</p>
          <div
              v-for="answer in questions[questionIndex-1]['choices']"
              class="block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg option-default answer-option"
              v-bind:key="answer"
              v-on:click="selectedAnswerFunction($event)"
              v-on:mouseover="hoverClassOn($event)"
              v-on:mouseout="hoverClassOff($event)"
              :class="{'option-selected': selectedAnswersDictionary[questionIndex] === answer}"
          >
            {{ answer }}
          </div>
          <!--progress status-->
          <div class="mt-8 text-center">
            <div class="h-1 w-12 bg-gray-800 rounded-full mx-auto">
              <p>2/10</p>
            </div>
          </div>
          <!--next question button-->
          <div class="mt-6 flow-root">
            <button
                class="float-right px-5 py-2 myButton"
                v-show="questionIndex - 1 < questionCounter - 1"
                :disabled="selectedAnswer === ''"
                v-on:click="nextQuestion()"
            >
              Next &gt;
            </button>
            <!--previous question button-->
            <button
                class="float-left px-5 py-2 myButton"
                v-show="questionIndex - 1 >= 0"
                :disabled="questionIndex - 1 === 0"
                v-on:click="previousQuestion()"
            >
              &lt; Previous
            </button>
            <!--finish quiz button-->
            <button
                class="float-right px-5 py-2 myButton"
                v-show="questionIndex - 1 === questionCounter - 1"
                :disabled="selectedAnswer === ''"
                v-on:click="showResults()"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      isHovering: false,
      selectedAnswer: '',
      selectedAnswersDictionary: {},
      questionIndex: 1,
      questionCounter: 3,
      questions: [
        {
          question: 'question 1 bla bla',
          choices: {a: 'plecak', b: 'torba', c: 'Zegarek', d: 'monitor'},
          correctAnswer: 'torba',
        },
        {
          question: 'question 2 test test',
          choices: {a: 'option 1', b: 'option 2', c: 'option 3', d: 'option 4'},
          correctAnswer: 'option 1',
        },
        {
          question: 'question 3 gdffgdgdf',
          choices: {a: 'option 1', b: 'option 2', c: 'option 3', d: 'option 4'},
          correctAnswer: 'option 4',
        },
      ],
      currentQuestion: {
        question: '',
        answer: 1,
        choices: []
      },
    }
  },
  methods: {
    debug() {
      // console.log('*********************************')
      // console.log('Debug mode console log')
      // console.log('Selected answers dictionary: ', this.selectedAnswersDictionary)
      // console.log('*********************************')
    },
    fetchData() {
      const apiUrl = 'https://opentdb.com/api.php?amount=10';

      fetch(apiUrl)
          .then((response) => {
            console.log('RESPONSE: ', response)
            return response.json();
          })
          .then((data) => {
            console.log('DATA: ', data)
            return this.questions = data.results;
          })
          .catch((error) => {
            return console.log('Error: ', error.message)
          })
    },
    selectedAnswerFunction(event) {
      // value of selected answer
      this.selectedAnswer = event.target.innerText;
      console.log(this.selectedAnswer = event.target.innerText)
      // add selected answer to dictionary depending on question index
      this.selectedAnswersDictionary[this.questionIndex] = this.selectedAnswer;
      console.log(this.selectedAnswersDictionary)

      this.resetAllClassesToDefault()
      event.target.classList.remove('option-default');
      event.target.classList.add('option-selected');
    },
    hoverClassOn(event) {
      this.isHovering = true
      // console.log('hover on: ', this.isHovering)
      event.target.classList.add('option-hover')
    },
    hoverClassOff(event) {
      this.isHovering = false
      // console.log('hover off: ', this.isHovering)
      event.target.classList.remove('option-hover')
    },
    nextQuestion() {
      this.questionIndex++;
      this.selectedAnswer = '';
      this.resetAllClassesToDefault();
    },
    previousQuestion() {
      this.questionIndex--;
      this.selectedAnswer = '';
      // check what answer was selected in specific question depending on question index and answered question dictionary
      // based on this data - update selectedAnswer variable and adding an option-selected class to div element
      console.log('Actual question number= ', this.questionIndex)
      this.selectedAnswer = this.selectedAnswersDictionary[this.questionIndex]
      console.log('selectedAnswerForThisQuestion', this.selectedAnswer)
      let questions = document.getElementsByClassName('answer-option')
      let questionsArray = Array.from(questions)
      questionsArray.forEach(function (question) {
        console.log('temp():', question)
      })
    },
    showResults() {

    },
    // static methods
    resetAllClassesToDefault() {
      // reset all classes to default
      // Changing class of the selected answer - the rest of answers get default class
      // collect all div elements with answers
      let allDivElements = Array.from(document.getElementsByClassName('answer-option'))
      allDivElements.forEach(function (cls) {
        cls.classList.remove('option-selected')
        cls.classList.add('option-default')
      })
    },
  },
  beforeMount() {
  }
}
</script>

<style>

</style>
