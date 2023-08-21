<template>
  <div>
    <b-button
    @click="getWidgetPNG"
    >Get Widget As PNG</b-button>
    <b-button
      @click="getWidgetPDF"
    >Get Widget As PDF</b-button>
  </div>
</template>

<script>
module.exports = {
  methods: {
    getWidgetPNG() {
      // this.$bus.$emit('getWidgetAsPNG', '-NNLW6GALGHNaVY4cAca', (data) => {
      //   console.log(data)
      // })
      this.$bus.$emit('downloadWidgetAsPNG', '-NNLW6GALGHNaVY4cAca')
    },
    getWidgetPDF() {
      // this.$bus.$emit('getWidgetAsPDF', '-NNLW6GALGHNaVY4cAca', (data) => {
      //   console.log(data)
      // })
      this.$bus.$emit('downloadWidgetAsPDF', '-NNLW6GALGHNaVY4cAca')
    },
  },
}
</script>
