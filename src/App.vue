<template>
  <div class="antialiased text-gray-700 bg-gray-100">
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
        <!--        question and answer and results container-->
        <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
          <!--display div with questions-->
          <div v-if="questionIndex-1 < questionCounter">
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
              <div class="flex justify-center items-center">
                <span class="text-black text-xs">Saved questions</span>
              </div>
              <div class="mb-4 w-full h-1 bg-gray-200 rounded-full dark:bg-gray-700">
                <div class="h-1 bg-yellow-500 font-medium text-blue-100 rounded-full"
                     :style="{width: widthProgress + '%'}"></div>
              </div>
              <p>Question: {{ questionIndex }}/{{ questionCounter }}</p>
            </div>
            <!--next question button-->
            <div class="mt-6 flow-root">
              <button
                  class="float-right px-5 py-2 myButton"
                  v-show="questionIndex - 1 < questionCounter - 1"
                  :disabled="selectedAnswer === undefined || selectedAnswer === ''"
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
                  :disabled="selectedAnswer === undefined || selectedAnswer === ''"
                  v-on:click="showResults()"
              >
                Finish
              </button>
            </div>
          </div>
          <!--display div with results-->
          <!--                    <div v-else>-->
          <br>
          <hr>
          <br>
          <div>

            <div class="font-bold text-5xl text-center mb-10">Results:</div>
            <div class="font-bold text-2xl text-center mb-10">Correct answers: {{ this.correctAnswers }}/{{ this.questionCounter }}</div>
            <div class="mb-16" v-for="(question, idx) in questions" v-bind:key="question">
              <p class="font-bold text-3xl text-center bg-red-200 bg-opacity-50 rounded-full p-2 m-2"
                 v-bind:class="{'bg-green-200 bg-opacity-50 rounded-full p-2 m-2': question.correctAnswer === selectedAnswersDictionary[idx + 1]}">
                {{ question.question }}</p>
              <p class="border-yellow-500 border-2 rounded-full p-2 m-2 font-bold">Your answer: <span
                  class="font-light text-2xl">{{ selectedAnswersDictionary[idx + 1] }}</span></p>
              <p class="border-green-500 border-2 rounded-full p-2 m-2 font-bold">Correct answer: <span
                  class="font-light text-2xl">{{ question.correctAnswer }}</span></p>
            </div>
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
      isHovering: false, // variable to indicate if user has hovered the mouse over the answer
      selectedAnswer: '',  // variable to store actual selected answer
      selectedAnswersDictionary: {}, // dictionary to collect all answers from user depending on question number
      questionIndex: 1, // actual question number
      questionCounter: 3,  // total number of questions
      widthProgress: 0,  // progress bar width - using in style
      correctAnswers: 0, // counter for correct answers
      wrongAnswers: 0,  // counter for wrong answers
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
    info() {
      console.log('*********************************')
      console.log('selectedAnswer = ', this.selectedAnswer)
      console.log('selectedAnswersDictionary = ', this.selectedAnswersDictionary)
      console.log('questionIndex = ', this.questionIndex)
      console.log('*********************************')
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
      // console.log(this.selectedAnswersDictionary)
      // update progress bar
      this.updateProgressBar()
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
      this.selectedAnswer = this.selectedAnswersDictionary[this.questionIndex]
      this.info()
    },
    previousQuestion() {
      this.questionIndex--;
      this.selectedAnswer = '';
      // check what answer was selected in specific question depending on question index and answered question dictionary
      // based on this data - update selectedAnswer variable
      // console.log('Actual question number= ', this.questionIndex)
      this.selectedAnswer = this.selectedAnswersDictionary[this.questionIndex]
      // console.log('selectedAnswerForThisQuestion', this.selectedAnswer)
      this.info()
      // update progress bar
      this.updateProgressBar()
    },
    showResults() {
      this.questionIndex++;
      console.log('RESULTS: ')
      this.info();
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].correctAnswer === this.selectedAnswersDictionary[i+1]) {
          this.correctAnswers++
        }
        else {
          this.wrongAnswers++
        }
      }
      console.log('Correct answers = ', this.correctAnswers)
      console.log('Wrong answers = ', this.wrongAnswers)
    },
    // static methods
    updateProgressBar() {
      // console.log(Object.keys(this.selectedAnswersDictionary).length)
      // update progress bar
      this.widthProgress = (Object.keys(this.selectedAnswersDictionary).length / this.questionCounter) * 100;
      console.log(this.widthProgress);
    }
  },
  beforeMount() {
    console.log('*********************************')
    console.log('selectedAnswer = ', this.selectedAnswer)
    console.log('selectedAnswersDictionary = ', this.selectedAnswersDictionary)
    console.log('questionIndex = ', this.questionIndex)
    console.log('*********************************')
  }
}
</script>

<style>

</style>
