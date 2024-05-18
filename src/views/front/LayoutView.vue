<template>
    <NavbarComponent />
    <ToastMessage />
    <RouterView />
</template>

<script>
import NavbarComponent from '../../components/layout/NavbarComponent.vue';
import ToastMessage from '../../components/layout/ToastMessage.vue'

export default {
    components: {
        NavbarComponent,
        ToastMessage,
    }
}
</script>

