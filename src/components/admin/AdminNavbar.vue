<template>
    <nav class="nav bg-primary">
        <div class="container d-flex align-items-center justify-content-between">
            <div class="d-flex">
                <h1 class="m-0 fw-bold text-white">後台管理</h1>
                <ul class="d-flex align-items-center m-0 p-0"
                :class="show"
                >
                    <li>
                        <RouterLink to="/admin/product" class="nav-link">
                            商品
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/order" class="nav-link">
                            訂單
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/coupon" class="nav-link">
                            優惠券
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/admin/article" class="nav-link">
                            文章
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <button class="fw-bold btn text-white border-0 align-items-center" :class="show"
                @click="logout"><span>登出</span> <i class="bi bi-box-arrow-right fs-4 ms-2"></i> </button>


        </div>

    </nav>
</template>

<script>
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import toastStore from '@/stores/toastStore'
import adminStore from '@/stores/adminStore'


export default {
    data() {
        return {
            show: 'd-none'
        }
    },
    methods: {
        ...mapActions(toastStore, [
            'handleError'
        ]),
        async logout() {
            try {
                const api = `${import.meta.env.VITE_API}logout`
                const res = await axios.post(api)
                if (res.data.success) {
                    document.cookie = 'hexToken=;'
                    this.show = 'd-none'
                    this.$router.push('/admin/login')
                }

            } catch (error) {
                this.handleError();
            }
        }

    },
    computed: {
        ...mapState(adminStore, [
            'isAdmin'
        ])

    },
    watch: {
        isAdmin() {
            if (this.isAdmin) {
                this.show = 'd-flex'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.nav {
    position: fixed;
    left: 0;
    right: 0;
    height: 66px;
    z-index: 100;
}

.nav-link {
    color: white;
    font-weight: bold;
    margin-left: 20px;
    font-size: 20px;

    &:hover {
        transform: scale(1.1);
    }
}
</style>