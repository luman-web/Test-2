console.log('PDFDocument')

const items = ['item 2', 'item 3', 'item 4', 'item 5', 'item 6', 'item 7', 'item 8', 'item 9']

for (let item of items) {
    const rowKey = await $addRow('grid1', { name: item })
    $setRow({
        gridId: 'grid1',
        searchKey: 'rowKey',
        searchValue: rowKey,
        data: { surname: item }
    })
}

context.data = {
    workflow2: true
}