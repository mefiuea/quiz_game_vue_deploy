<template>
  <!--container with START button-->
  <div class="flex w-full h-screen justify-center items-center" v-if="isStart === false">
    <div class="w-full max-w-xl">
      <div class="flex bg-white p-12 rounded-lg shadow-lg w-full mt-8 justify-center items-center">
        <button
            class="px-2 py-2 myButton"
            style="width: 200px; height: 100px"
            v-on:click="fetchData()"
        >
          START
        </button>
      </div>
    </div>
  </div>

  <!--container with questions-->

  <div class="flex w-full h-screen justify-center items-center" v-if="isStart === true && isFinish === false">
    <div class="w-full max-w-xl">
      <h1 class="font-bold text-5xl text-center text-indigo-700">Quiz game</h1>
      <!--question and answer and results container-->
      <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8">
        <!--display div with questions-->
        <div v-if="questionIndex-1 < questionCounter">
          <p v-if="questions.length > 0" class="text-2xl font-bold" v-html="questions[questionIndex - 1].question"></p>
          <!--<p v-if="questions.length > 0" class="text-2xl font-bold">{{ questions[questionIndex - 1].question }}</p>-->
          <div
              v-for="answer in questions[questionIndex-1].choices"
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
                v-on:click="timer(); nextQuestion()"
            >
              Next &gt;
            </button>
            <!--previous question button-->
            <button
                class="float-left px-5 py-2 myButton"
                v-show="questionIndex - 1 >= 0"
                :disabled="questionIndex - 1 === 0"
                v-on:click="timer(); previousQuestion()"
            >
              &lt; Previous
            </button>
            <!--finish quiz button-->
            <button
                class="float-right px-5 py-2 myButton"
                v-show="questionIndex - 1 === questionCounter - 1"
                :disabled="selectedAnswer === undefined || selectedAnswer === ''"
                v-on:click="timer(); showResults()"
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--results view-->
  <div class="flex w-full justify-center items-center" v-if="isStart === true && isFinish === true">
    <div class="w-full max-w-xl">
      <div class="bg-white p-12 rounded-lg shadow-lg w-full mt-8 mb-8">
        <div class="font-bold text-5xl text-center mb-10">Results:</div>
        <div class="font-bold text-2xl text-center mb-10">Correct answers: {{this.correctAnswers }}/{{ this.questionCounter }}</div>
        <div class="font-bold text-2xl text-center mb-10">Total time: {{ this.timerGlobalDelta }} [s]</div>
        <div class="font-bold text-2xl text-center mb-10">Timer question dictionary: {{ this.timerQuestionDictionary }}</div>
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
      questionCounter: 0,  // total number of questions
      widthProgress: 0,  // progress bar width - using in style
      correctAnswers: 0, // counter for correct answers
      wrongAnswers: 0,  // counter for wrong answers
      timerGlobalStart: 0, // timer to count total time for whole quiz - run right after all data from external api are collected
      timerGlobalStop: 0, // variable to store time after click finish button
      timerGlobalDelta: 0, // variable to store time difference between timerGlobalStop and timerGlobalStart
      timerStart: 0, // variable to store time every time when next or previous button is clicked - used in timer() function
      actualTime: 0, // variable to store time - corresponding with timerStart variable
      timerDelta: 0, // variable to store difference between actualTimer and timerStart
      timerQuestionDictionary: {}, // dictionary to store time for each specific question
      isStart: false, // variable to check if start button was clicked - after this quiz is starting
      isFinish: false, // variable to check if finish button was clicked - after this results are shown
      questions: [], // array to store dictionaries with questions-answers-correct answer
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
      const apiUrl = 'https://opentdb.com/api.php?amount=5';

      const request = async () => {
        const response = await fetch(apiUrl);
        console.log(response);
        const data = await response.json();
        console.log('data: ', data.results);

        // copy data from external api to my dictionary 'questions'
        for (let i = 0; i < data.results.length; i++) {
          const dict = {
            question: data.results[i].question,
            choices: data.results[i].incorrect_answers,
            correctAnswer: data.results[i].correct_answer,
          }
          dict.choices.push(data.results[i].correct_answer)
          dict.choices = this.shuffle(dict.choices)
          this.questions.push(dict)
        }

        console.log('questions: ', this.questions)

        // update total number of questions
        this.questionCounter = this.questions.length;

        // allow to generate divs with questions - after all data is download from external api
        this.isStart = true;

        // create timer dictionary and fill with empty numbers
        for (let i = 1; i < this.questions.length + 1; i++) {
          this.timerQuestionDictionary[i] = 0;
        }

        //start timers
        this.timerGlobalStart = Date.now();
        this.timerStart = Date.now();
      }

      request();
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
    // Finish button
    showResults() {
      // this.questionIndex++;
      this.isFinish = true;
      console.log('RESULTS: ')
      this.info();
      // compare correct answers with answers selected by user
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].correctAnswer === this.selectedAnswersDictionary[i + 1]) {
          this.correctAnswers++
        } else {
          this.wrongAnswers++
        }
      }
      console.log('Correct answers = ', this.correctAnswers)
      console.log('Wrong answers = ', this.wrongAnswers)
      // calculate total time
      // save actual time
      this.timerGlobalStop = Date.now()
      // calculate difference between global timer start and stop and convert to seconds
      this.timerGlobalDelta = Math.floor((this.timerGlobalStop - this.timerGlobalStart) / 1000)
    },
    // static methods
    updateProgressBar() {
      // console.log(Object.keys(this.selectedAnswersDictionary).length)
      // update progress bar
      this.widthProgress = (Object.keys(this.selectedAnswersDictionary).length / this.questionCounter) * 100;
      console.log(this.widthProgress);
    },
    timer() {
      // timer
      this.actualTime = Date.now()
      this.timerDelta = this.actualTime - this.timerStart
      // save data to dictionary
      // add selected answer to dictionary depending on question index
      this.timerQuestionDictionary[this.questionIndex] += Math.floor(this.timerDelta / 1000)
      // start timer
      this.timerStart = Date.now()
    },
    // function to randomize word position in correct answers array this.questions.correctAnswer
    shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
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
