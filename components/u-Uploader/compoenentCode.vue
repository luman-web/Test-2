<template>
  <div>
    <b-button @click="uploadAsImage">Upload As Image</b-button>
    <b-button @click="removeImage">
      <icon name="remove" />
    </b-button>
    <hr />
    <b-button @click="uploadAsFile">Upload As File</b-button>
    <b-button @click="removeFile">
      <icon name="remove" />
    </b-button>
  </div>
</template>

<script>
module.exports = {
  methods: {
    async getBolb() {
      const url = 'https://firebasestorage.googleapis.com/v0/b/tangle-157402.appspot.com/o/-LJNcugLqOwzJGJDpcIP%2F07f87020-8d59-11eb-a606-19c833f555fb_datagrid_profile_img.png?alt=media&token=b8ab550a-5441-4643-8869-a86be593a1f4'
      const config = { url, method: "get", responseType: "blob" }
      const response = await this.$axios.request(config)

      return response.data 
    },
    async uploadAsFile() {
      const data = await this.getBolb()
      data.name = 'file-upload-image.png'
      const payload = {
        gridId: 'filesUpload',
        rowKey: '-NSQmNvjVzfMWBbGdvN1',
        cellKey: 'files1',
        filesToUpload: [data]
      }

      $dgFilesUpload(payload)
    },
    async uploadAsImage() {
      const data = await this.getBolb()
      data.name = 'image-upload-image.png'
      const payload = {
        gridId: 'filesUpload',
        rowKey: '-NSQmNvjVzfMWBbGdvN1',
        cellKey: 'image',
        data
      }

      $dgImageUpload(payload)
    },
    removeImage() {
      const payload = {
        gridId: 'filesUpload',
        rowKey: '-NSQmNvjVzfMWBbGdvN1',
        cellKey: 'image'
      }

      $dgImageRemove(payload)
    },
    removeFile() {
      const payload = {
        gridId: 'filesUpload',
        rowKey: '-NSQmNvjVzfMWBbGdvN1',
        cellKey: 'files1',
      }

      $dgFilesRemove(payload)
    },
  }
}
</script>
