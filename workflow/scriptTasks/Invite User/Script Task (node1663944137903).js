const { login } = context.payload

context.data = await $inviteUser({
    email: login,
    password: 'qwe123',
    accessRules: { update: true }
})