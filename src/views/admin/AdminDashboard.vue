<template>
    <div>
        <AdminNavbar/>
        <RouterView/>
        <ToastMessage/>
        <LoadingComponent :isLoading="isLoading"/>
    </div>
</template>

<script>
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import LoadingComponent from "@/components/layout/LoadingComponent.vue";
import ToastMessage from "@/components/layout/ToastMessage.vue";
import { mapState } from 'pinia';
import statusStore from '@/stores/statusStore';

export default {
    components: {
        AdminNavbar,
        ToastMessage,
        LoadingComponent
    },
    computed: {
        ...mapState(statusStore, [
            'isLoading'
        ])
    },
  
}
</script>