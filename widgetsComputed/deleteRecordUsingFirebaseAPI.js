return async (rowKey) => {
    await new Promise((resolve) => {
        this.$dbService.getRef(`models/store/${rowKey}`)
        .remove()
        .then(() => {
            this.$store.dispatch('dataGrid_logRowChange', {
                gridId: 'store',
                rowKey,
                value: null,
            })

            resolve()
        })
        .catch((err) => {
            console.error(err)

            resolve()
        })
    })
}