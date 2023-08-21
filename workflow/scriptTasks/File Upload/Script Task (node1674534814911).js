const bucket = admin.storage().bucket()

const file = await new Promise((resolve) => {
    bucket
        .file(`-M72Tp2FP8iLHeS2taF4/Simple Users List.xlsx`)
        .download(function (err, contents) {
            if (err) throw err

            resolve({
                name: 'Simple Users List.xlsx',
                data: contents
            })
        })
})

await uploadFilesToRecord({
    workspaceId: '-M72Tp2FP8iLHeS2taF4',
    gridId: 'filesUpload',
    rowKey: '-NOIMIkWU_NKASizD7ha',
    cellKey: 'files1',
    files: [file]
})

await uploadFilesToRecord({
    workspaceId: '-M72Tp2FP8iLHeS2taF4',
    gridId: 'filesUpload',
    rowKey: '-NOIMIkWU_NKASizD7ha',
    cellKey: 'files2',
    files: [file]
})

context.data = { uploaded: true }

// const files = await Promise.all([
//     new Promise((resolve) => {
//         bucket
//             .file(`-LJNcugLqOwzJGJDpcIP/07f87020-8d59-11eb-a606-19c833f555fb_datagrid_profile_img.png`)
//             .download(function (err, contents) {
//                 if (err) throw err

//                 resolve({
//                     name: 'file1.png',
//                     data: contents
//                 })
//             })
//     }),
//     new Promise((resolve) => {
//         bucket
//             .file(`-LJNcugLqOwzJGJDpcIP/10befd50-8d59-11eb-a606-19c833f555fb_datagrid_profile_img.png`)
//             .download(function (err, contents) {
//                 if (err) throw err

//                 resolve({
//                     name: 'file2.png',
//                     data: contents
//                 })
//             })
//     })
// ])

// await uploadFilesToRecord({
//     workspaceId: '-M72Tp2FP8iLHeS2taF4',
//     gridId: 'grid2',
//     rowKey: '-MstNeYtKf7rbDLXsiGS',
//     cellKey: 'files',
//     files
// })

// const fileData = await getFilesDataFromRecord({
//     workspaceId: '-M72Tp2FP8iLHeS2taF4',
//     gridId: 'grid2',
//     rowKey: '-MstNeYtKf7rbDLXsiGS',
//     cellKey: 'files',
// })

// console.log(fileData)