const workspaceList = Object.keys((await admin.database().ref('dashboardsList').once('value')).val())

const workflowsMatch = []

await Promise.all(
    workspaceList.map(workspaceId => new Promise(async (resolve) => {
        const workflows = (await admin.database().ref('dashboards').child(workspaceId).child('workflow').once('value')).val() || {}

        for (let workflowId in workflows) {
            const workflow = workflows[workflowId]

            if (!workflow.data) continue

            if (workflow.data.includes('PDFDocument')) workflowsMatch.push(`${workspaceId}/${workflowId} (${workflow.name})`)
        }

        resolve()
    }))
)

context.data = workflowsMatch