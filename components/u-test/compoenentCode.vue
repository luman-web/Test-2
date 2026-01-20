<template>
  <div>
    <b-button @click="submit">Send E-Mail</b-button>
  </div>
</template>

<script>
module.exports = {
  methods: {
    submit() {
      alert('submitted!')
    }
  }
}
</script>
