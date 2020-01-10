import resolvers from '.'

test('query machines should return a machine', () => {
  const data = resolvers.Query.machines()
  console.log(data)
  expect(data[0]['name']).toBe('Azure VM')
  expect(data[0]['status']).toBe('running')
})

test('mutation create virtual machine should return an array of 30 values', () => {
  const data = resolvers.Mutation.createVirtualMachine(
    null,
    { input: { name: 'Test' } },
    null
  )
  expect(data['data']['name']).toBe('Test')
})

test('mutation delete virtual machine should return true', () => {
  const data = resolvers.Mutation.deleteVirtualMachine(
    null,
    { input: { name: 'Test' } },
    null
  )
  expect(data['data']).toBeTruthy()
})
