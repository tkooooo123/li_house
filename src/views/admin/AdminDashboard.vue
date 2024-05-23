<template>
    <div>
        <AdminNavbar />
        <RouterView />
        <ToastMessage />
        <LoadingComponent :isLoading="isLoading" />
    </div>
</template>

<script>
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
import LoadingComponent from "@/components/layout/LoadingComponent.vue";
import ToastMessage from "@/components/layout/ToastMessage.vue";
import { mapActions, mapState } from 'pinia';
import statusStore from '@/stores/statusStore';
import axios from 'axios';
import toastStore from '@/stores/toastStore';

export default {
    components: {
        AdminNavbar,
        ToastMessage,
        LoadingComponent
    },
    computed: {
        ...mapState(statusStore, [
            'isLoading'
        ]),
    },
    methods: {
        ...mapActions(toastStore, [
            'failToast',
            'handleError'
        ]),
        async checkUser() {
            try {
                const api = `${import.meta.env.VITE_API}api/user/check`;
                const res = await axios.post(api)
                if (!res.data.success) {
                    this.failToast(res.data.message);
                    this.$router.push('/login')
                }
            } catch (error) {
                this.handleError()
            }

        }
    },
    created() {
        this.checkUser();
    }

}
</script>