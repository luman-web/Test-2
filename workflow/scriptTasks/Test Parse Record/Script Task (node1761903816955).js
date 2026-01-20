const record = await $findRecord('cities', '-OGFUxbEFfBdGq6XT6at')
context.data = await $parseDataGridRecord('cities', record)