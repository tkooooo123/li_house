<template>
    <NavbarComponent />
    <ToastMessage />
    <RouterView />
    <FooterComponent />
</template>

<script>
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NavbarComponent from '../../components/layout/NavbarComponent.vue';
import ToastMessage from '../../components/layout/ToastMessage.vue'

export default {
    components: {
        NavbarComponent,
        FooterComponent,
        ToastMessage,
    }
}
</script>

