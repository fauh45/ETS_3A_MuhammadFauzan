<script lang="ts">
import { defineComponent } from "vue"
import { useQueryProvider } from "vue-query";
import App from "./App.vue";

export default defineComponent({
    components: { App },
    setup() {
        useQueryProvider()
    }
})
</script>

<template>
    <App />
</template>