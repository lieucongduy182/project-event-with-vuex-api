import Vue from 'vue'
import Vuex from 'vuex'
import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: 1,
      name: 'Duy',
      age: 23
    },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ],
    events: [],
    event: {},
    eventsTotalCount: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch(err => console.log(err))
    },
    fetchEvents({ commit, state }, { limitPage, page }) {
      EventService.getEvents(limitPage, page)
        .then(response => {
          state.eventsTotalCount = response.headers['x-total-count']
          commit('SET_EVENTS', response.data)
        })
        .catch(err => console.log(err))
    },
    fetchEvent({ commit, getters }, id) {
      var event = getters.getEventByid(id)
      if (event) {
        commit('SET_EVENT', event)
      } else {
        EventService.getEvent(id)
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
    }
  },
  getters: {
    getEventByid: state => id => {
      return state.events.find(event => event.id === id)
    }
  }
})
