<template>
  <pre v-if="!refresh">{{ record }}</pre>
</template>

<script>
module.exports = {
  data() {
    return {
      refresh: false,
    }
  },
  computed: {
    record() {
      return $dataGrid('orders')['-OGFUxbDJd_eGKaYxz8D']
    },
  },
  created() {
    this.$bus.$on('dgRowChanged-orders', (rowKey) => {
      if (rowKey !== '-OGFUxbDJd_eGKaYxz8D') return

      this.refresh = true

      this.$nextTick(() => {
        this.refresh = false
      })
    })
  },
}
</script>
