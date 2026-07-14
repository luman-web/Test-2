if (!$vm._onCommentHandlerAdded) {
  $vm._onCommentHandlerAdded = true
  $vm._commentSyncQueue = $vm._commentSyncQueue || {}

  const commentsField = 'commentsJoined'

  function formatComment(comment) {
    const regional = $vm.$store.state.dashboardSettings.regional || {}
    const format =
      regional.dateTime ||
      `${regional.date || 'MM/DD/YYYY'} ${regional.time || 'HH:mm'}`

    const dateTime = moment(comment.date || new Date()).format(format)
    const text = (comment.text || '').trim()

    return `${comment.userEmail || ''} ${dateTime}\n${text}`
  }

  function prependComment(comment) {
    const gridId = comment.gridId
    const rowKey = comment.record
    if (!gridId || !rowKey) return

    const queueKey = `${gridId}:${rowKey}:${commentsField}`

    $vm._commentSyncQueue[queueKey] = ($vm._commentSyncQueue[queueKey] || Promise.resolve())
      .then(async () => {
        const record = $vm.$helpers.$getSingleRecord(gridId, rowKey) || {}
        const currentValue = record[commentsField] || ''
        const nextValue = `${formatComment(comment)}\n\n${currentValue}`

        await $vm.$helpers.$setDataGridVal(
          gridId,
          `${rowKey}.${commentsField}`,
          nextValue
        )
      })
      .catch(console.error)
  }

  $vm.$bus.$on('onRecordComment', ({ comment }) => {
    prependComment(comment)
  })
}