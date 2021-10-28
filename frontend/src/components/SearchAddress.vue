<script lang="ts" setup>
import axios from "axios";
import { reactive, ref } from "vue";
import { useQuery } from "vue-query";
import { getDirective } from 'vue-debounce';

type AddressSearchResponse = {
    address_id: number,
    address: string
}

const props = defineProps<{
    addressId: number
}>()

const emit = defineEmits<{
    (event: "update-id", address_id: number): void
}>()

const component = {
    directives: {
        debounce: getDirective("3", { listenTo: 'input', defaultTime: '300ms' })
    }
}

const searchTerm = ref("")
const queryKey = ["addressSearch", { searchTerm }]
const options = reactive({
    enabled: true,
    staleTime: 60 * 60 * 1000
})

const searchAddress = async (query: string) => {
    console.log(query);

    return (await axios.get<AddressSearchResponse[]>(import.meta.env.VITE_BACKEND_URL + "/address/", { params: { query: query } })).data
}
const searchQuery = useQuery(queryKey, () => searchAddress(searchTerm.value), options)

const truncateString = (text: string, len: number): string => {
    if (text.length > len) {
        return text.slice(0, len) + "..."
    }

    return text
}
</script>

<template>
    <div class="dropdown is-active">
        <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>{{ addressId }}</span>
                <span class="icon is-small">
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <div class="dropdown-item">
                    <div class="control has-icons-left">
                        <input
                            type="text"
                            v-model="searchTerm"
                            placeholder="Search Address"
                            class="input is-transparent"
                        />
                        <span class="icon is-left">
                            <i class="fa fa-search"></i>
                        </span>
                    </div>
                </div>
                <hr class="dropdown-divider" />
                <div class="dropdown-item is-static" v-if="searchQuery.isLoading.value">Loading...</div>
                <div
                    class="dropdown-item"
                    v-else-if="searchQuery.isError.value"
                >{{ searchQuery.error }}</div>
                <div
                    class="dropdown-item"
                    v-else-if="searchQuery.data.value?.length === 0"
                >Search result are empty</div>
                <a
                    class="dropdown-item"
                    :class="{ 'is-active': item.address_id === addressId }"
                    v-else
                    v-for="item in searchQuery?.data?.value"
                    :key="`address-item-${item.address_id}`"
                    @click="() => emit('update-id', item.address_id)"
                >{{ `(${item.address_id}) ${truncateString(item.address, 18)}` }}</a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.field.dropdown-item {
    padding: 0px;
    margin-bottom: 0px;
}

.field.dropdown-item input {
    border: none;
    border-radius: 0px;
    box-shadow: none;
    margin-bottom: 0px;
}
</style>