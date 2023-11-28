const { link } = await generateAuthLink({
    uid: 'GIswaGa6YnWZS06FghmbEoQlxWy2', // *
    // origin: 'http://localhost:8080', // string
    useLimit: 3, // number
    redirectUrl: '/dashboard/-Mc8nBAo4ICScR4fSYEh?tab=-NHheaAIkaLbdI5ZpHWX&dgEditMode=true&gridId=workflows&rowKey=-Nd_YuNYEfBhbXI-F7B1', // string
    testClaim: 777,
    allowExistingUser: true,
})

context.data = { link }
