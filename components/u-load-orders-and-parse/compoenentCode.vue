<template>
  <div>
    <b-button variant="primary" @click="load" :disabled="loading">
      <b-spinner small v-if="loading"></b-spinner>
      <span>Load [{{gridId}}]</span>
    </b-button>

    <b-alert variant="success" :show="showSuccessMessage" class="mt-2" dismissible>[{{gridId}}] downloaded and parsed</b-alert>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      gridId: 'orders',
      loading: false,
      showSuccessMessage: false,
      startAt: null,
      records: {},
      done: false,
    }
  },
  methods: {
    async load() {
      this.loading = true
      this.done = false
      console.log('start loading', this.gridId)

      const modelCollection = this.$loki.getCollection(this.gridId)

      modelCollection.removeWhere(() => true)

      try {
        await this.loadChunk(modelCollection)

        this.$bus.$emit('dgParseOne', this.gridId)
        this.$bus.$emit(`dgGridChanged-${this.gridId}`)
        this.showSuccessMessage = true
      } catch (err) {
        console.error(err)
      } finally {
        this.loading = false

        console.log('finish loading', this.gridId)
      }
    },
    loadChunk(modelCollection) {
      return new Promise((resolve) => {
        if (this.done) return resolve()

        let ref

        if (this.startAt) {
          ref = this.$dbService
            .getRef(`models/${this.gridId}`)
            .orderByKey()
            .startAt(this.startAt)
            .limitToFirst(3)
        } else {
          ref = this.$dbService
            .getRef(`models/${this.gridId}`)
            .orderByKey()
            .limitToFirst(3)
        } 

        ref
          .once('value')
          .then(async (snapshot) => {
            if (!snapshot.val()) {
              this.startAt = null

              return resolve()
            }

            const data = Object.values(snapshot.val())
            const keys = Object.keys(snapshot.val())

            if (keys.slice(-1)[0] === this.startAt) {
              this.done = true

              modelCollection.insert(data)

              return resolve()
            }

            modelCollection.insert(data.slice(0, -1))

            this.startAt = keys.slice(-1)[0]

            await this.loadChunk(modelCollection)
            await this.sleep(10)

            resolve()
          })
      })
    },
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
}
</script>
