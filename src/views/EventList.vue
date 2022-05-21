<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard v-for="event in events" :key="event.id" :event="event"/>
    <template v-if="page >= 1">
      <router-link :to="{name: 'event-list', query: {page: page - 1}}" rel="prev" v-if="eventsTotalCount && page > 1">Prev Page</router-link>&nbsp;
      <router-link :to="{name: 'event-list', query: {page: page + 1}}" rel="next" v-if="eventsTotalCount && eventsTotalCount > page * 3">Next Page</router-link>
    </template>
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
    ...mapState(['events', 'user', 'eventsTotalCount'])
  },
  created() {
    this.$store.dispatch('fetchEvents', {
      limitPage: 3,
      page: this.page
    })
  }
}
</script>
