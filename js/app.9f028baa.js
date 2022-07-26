(function(){"use strict";var e={5536:function(e,t,s){var n=s(9242),o=s(3396),r=s(7139);const i={key:0,class:"flex w-full h-screen justify-center items-center"},l={class:"w-full max-w-xl text-center"},a={class:"flex-1 bg-white p-12 rounded-lg shadow-lg w-full mt-8 justify-center items-center"},c={key:1},u={key:2},d=(0,o._)("p",{class:"font-bold mt-4 mb-2"},"Select number of questions",-1),h={class:"flex justify-center"},w={key:1,class:"flex w-full h-screen justify-center items-center"},g={class:"w-full max-w-xl"},f=(0,o._)("h1",{class:"font-bold text-5xl text-center quiz-text"},"Quiz game",-1),m={class:"bg-white p-12 rounded-lg shadow-lg w-full mt-8"},b={key:0},p=["innerHTML"],x=["innerHTML"],y={class:"mt-8 text-center"},v=(0,o._)("div",{class:"flex justify-center items-center"},[(0,o._)("span",{class:"text-black text-xs"},"Saved questions")],-1),q={class:"mb-4 w-full h-1 bg-gray-200 rounded-full dark:bg-gray-700"},_={class:"mt-6 flow-root"},D=["disabled"],C=["disabled"],A=["disabled"],k={key:2,class:"flex w-full justify-center items-center"},O={class:"w-full max-w-xl"},T={class:"bg-white p-12 rounded-lg shadow-lg w-full mt-8 mb-8"},I=(0,o._)("div",{class:"font-bold text-5xl text-center mb-10"},"Results:",-1),Q=(0,o._)("p",{class:"text-center font-bold text-2xl"},"Correct/wrong answers",-1),S=(0,o._)("div",{class:"chart-container"},[(0,o._)("canvas",{id:"myChartQuestionsResults",width:"400",height:"400"})],-1),M={class:"font-bold text-xl text-center mb-10 mt-5"},L=(0,o._)("p",{class:"text-center font-bold text-2xl"},"Time spent for each question [s]",-1),j=(0,o._)("div",{class:"chart-container"},[(0,o._)("canvas",{id:"myChartTimeResults",width:"400",height:"400"})],-1),F={class:"font-bold text-xl text-center mb-10 mt-5"},H={class:"bg-blue-400 p-1 transform rotate-45 rounded-md h-10 w-10 text-white font-bold text-center absolute right-0 -top-8 shadow-2xl question"},R={class:"transform -rotate-45"},G=["innerHTML"],z={class:"border-yellow-500 border-2 rounded-full p-2 m-2 font-bold"},E=(0,o.Uk)("Your answer: "),P=["innerHTML"],B={class:"border-green-500 border-2 rounded-full p-2 m-2 font-bold"},N=(0,o.Uk)("Correct answer: "),W=["innerHTML"];function U(e,t,s,U,Y,Z){return(0,o.wg)(),(0,o.iD)("body",null,[!1===Y.isStart?((0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",l,[(0,o._)("div",a,[!1===Y.isLoading&&!1===Y.isErrorDuringFetch?((0,o.wg)(),(0,o.iD)("button",{key:0,class:"px-2 py-2 myButton align-super",style:{width:"200px",height:"100px"},onClick:t[0]||(t[0]=e=>Z.fetchData())}," START ")):(0,o.kq)("",!0),!0===Y.isLoading&&!1===Y.isErrorDuringFetch?((0,o.wg)(),(0,o.iD)("div",c,"loading questions...")):(0,o.kq)("",!0),!1===Y.isLoading&&!0===Y.isErrorDuringFetch?((0,o.wg)(),(0,o.iD)("div",u,"Failed to load questions. Something went wrong. ")):(0,o.kq)("",!0),d,(0,o._)("div",h,[(0,o._)("div",{class:(0,r.C_)(["text-white font-bold py-2 px-4 rounded m-3 select-number",{"text-green-400":5===Y.selectedNumberOfQuestions}]),onClick:t[1]||(t[1]=e=>Y.selectedNumberOfQuestions=5)}," 5 ",2),(0,o._)("div",{class:(0,r.C_)(["text-white font-bold py-2 px-4 rounded m-3 select-number",{"text-green-400":10===Y.selectedNumberOfQuestions}]),onClick:t[2]||(t[2]=e=>Y.selectedNumberOfQuestions=10)}," 10 ",2)])])])])):(0,o.kq)("",!0),!0===Y.isStart&&!1===Y.isFinish?((0,o.wg)(),(0,o.iD)("div",w,[(0,o._)("div",g,[f,(0,o._)("div",m,[Y.questionIndex-1<Y.questionCounter?((0,o.wg)(),(0,o.iD)("div",b,[Y.questions.length>0?((0,o.wg)(),(0,o.iD)("p",{key:0,class:"text-2xl font-bold",innerHTML:Y.questions[Y.questionIndex-1].question},null,8,p)):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(Y.questions[Y.questionIndex-1].choices,(e=>((0,o.wg)(),(0,o.iD)("div",{class:(0,r.C_)(["block mt-4 border border-gray-300 rounded-lg py-2 px-6 text-lg option-default answer-option",{"option-selected":Y.selectedAnswersDictionary[Y.questionIndex]===e}]),key:e,onClick:t[3]||(t[3]=e=>Z.selectedAnswerFunction(e)),onMouseover:t[4]||(t[4]=e=>Z.hoverClassOn(e)),onMouseout:t[5]||(t[5]=e=>Z.hoverClassOff(e)),innerHTML:e},null,42,x)))),128)),(0,o._)("div",y,[v,(0,o._)("div",q,[(0,o._)("div",{class:"h-1 bg-yellow-500 font-medium text-blue-100 rounded-full",style:(0,r.j5)({width:Y.widthProgress+"%"})},null,4)]),(0,o._)("p",null,"Question: "+(0,r.zw)(Y.questionIndex)+"/"+(0,r.zw)(Y.questionCounter),1)]),(0,o._)("div",_,[(0,o.wy)((0,o._)("button",{class:"float-right px-5 py-2 myButton",disabled:void 0===Y.selectedAnswer||""===Y.selectedAnswer,onClick:t[6]||(t[6]=e=>{Z.timer(),Z.nextQuestion()})}," Next > ",8,D),[[n.F8,Y.questionIndex-1<Y.questionCounter-1]]),(0,o.wy)((0,o._)("button",{class:"float-left px-5 py-2 myButton",disabled:Y.questionIndex-1===0,onClick:t[7]||(t[7]=e=>{Z.timer(),Z.previousQuestion()})}," < Previous ",8,C),[[n.F8,Y.questionIndex-1>=0]]),(0,o.wy)((0,o._)("button",{class:"float-right px-5 py-2 myButton",disabled:void 0===Y.selectedAnswer||""===Y.selectedAnswer,onClick:t[8]||(t[8]=e=>{Z.timer(),Z.showResults()})}," Finish ",8,A),[[n.F8,Y.questionIndex-1===Y.questionCounter-1]])])])):(0,o.kq)("",!0)])])])):(0,o.kq)("",!0),!0===Y.isStart&&!0===Y.isFinish?((0,o.wg)(),(0,o.iD)("div",k,[(0,o._)("div",O,[(0,o._)("div",T,[I,Q,S,(0,o._)("div",M,"Correct answers: "+(0,r.zw)(this.correctAnswers)+"/"+(0,r.zw)(this.questionCounter),1),L,j,(0,o._)("div",F,"Total time: "+(0,r.zw)(this.timerGlobalDelta)+" [s]",1),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(Y.questions,((e,t)=>((0,o.wg)(),(0,o.iD)("div",{class:"mb-16 relative",key:e},[(0,o._)("div",H,[(0,o._)("p",R,"q"+(0,r.zw)(t+1),1)]),(0,o._)("p",{class:(0,r.C_)(["font-bold text-3xl text-center bg-red-200 bg-opacity-50 rounded p-2 m-2",{"bg-green-200 bg-opacity-50 rounded p-2 m-2":e.correctAnswer===Y.selectedAnswersDictionary[t+1]}]),innerHTML:e.question},null,10,G),(0,o._)("p",z,[E,(0,o._)("span",{class:"font-light text-2xl",innerHTML:Y.selectedAnswersDictionary[t+1]},null,8,P)]),(0,o._)("p",B,[N,(0,o._)("span",{class:"font-light text-2xl",innerHTML:e.correctAnswer},null,8,W)])])))),128))])])])):(0,o.kq)("",!0)])}var Y=s(4851),Z={name:"App",data(){return{isHovering:!1,selectedAnswer:"",selectedAnswersDictionary:{},questionIndex:1,questionCounter:0,widthProgress:0,correctAnswers:0,wrongAnswers:0,timerGlobalStart:0,timerGlobalStop:0,timerGlobalDelta:0,timerStart:0,actualTime:0,timerDelta:0,timerQuestionDictionary:{},isStart:!1,isFinish:!1,questions:[],isLoading:!1,isErrorDuringFetch:!1,startGenerateChart:!1,selectedNumberOfQuestions:5}},methods:{fetchData(){let e=new URLSearchParams;e.append("amount",this.selectedNumberOfQuestions.toString());const t="https://opentdb.com/api.php?"+e.toString();this.isLoading=!0;const s=async()=>{try{const e=await fetch(t).catch((function(e){console.log("Problems: ",e)}));console.log(e),console.log("response status: ",e.status);const s=await e.json();console.log("data: ",s.results),this.prepareQuestions(s)}catch(e){throw console.error("MyError: ",e),this.isLoading=!1,this.isErrorDuringFetch=!0,e}};s()},prepareQuestions(e){for(let t=0;t<e.results.length;t++){const s={question:e.results[t].question,choices:e.results[t].incorrect_answers,correctAnswer:e.results[t].correct_answer};s.choices.push(e.results[t].correct_answer),s.choices=this.shuffle(s.choices),this.questions.push(s)}this.questionCounter=this.questions.length,this.isStart=!0;for(let t=1;t<this.questions.length+1;t++)this.timerQuestionDictionary[t]=0;this.timerGlobalStart=Date.now(),this.timerStart=Date.now()},selectedAnswerFunction(e){this.selectedAnswer=e.target.innerText,this.selectedAnswersDictionary[this.questionIndex]=this.selectedAnswer,this.updateProgressBar()},hoverClassOn(e){this.isHovering=!0,e.target.classList.add("option-hover")},hoverClassOff(e){this.isHovering=!1,e.target.classList.remove("option-hover")},nextQuestion(){this.questionIndex++,this.selectedAnswer=this.selectedAnswersDictionary[this.questionIndex],this.info()},previousQuestion(){this.questionIndex--,this.selectedAnswer=this.selectedAnswersDictionary[this.questionIndex],this.info()},showResults(){this.isFinish=!0,this.info();for(let e=0;e<this.questions.length;e++)this.questions[e].correctAnswer===this.selectedAnswersDictionary[e+1]?this.correctAnswers++:this.wrongAnswers++;console.log("Correct answers = ",this.correctAnswers),console.log("Wrong answers = ",this.wrongAnswers),this.timerGlobalStop=Date.now(),this.timerGlobalDelta=Math.floor((this.timerGlobalStop-this.timerGlobalStart)/1e3),this.startGenerateChart=!0},updateProgressBar(){this.widthProgress=Object.keys(this.selectedAnswersDictionary).length/this.questionCounter*100},timer(){this.actualTime=Date.now(),this.timerDelta=this.actualTime-this.timerStart,this.timerQuestionDictionary[this.questionIndex]+=Math.floor(this.timerDelta/1e3),this.timerStart=Date.now()},shuffle(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e},generateQuestionsResultsChart(){const e=document.getElementById("myChartQuestionsResults"),t=new Y.Z(e,{type:"doughnut",data:{labels:["Correct answers","Wrong answers"],datasets:[{label:"correct/incorrect answers",data:[],backgroundColor:["rgba(187, 247, 208, 0.5)","rgba(254, 202, 202, 0.5)"],borderColor:["rgba(187, 247, 208, 1)","rgba(254, 202, 202, 1)"],borderWidth:1,hoverOffset:4}]},options:{maintainAspectRatio:!1,layout:{padding:20}}});t.data.datasets[0].data.push(this.correctAnswers),t.data.datasets[0].data.push(this.wrongAnswers),t.update()},generateTimeResultsChart(){const e=document.getElementById("myChartTimeResults"),t=new Y.Z(e,{type:"doughnut",data:{labels:[],datasets:[{label:"correct/incorrect answers",data:[],backgroundColor:[],borderColor:[],borderWidth:1,hoverOffset:4}]},options:{maintainAspectRatio:!1,layout:{padding:4}}}),s=(e,t)=>Math.floor(Math.random()*(t-e+1)+e),n=()=>s(0,255);let o=this.timerQuestionDictionary;Object.keys(o).forEach((function(e){t.data.labels.push(`question ${e}`),t.data.datasets[0].data.push(o[e]);let s=`rgba(${[n(),n(),n(),.2].join(",")})`;t.data.datasets[0].backgroundColor.push(s),t.data.datasets[0].borderColor.push(s)})),t.update()},info(){console.log("*********************************"),console.log("selectedAnswer = ",this.selectedAnswer),console.log("selectedAnswersDictionary = ",this.selectedAnswersDictionary),console.log("questionIndex = ",this.questionIndex),console.log("*********************************")}},mounted(){console.log("*********************************"),console.log("selectedAnswer = ",this.selectedAnswer),console.log("selectedAnswersDictionary = ",this.selectedAnswersDictionary),console.log("questionIndex = ",this.questionIndex),console.log("*********************************")},updated:function(){this.$nextTick((function(){!0===this.startGenerateChart&&(this.generateQuestionsResultsChart(),this.generateTimeResultsChart())}))}},$=s(89);const K=(0,$.Z)(Z,[["render",U]]);var J=K;(0,n.ri)(J).mount("#app")}},t={};function s(n){var o=t[n];if(void 0!==o)return o.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s.m=e,function(){var e=[];s.O=function(t,n,o,r){if(!n){var i=1/0;for(u=0;u<e.length;u++){n=e[u][0],o=e[u][1],r=e[u][2];for(var l=!0,a=0;a<n.length;a++)(!1&r||i>=r)&&Object.keys(s.O).every((function(e){return s.O[e](n[a])}))?n.splice(a--,1):(l=!1,r<i&&(i=r));if(l){e.splice(u--,1);var c=o();void 0!==c&&(t=c)}}return t}r=r||0;for(var u=e.length;u>0&&e[u-1][2]>r;u--)e[u]=e[u-1];e[u]=[n,o,r]}}(),function(){s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,{a:t}),t}}(),function(){s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={143:0};s.O.j=function(t){return 0===e[t]};var t=function(t,n){var o,r,i=n[0],l=n[1],a=n[2],c=0;if(i.some((function(t){return 0!==e[t]}))){for(o in l)s.o(l,o)&&(s.m[o]=l[o]);if(a)var u=a(s)}for(t&&t(n);c<i.length;c++)r=i[c],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(u)},n=self["webpackChunkquiz_game_vue"]=self["webpackChunkquiz_game_vue"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=s.O(void 0,[998],(function(){return s(5536)}));n=s.O(n)})();
//# sourceMappingURL=app.9f028baa.js.map