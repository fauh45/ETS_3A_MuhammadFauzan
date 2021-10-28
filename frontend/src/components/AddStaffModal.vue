<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { Staff } from "./staff.typedef";
import SearchAddress from "./SearchAddress.vue";

const props = defineProps<{
    state: boolean
}>()

const emit = defineEmits<{
    (event: "toggle"): void
}>()

const staffField = ref<Omit<Staff, "staff_id" | "store_connected">>({
    first_name: "",
    last_name: "",
    active: true,
    address_id: 1,
    email: "",
    username: "",
    password: "",
    picture: null,
    store_id: 1,
})

const queryClient = useQueryClient()
const newMutation = useMutation((data: Omit<Staff, "staff_id" | "store_connected">) => axios.post(import.meta.env.VITE_BACKEND_URL + "/staff/", data), {
    onSuccess: () => {
        queryClient.refetchQueries("staff")

        emit("toggle")
    },
    onError: (err) => {
        console.error(err);

        window.alert("Error creating : " + err)
    }
})

const newRow = () => {
    const updatedValue: Omit<Staff, "staff_id" | "store_connected"> = {
        ...staffField.value,
        email: staffField.value.email === "" ? null : staffField.value.email,
        password: staffField.value.password === "" ? null : staffField.value.password
    }

    newMutation.mutate(updatedValue)
}

</script>

<template>
    <div class="modal is-clipped" :class="{ 'is-active': state }">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">Add new Staff</p>
                <button
                    class="delete"
                    aria-label="close"
                    @click="() => { emit('toggle') }"
                    :disabled="newMutation.isLoading.value"
                ></button>
            </header>

            <section class="modal-card-body">
                <div class="field">
                    <label class="label">First Name</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            minlength="1"
                            maxlength="45"
                            v-model="staffField.first_name"
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Last Name</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            minlength="1"
                            maxlength="45"
                            v-model="staffField.last_name"
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input
                            class="input"
                            type="email"
                            minlength="0"
                            maxlength="50"
                            v-model="staffField.email"
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Store Id</label>
                    <div class="control">
                        <input class="input" type="number" v-model="staffField.store_id" disabled />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Active</label>
                    <div class="control">
                        <input type="checkbox" class="checkbox" v-model="staffField.active" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Username</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            minlength="1"
                            maxlength="16"
                            v-model="staffField.username"
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Password (Min. 8 Charater)</label>
                    <div class="control">
                        <input
                            class="input"
                            type="text"
                            minlength="0"
                            maxlength="40"
                            v-model="staffField.password"
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Address Id</label>
                    <div class="control">
                        <SearchAddress
                            :address-id="staffField.address_id"
                            @update-id="(id) => staffField.address_id = id"
                        />
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <button
                    class="button is-success"
                    :class="{ 'is-loading': newMutation.isLoading.value }"
                    @click="() => newRow()"
                    :disabled="newMutation.isLoading.value"
                >Create</button>
                <button
                    class="button"
                    :disabled="newMutation.isLoading.value"
                    @click="() => { emit('toggle') }"
                >Cancel</button>
            </footer>
        </div>
    </div>
</template>