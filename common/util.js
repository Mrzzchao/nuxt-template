export function mapActions (acts, ns) {
  let aTypes = {} // 对外部
  let innerATypes = {} // 对内部
  let actions = {}
  Object.keys(acts).forEach((key) => {
    aTypes[key] = [ns, key].join('/')
    innerATypes[key] = key
    actions[key] = acts[key]
  })
  return {actions, aTypes, innerATypes}
}

export function mapMutations (muts, ns) {
  let mTypes = {} // 对外部
  let innerMTypes = {} // 对内部
  let mutations = {}
  Object.keys(muts).forEach((key) => {
    mTypes[key] = [ns, key].join('/')
    innerMTypes[key] = key
    mutations[key] = muts[key]
  })
  return {mutations, mTypes, innerMTypes}
}
