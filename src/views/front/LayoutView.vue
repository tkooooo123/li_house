<template>
    <LoadingComponent :isLoading="isLoading()"/>
    <NavbarComponent />
    <ToastMessage />
    <RouterView />
    <FooterComponent />
    <ScrollToTop />
</template>

<script>
import FooterComponent from '@/components/layout/FooterComponent.vue';
import NavbarComponent from '../../components/layout/NavbarComponent.vue';
import ToastMessage from '../../components/layout/ToastMessage.vue'
import LoadingComponent from '@/components/layout/LoadingComponent.vue'
import ScrollToTop from '@/components/layout/ScrollToTop.vue'
import { mapState } from 'pinia';
import statusStore from '@/stores/statusStore';

export default {
    components: {
        NavbarComponent,
        FooterComponent,
        ToastMessage,
        LoadingComponent,
        ScrollToTop
    },
    methods: {
        ...mapState(statusStore, [
            'isLoading'
        ])
    },
}
</script>

