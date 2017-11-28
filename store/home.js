import ajax from '~/common/ajax'
import {mapActions, mapMutations} from '~/common/util'

const ns = 'home'

const initState = {
  teamInfo: null
}

const actionsInfo = mapActions({
  async getTeamInfo ({commit}) {
    const teamInfo = await ajax.get(`/library/zq/teaminfo?teamid=455`)
    commit(innerMTypes.setTeamInfo, teamInfo)
    return teamInfo
  }
}, ns)

const mutationsInfo = mapMutations({
  setTeamInfo (state, teamInfo) {
    state.teamInfo = teamInfo
  }
}, ns)



export const state = () => (JSON.parse(JSON.stringify(initState)))
export const actions = actionsInfo.actions
export const mutations = mutationsInfo.mutations
export const aTypes = actionsInfo.aTypes
export const mTypes = mutationsInfo.mTypes

const innerMTypes = mutationsInfo.innerMTypes   // 解决内部引用命名问题
const innerATypes = actionsInfo.innerATypes
