<template>
    <nav class="nav bg-primary">
        <div class="container d-flex align-items-center justify-content-between">
            <div class="d-flex">
                <h1 class="m-0 fw-bold text-white">後台管理</h1>
                <ul class="d-flex align-items-center m-0 p-0">
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


            <button class="fw-bold btn text-white d-flex align-items-center" @click="logout"><span>登出</span> <i class="bi bi-box-arrow-right fs-4 ms-2"></i> </button>
        </div>

    </nav>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'pinia'
import toastStore from '@/stores/toastStore'


export default {
    methods: {
        ...mapActions(toastStore, [
            'handleError'
        ]),
        async logout() {
            try {
                const api = `${import.meta.env.VITE_API}logout`
            const res = await axios.post(api)
            if (res.data.success) {
                document.cookie = `mysToken=;expires=${new Date(0)}`
                this.$router.push('/login')
            }
                
            } catch (error) {
                this.handleError();
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