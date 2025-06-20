return async (rowData) => {
    await new Promise((resolve) => {
        setTimeout(resolve, 1000)
    })

    console.log(rowData)

    throw new Error('test it')
}