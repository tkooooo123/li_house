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
import axios from "axios";

import adminStore from '@/stores/adminStore';
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
        ]),
        ...mapState(adminStore, [
        ]),
        path() {
            return this.$route.path
        }
    },
    methods: {
        ...mapActions(adminStore, [
            'checkUser',
            'setIsAdmin',
            'removeIsAdmin'
        ]),
        async checkIsAdmin() {
            try {
                const token = document.cookie
                    .split('; ')
                    .find((row) => row.startsWith('hexToken='))
                    ?.split('=')[1];

                axios.defaults.headers.common['Authorization'] = token;

                const api = `${import.meta.env.VITE_API}api/user/check`;
                const res = await axios.post(api)
                if (res.data.success) {
                    this.setIsAdmin()

                } else {
                    this.removeIsAdmin()
                    this.$router.push('/admin/login')
                }
            } catch (error) {
                this.handleError();
            }

        }
    },
    created() {
        this.checkIsAdmin();
    },
    watch: {
        path() {
            this.checkIsAdmin()
        }
    }

}
</script>