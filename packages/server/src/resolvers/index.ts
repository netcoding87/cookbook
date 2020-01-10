let vms = [
  {
    id: 'ek7e6t4k',
    name: 'Azure VM',
    status: 'running',
    created: new Date(),
  },
  {
    id: 'e33e6t4k',
    name: 'Azure VM 2',
    status: 'stopped',
    created: new Date(2019, 5, 2, 22, 33, 12),
  },
  {
    id: 'f2t96ab8',
    name: 'ControlDesk',
    status: 'stopped',
    created: new Date(2020, 1, 5, 12, 17, 22),
  },
]

const resolvers = {
  Query: {
    machines: () => {
      return vms
    },
  },

  Mutation: {
    createVirtualMachine: (root, { input }, ctx) => {
      const vm = {
        id: Math.random()
          .toString(36)
          .substring(7),
        name: input.name,
        status: 'booting',
        created: new Date(),
      }

      vms.push(vm)

      return {
        data: vm,
      }
    },
    deleteVirtualMachine: (root, { input }, ctx) => {
      vms = vms.filter((vm) => vm.id !== input.id)
      return { data: true }
    },
  },
}

export default resolvers
