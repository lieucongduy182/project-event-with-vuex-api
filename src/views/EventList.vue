<template>
  <div>
    <h1>Events Listing {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <div v-if="page >= 1" style="margin: auto; text-align: center">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev" v-if="event.eventsTotalCount && page > 1">Prev Page</router-link>&nbsp;
      <router-link :to="{name: 'event-list', query: {page: page + 1}}" rel="next" v-if="event.eventsTotalCount && event.eventsTotalCount > page * 3">Next Page</router-link>
    </div>
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import { mapState } from 'vuex'
export default {
  components: {
    EventCard
  },
  computed: {
    page() {
      return parseInt(this.$route.query.page) || 1
    },
    ...mapState(['event', 'user'])
  },
  created() {
    this.$store.dispatch('event/fetchEvents', {
      limitPage: 3,
      page: this.page
    })
  }
}
</script>
