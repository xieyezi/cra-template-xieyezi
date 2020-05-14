const namespace = 'global'
export { namespace }

export default {
  namespace,
  state: {},
  effects: {},
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
}
