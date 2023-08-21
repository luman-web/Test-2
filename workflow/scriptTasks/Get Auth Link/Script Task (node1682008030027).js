const { link } = await generateAuthLink({
    email: 'lumanweb1+test1@gmail.com',
    workspaceId: '-M72Tp2FP8iLHeS2taF4',
    redirectUrl: '/dashboard/-M72Tp2FP8iLHeS2taF4?tab=-MYPzMXzUNr9oHQpYHH8',
    origin: 'https://tangleapps.com'
})

context.data = { link }
