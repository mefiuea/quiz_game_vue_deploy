<template>
  <body>
  <!--START view-->
  <div class="flex w-full h-screen justify-center items-center" v-if="isStart === false">
    <div class="w-full max-w-xl text-center">
      <div class="flex-1 bg-white p-12 rounded-lg shadow-lg w-full mt-8 justify-center items-center">
        <button
            class="px-2 py-2 myButton align-super"
            style="width: 200px; height: 100px;"
            v-on:click="fetchData()"
            v-if="isLoading === false && isErrorDuringFetch === false"
        >
          START
        </button>
        <div v-if="isLoading === true && isErrorDuringFetch === false">loading questions...</div>
        <div v-if="isLoading === false && isErrorDuringFetch === true">Failed to load questions. Something went wrong.
        </div>
        <p class="font-bold mt-4 mb-2">Select number of questions</p>
        <div class="flex justify-center">
          <div
              class="text-white font-bold py-2 px-4 rounded m-3 select-number"
              v-bind:class="{'text-green-400' : selectedNumberOfQuestions === 5}"
              v-on:click="selectedNumberOfQuestions = 5"
          >
            5
          </div>
          <div
              class="text-white font-bold py-2 px-4 rounded m-3 select-number"
              v-bind:class="{'text-green-400' : selectedNumberOfQuestions === 10}"
              v-on:click="selectedNumberOfQuestions = 10"
          >
            10
          </div>
        </div>
      </div>
    </div>
  </div>

  <!--questions view-->
  <div class="flex w-full h-screen justify-center items-center" v-if="isStart === true && isFinish === false">
    <div class="w-full max-w-xl">
      <h1 class="font-bold text-5xl text-center quiz-text">Quiz game</h1>
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
              v-bind:class="{'option-selected': selectedAnswersDictionary[questionIndex] === answer}"
              v-html="answer"
          ></div>
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
        <!--chart with correct/wrong answers-->
        <p class="text-center font-bold text-2xl">Correct/wrong answers</p>
        <div class="chart-container">
          <canvas id="myChartQuestionsResults" width="400" height="400"></canvas>
        </div>
        <div class="font-bold text-xl text-center mb-10 mt-5">Correct answers: {{this.correctAnswers }}/{{ this.questionCounter }}
        </div>
        <!--chart with time spent for answers-->
        <p class="text-center font-bold text-2xl">Time spent for each question [s]</p>
        <div class="chart-container">
          <canvas id="myChartTimeResults" width="400" height="400"></canvas>
        </div>
        <div class="font-bold text-xl text-center mb-10 mt-5">Total time: {{ this.timerGlobalDelta }} [s]</div>
        <!--results - questions-->
        <div class="mb-16 relative" v-for="(question, idx) in questions" v-bind:key="question">
          <div class="bg-blue-400 p-1 transform rotate-45 rounded-md h-10 w-10 text-white font-bold text-center
          absolute right-0 -top-8 shadow-2xl question">
            <p class="transform -rotate-45">q{{ idx + 1 }}</p>
          </div>
          <p class="font-bold text-3xl text-center bg-red-200 bg-opacity-50 rounded p-2 m-2"
             v-bind:class="{'bg-green-200 bg-opacity-50 rounded p-2 m-2': question.correctAnswer === selectedAnswersDictionary[idx + 1]}"
             v-html="question.question"
          ></p>
          <p class="border-yellow-500 border-2 rounded-full p-2 m-2 font-bold">Your answer: <span
              class="font-light text-2xl" v-html="selectedAnswersDictionary[idx + 1]"></span></p>
          <p class="border-green-500 border-2 rounded-full p-2 m-2 font-bold">Correct answer: <span
              class="font-light text-2xl" v-html="question.correctAnswer"></span></p>
        </div>
      </div>
    </div>
  </div>
  </body>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: "App",
  data() {
    return {
      isHovering: false,  // variable to indicate if user has hovered the mouse over the answer
      selectedAnswer: '',  // variable to store actual selected answer
      selectedAnswersDictionary: {},  // dictionary to collect all answers from user depending on question number
      questionIndex: 1,  // actual question number
      questionCounter: 0,  // total number of questions
      widthProgress: 0,  // progress bar width - using in style
      correctAnswers: 0,  // counter for correct answers
      wrongAnswers: 0,  // counter for wrong answers
      timerGlobalStart: 0,  // timer to count total time for whole quiz - run right after all data from external api are collected
      timerGlobalStop: 0,  // variable to store time after click finish button
      timerGlobalDelta: 0,  // variable to store time difference between timerGlobalStop and timerGlobalStart
      timerStart: 0,  // variable to store time every time when next or previous button is clicked - used in timer() function
      actualTime: 0,  // variable to store time - corresponding with timerStart variable
      timerDelta: 0,  // variable to store difference between actualTimer and timerStart
      timerQuestionDictionary: {},  // dictionary to store time for each specific question
      isStart: false,  // variable to check if start button was clicked - after this quiz is starting
      isFinish: false,  // variable to check if finish button was clicked - after this results are shown
      questions: [],  // array to store dictionaries with questions-answers-correct answer
      isLoading: false,  // change status to true if start button is pressed
      isErrorDuringFetch: false,  // indicates an error - render new view with information
      startGenerateChart: false,  // variable indicating when to start generating charts - used in showResults()/updated
      selectedNumberOfQuestions: 5,  // variable on first view - allows to choose number of questions - default 5
    }
  },
  methods: {
    fetchData() {
      /**
       * Function to get data from external api.
       * In addition, setting the launch variables.
       * Started when the START button is pressed.
       */

          // creating query string
      let params = new URLSearchParams();
      params.append('amount', this.selectedNumberOfQuestions.toString())
      const apiUrl = 'https://opentdb.com/api.php?' + params.toString();

      // this variable change view to loading view on START page
      this.isLoading = true

      // send request to external api. Catch errors when it is not possible to get data from external api.
      const request = async () => {
        try {
          const response = await fetch(apiUrl).catch(function (error) {
            console.log('Problems: ', error)
          });
          console.log(response);
          console.log('response status: ', response.status);
          const data = await response.json();
          console.log('data: ', data.results);
          this.prepareQuestions(data);
        } catch (err) {
          console.error('MyError: ', err)
          this.isLoading = false
          this.isErrorDuringFetch = true
          throw err
        }
      }
      request();

    },
    prepareQuestions(data) {
      /**
       * Function called when data from external api has been successfully retrieved.
       * In addition, setting the launch variables.
       * Function call inside fetchData().
       */

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

      // console.log('questions: ', this.questions)

      // update total number of questions
      this.questionCounter = this.questions.length;

      // allow to generate view with questions - after all data is download from external api
      this.isStart = true;

      // create timer dictionary and fill with empty numbers
      for (let i = 1; i < this.questions.length + 1; i++) {
        this.timerQuestionDictionary[i] = 0;
      }

      //start timers
      this.timerGlobalStart = Date.now();
      this.timerStart = Date.now();

    },
    selectedAnswerFunction(event) {
      /**
       * Function save selected answer to a variable and adds it to dictionary.
       * In addition, it updates progress bar.
       * Function called when any answer under a given question is selected (click event).
       */

      // assigning content of answer to a variable
      this.selectedAnswer = event.target.innerText;
      // console.log(this.selectedAnswer = event.target.innerText)

      // add selected answer to dictionary depending on question index
      this.selectedAnswersDictionary[this.questionIndex] = this.selectedAnswer;
      // console.log(this.selectedAnswersDictionary)

      // update progress bar
      this.updateProgressBar()
    },
    hoverClassOn(event) {
      /**
       * Function changes class of answer container when mouse hovers it.
       */

      this.isHovering = true
      event.target.classList.add('option-hover')
    },
    hoverClassOff(event) {
      /**
       * Function changes class of answer container when mouse hovers it.
       */

      this.isHovering = false
      event.target.classList.remove('option-hover')
    },
    nextQuestion() {
      /**
       * Function to scroll through views with questions. Shows new question.
       * Function called when next question button is pressed.
       */

      // increment question number
      this.questionIndex++;

      // reset selected answer
      // this.selectedAnswer = '';

      // save value from dictionary to selected answer
      this.selectedAnswer = this.selectedAnswersDictionary[this.questionIndex]

      // show debug information in browser console
      this.info()
    },
    previousQuestion() {
      /**
       * Function to scroll through views with questions. Shows previous question.
       * Function called when next question button is pressed.
       */

      // decrement question number
      this.questionIndex--;

      // reset selected answer
      // this.selectedAnswer = '';

      // check what answer was selected in specific question depending on question index and answered question dictionary
      // based on this data - update selectedAnswer variable
      this.selectedAnswer = this.selectedAnswersDictionary[this.questionIndex]

      // show debug information in browser console
      this.info()

      // update progress bar
      // this.updateProgressBar()
    },
    showResults() {
      /**
       * Function to set variables before displaying results.
       * Function called when finish button is pressed.
       */

      // this.questionIndex++;

      // variable to allows to generate results view
      this.isFinish = true;

      // show debug information in browser console
      this.info();

      // compare correct answers (questions dictionary) with answers selected by user (selectedAnswersDictionary dictionary)
      // changing the counters of correct and wrong answers
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
      // save actual global time
      this.timerGlobalStop = Date.now()

      // calculate difference between global timer start and stop and convert to seconds
      this.timerGlobalDelta = Math.floor((this.timerGlobalStop - this.timerGlobalStart) / 1000)

      // set startGenerateChart to true - variable used in updated functions - indicates when charts can be generated
      this.startGenerateChart = true;
    },
    // static methods
    updateProgressBar() {
      /**
       * Function to change width parameter in css style.
       */

      // variable used in 'progress status' view. Variable is based on length of dictionary of selected answers,
      // not on actual question number (question index)
      this.widthProgress = (Object.keys(this.selectedAnswersDictionary).length / this.questionCounter) * 100;
    },
    timer() {
      /**
       * Function to start and stop timer for specific question and save timer results to dictionary depending on
       * actual question number (question index).
       * Function called when next, previous, finish buttons are clicked.
       */

      // save actual time (like stop timer)
      this.actualTime = Date.now()

      // calculate difference time between moment when new or previous question appears and clicked next or previous button
      this.timerDelta = this.actualTime - this.timerStart

      // save data to dictionary
      // add selected answer to dictionary depending on question index
      this.timerQuestionDictionary[this.questionIndex] += Math.floor(this.timerDelta / 1000)

      // save actual time (start timer)
      this.timerStart = Date.now()
    },
    shuffle(arr) {
      /**
       * Function to randomize word position in correct answers array this.questions.correctAnswer.
       */

      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    generateQuestionsResultsChart() {
      /**
       * Function to generate chart and update data (based on user results).
       * Function shows ratio of correct to incorrect answers.
       * Structure taken from the website 'chartjs.org'.
       */

          // find chart by id in html structure
      const ctx = document.getElementById('myChartQuestionsResults');

      // chart object
      const myChartQuestionsResults = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Correct answers', 'Wrong answers',],
          datasets: [{
            label: 'correct/incorrect answers',
            data: [],
            backgroundColor: [
              'rgba(187, 247, 208, 0.5)',  // correct answers - green
              'rgba(254, 202, 202, 0.5)',  // wrong answers - red
            ],
            borderColor: [
              'rgba(187, 247, 208, 1)',  // correct answers - green
              'rgba(254, 202, 202, 1)',  // wrong answers - red
            ],
            borderWidth: 1,
            hoverOffset: 4,
          }]
        },
        options: {
          // responsive: true,
          maintainAspectRatio: false,
          // aspectRatio: 1
          layout: {
            padding: 20
          }
        }
      });

      // call chart object
      myChartQuestionsResults;

      //  update chart - fill chart arrays with data
      myChartQuestionsResults.data.datasets[0].data.push(this.correctAnswers)  // correct answers
      myChartQuestionsResults.data.datasets[0].data.push(this.wrongAnswers)  // wrong answers

      // update chart - without this, data will not be saved in object
      myChartQuestionsResults.update();
    },
    generateTimeResultsChart() {
      /**
       * Function to generate chart and update data (based on user results).
       * Function shows time spent on each question.
       * Structure taken from the website 'chartjs.org'.
       */

          // find chart by id in html structure
      const ctx = document.getElementById('myChartTimeResults');

      // chart object
      const myChartTimeResults = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
            label: 'correct/incorrect answers',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1,
            hoverOffset: 4,
          }]
        },
        options: {
          // responsive: true,
          maintainAspectRatio: false,
          // aspectRatio: 1
          layout: {
            padding: 4
          }
        }
      });

      // call chart object
      myChartTimeResults;

      // functions needed to generate random colors
      const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
      const randomByte = () => randomNumber(0, 255)

      // save dictionary with amount of time spent for each question to local variable
      let dict = this.timerQuestionDictionary;

      //  update chart - fill chart arrays with data
      Object.keys(dict).forEach(function (key) {
        myChartTimeResults.data.labels.push(`question ${key}`);  // data
        myChartTimeResults.data.datasets[0].data.push(dict[key]);  // labels
        let color = `rgba(${[randomByte(), randomByte(), randomByte(), 0.2].join(',')})`  // set random color
        myChartTimeResults.data.datasets[0].backgroundColor.push(color);  // push background color to array
        myChartTimeResults.data.datasets[0].borderColor.push(color);  // push border color to array
      })

      // update chart - without this, data will not be saved in object
      myChartTimeResults.update()
    },
    info() {
      /**
       * Function to show actual information in browser console.
       */

      console.log('*********************************')
      console.log('selectedAnswer = ', this.selectedAnswer)
      console.log('selectedAnswersDictionary = ', this.selectedAnswersDictionary)
      console.log('questionIndex = ', this.questionIndex)
      console.log('*********************************')
    },
  },
  mounted() {
    /**
     * Function to show actual information in browser console when first view is loaded.
     */
    console.log('*********************************')
    console.log('selectedAnswer = ', this.selectedAnswer)
    console.log('selectedAnswersDictionary = ', this.selectedAnswersDictionary)
    console.log('questionIndex = ', this.questionIndex)
    console.log('*********************************')
  },
  updated: function () {
    /**
     * Function that is called whenever a new view appears in the browser - when new DOM elements are loaded.
     */

    this.$nextTick(function () {

      // in order to prevent loading the charts after each change of view on the page, if function is used,
      // so that the charts are loaded only after clicking Finish button and loading view with the results
      if (this.startGenerateChart === true) {
        this.generateQuestionsResultsChart();
        this.generateTimeResultsChart();
      }
    })
  }
}
</script>

<style>

</style>
