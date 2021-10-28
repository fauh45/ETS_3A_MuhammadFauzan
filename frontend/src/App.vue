<script setup lang="ts">
import StaffRow from './components/StaffRow.vue';
import axios from "axios";
import { useInfiniteQuery } from "vue-query"
import { VueQueryDevTools } from "vue-query/devtools"
import { Staff } from './components/staff.typedef';
import AddStaffModal from './components/AddStaffModal.vue';
import { ref } from 'vue';

type GetStaffResponse = { next: number | null, data: Staff[] }

const isModalOn = ref(false);

const getStaff = async (next: number | null) => {
  let url = import.meta.env.VITE_BACKEND_URL + "/staff/"

  if (next)
    url += next.toString()

  return (await axios.get<GetStaffResponse>(url)).data
}

const query = useInfiniteQuery<GetStaffResponse>("staff", (context) => getStaff(context.pageParam),
  { getNextPageParam: (last, pages) => last.next || undefined, keepPreviousData: true, staleTime: 1000 * 60 * 2 }
)
</script>

<template>
  <AddStaffModal :state="isModalOn" @toggle="() => { isModalOn = !isModalOn }" />

  <nav class="level" role="navigation">
    <p class="level-item has-text-centered title is-3" id="title">Staff Data System</p>
  </nav>

  <div class="container">
    <button class="button" @click="() => { isModalOn = !isModalOn }">Add</button>
    <button
      class="button is-info ml-2"
      :class="{ 'is-loading': query.isLoading.value }"
      :disabled="!query.hasNextPage?.value || query.isFetchingNextPage.value"
      @click="() => query.fetchNextPage.value()"
    >Load More</button>
  </div>

  <div class="pt-3">
    <div class="notification is-danger" v-if="query.isError.value">{{ query.error.value }}</div>
    <table class="table is-fullwidth is-hoverable is-narrow">
      <thead>
        <td>Staff Id</td>
        <td>First Name</td>
        <td>Last Name</td>
        <td>Address Id</td>
        <td>
          <abbr title="Might be empty">Email</abbr>
        </td>
        <td>Store Id</td>
        <td>Active</td>
        <td>Username</td>
        <td>
          <abbr title="Might be empty">Password</abbr>
        </td>
        <td></td>
        <td></td>
      </thead>
      <tbody>
        <template v-for="(group, index) in query.data.value?.pages" :key="index">
          <staff-row v-for="data in group.data" :data="data" :key="data.staff_id" />
        </template>
      </tbody>
    </table>
  </div>

  <VueQueryDevTools />
</template>

<style scoped>
#title {
  padding-top: 1em;
  margin-bottom: 0rem;
}
</style>
