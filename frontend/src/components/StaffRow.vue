<script lang="ts" setup>
import axios from "axios";
import { ref } from "vue";
import { useMutation, useQueryClient } from "vue-query";
import { Staff } from "./staff.typedef";

const props = defineProps<{ data: Staff }>()

const editMode = ref(false)
const staffField = ref(props.data)

const queryClient = useQueryClient()
const deleteMutation = useMutation((id: number) => axios.delete(import.meta.env.VITE_BACKEND_URL + "/staff/" + id), {
    onSuccess: () => {
        queryClient.refetchQueries("staff")
    },
    onError: (err) => {
        console.error(err);

        window.alert("Error deleting : " + err)
    }
})
const updateMutation = useMutation((data: Staff) => axios.put(import.meta.env.VITE_BACKEND_URL + "/staff/" + data.staff_id, data), {
    onSuccess: () => {
        queryClient.refetchQueries("staff")

        toggleEditMode()
    },
    onError: (err) => {
        console.error(err);

        window.alert("Error updating : " + err)
    }
})

const deleteRow = () => {
    const confirmResult = window.confirm("Are you sure to delete staff : " + props.data.first_name)

    if (confirmResult) {
        deleteMutation.mutate(props.data.staff_id)
    }
}

const toggleEditMode = () => {
    editMode.value = !editMode.value

    staffField.value = { ...props.data, email: props.data.email || "", password: props.data.password || "" }
}

const updateRow = () => {
    const confirmResult = window.confirm("Are you sure to update staff : " + props.data.first_name)
    const updatedValue: Staff = {
        ...staffField.value,
        email: staffField.value.email === "" ? null : staffField.value.email,
        password: staffField.value.password === "" ? null : staffField.value.password
    }

    if (confirmResult) {
        updateMutation.mutate(updatedValue)
    } else {
        toggleEditMode()
    }
}

</script>

<template>
    <tr>
        <td>
            <p>{{ data.staff_id }}</p>
        </td>
        <td>
            <input
                v-if="editMode"
                class="input"
                type="text"
                minlength="1"
                maxlength="45"
                v-model="staffField.first_name"
            />
            <p v-else>{{ data.first_name }}</p>
        </td>
        <td>
            <input
                v-if="editMode"
                class="input"
                type="text"
                minlength="1"
                maxlength="45"
                v-model="staffField.last_name"
            />
            <p v-else>{{ data.last_name }}</p>
        </td>
        <td>
            <input v-if="editMode" class="input" type="number" v-model="staffField.address_id" disabled />
            <p v-else>{{ data.address_id }}</p>
        </td>
        <td>
            <input
                v-if="editMode"
                class="input"
                type="email"
                minlength="0"
                maxlength="50"
                v-model="staffField.email"
            />
            <p v-else-if="!data.email">
                <b>Email Empty</b>
            </p>
            <p v-else>{{ data.email }}</p>
        </td>
        <td>
            <input v-if="editMode" class="input" type="number" v-model="staffField.store_id" disabled />
            <p v-else>{{ data.store_id }}</p>
        </td>
        <td>
            <input v-if="editMode" type="checkbox" class="checkbox" v-model="staffField.active" />
            <p v-else>{{ data.active ? "Active" : "Non-Active" }}</p>
        </td>
        <td>
            <input
                v-if="editMode"
                class="input"
                type="text"
                minlength="1"
                maxlength="16"
                v-model="staffField.username"
            />
            <p v-else>{{ data.username }}</p>
        </td>
        <td>
            <input
                v-if="editMode"
                class="input"
                type="text"
                minlength="0"
                maxlength="40"
                v-model="staffField.password"
            />
            <p v-else-if="!data.password">
                <b>Password Empty</b>
            </p>
            <p v-else>{{ data.password }}</p>
        </td>
        <td>
            <button
                class="button"
                :disabled="deleteMutation.isLoading.value"
                @click="() => toggleEditMode()"
                v-if="!editMode"
            >Update</button>
            <button
                class="button is-primary"
                :class="{ 'is-loading': updateMutation.isLoading.value }"
                @click="() => updateRow()"
                :disabled="updateMutation.isLoading.value"
                v-else
            >Confirm</button>
        </td>
        <td>
            <button
                class="button is-danger"
                :class="{ 'is-loading': deleteMutation.isLoading.value }"
                :disabled="deleteMutation.isLoading.value"
                @click="() => deleteRow()"
                v-if="!editMode"
            >Delete</button>
            <button
                class="button is-danger"
                @click="() => toggleEditMode()"
                :disabled="updateMutation.isLoading.value"
                v-else
            >Cancel</button>
        </td>
    </tr>
</template>

<style scoped>
.table td {
    vertical-align: middle;
}
</style>