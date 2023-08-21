<template>
  <div>
    <b-button
      @click="$bus.$emit('thatEvent')"
    >Run Event</b-button>
  </div>
</template>

<script>
module.exports = {
  props: {},
  data() {
    return {}
  },
  methods: {
    myHandler() {
      console.log('handler')
    },
  },
  created() {
    this.$bus.$on('thatEvent', this.myHandler)
  },
  beforeDestroy() {
    this.$bus.$off('thatEvent', this.myHandler)
  },
}
</script>
