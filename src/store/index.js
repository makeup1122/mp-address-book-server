import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { fetchItemById } from '@/api/test'

export default function createStore() {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem({commit}, id) {
                return fetchItemById(id).then(item => {
                    commit('setItem',{id,item})
                })
            }
        },
        mutations: {
            setItem(state, {id,item}){
                //Vue.set( target, key, value ) 向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。
                Vue.set(state.items, id,item)
            }
        }
    })
}