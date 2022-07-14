<template>
  <div>
    <p>Test</p>
    <button @click="fetchData">Pobierz dane</button>
    <div>
      <p>Questions:</p>
      <p>{{ questions }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      questions: []
    }
  },
  methods: {
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
    }
  },
}
</script>

<style>

</style>
