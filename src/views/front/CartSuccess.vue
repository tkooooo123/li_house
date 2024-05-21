<template>
    <div class="container pt-mh">
        <div class="row justify-content-center">
            <div v-if="order.is_paid" class="col-md-8 text-center py-5">
                <div class="p-5 border border-primary mt-5 rounded-5 ">
                    <p className="check-logo mx-2">
                    <i className="bi bi-check-circle-fill text-primary"></i>
                </p>
                <h2 class="fw-bold">付款成功！</h2>
                <p class="fs-4 py-2">感謝您的訂購，商品將於 2-5 個工作天內完成配送</p>
                <RouterLink to="/" class="btn btn-primary fw-bold rounded-pill text-white fs-4 mt-3 px-4">返回首頁</RouterLink>
                </div>           
            </div>
            <div v-else>
                <CartStepper :stepper="3" />
                <div class="col-lg-8 m-auto">
                    <div className='d-flex justify-content-center align-items-center mt-3'>
                        <p className='check-logo  mx-2'>
                            <i className="bi bi-check-circle-fill text-primary"></i>
                        </p>
                        <div>
                            <h2 className="fw-bold mt-2">您的訂單已建立完成！</h2>
                            <p className="text-muted fw-bold fs-5">訂單編號：{{ orderId }}</p>
                        </div>
                    </div>
                    <div class="d-sm-flex flex-sm-row justify-content-between align-items-center mt-2">
                        <h3 class="fs-4 fw-bold">訂單日期：{{ new Date(order.create_at * 1000).toLocaleDateString() }}</h3>
                        <h3 class="fs-4 fw-bold mt-3 mt-sm-0">訂單金額： NT${{ Math.ceil(order.total) }}</h3>
                    </div>
                    <div>
                        <ul class="cart-list mt-3 p-0">
                            <li class="cart-item p-3 d-flex flex-column justify-content-center"
                                v-for="item in order.products" :key="item.id">
                                <div class="d-flex justify-content-between">
                                    <div class="d-flex">
                                        <img class="cart-item-img" :src="item.product.imageUrl"
                                            :alt="item.product.title" />
                                        <div className="d-inline-block  align-middle ms-3">
                                            <strong className="fw-bold">{{ item.product.title }}</strong>
                                            <p className="fs-8 text-muted fw-bold">{{ item.product.category }}</p>
                                            <span class="fw-bold text-decoration-line-through">NT${{ item.total
                                                }}</span>
                                            <span class="fw-bold ms-2 text-danger">NT${{
                Math.ceil(item.final_total) }}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex flex-column justify-content-between">
                                        <strong class="text-end">x {{ item.qty }}</strong>
                                        <strong class="text-end">小計 ${{ Math.ceil(item.final_total) * item.qty
                                            }}</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="text-center py-4">
                        <button class="btn btn-primary fw-bold text-white rounded-pill text-center fs-5 px-5"
                            @click="goToPay(orderId)">前往付款</button>
                    </div>
                </div>

            </div>



        </div>

    </div>
</template>

<script>
import CartStepper from '@/components/front/cart/CartStepper.vue';
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
    components: {
        CartStepper,
    },
    data() {
        return {
            orderId: this.$route.params.orderId
        }
    },
    created() {
        this.fetchOrder(this.orderId)

    },
    methods: {
        ...mapActions(cartStore, [
            'fetchOrder',
            'goToPay'
        ])
    },
    computed: {
        ...mapState(cartStore, [
            'order'
        ])
    }
}

</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.check-logo {
    font-size: 4rem;
}

.cart-list {
    border: 1px solid $primary;
    border-radius: 16px;
}

.cart-item {
    border-bottom: 1px solid $primary;

    &:last-child {
        border-bottom: none;
    }
}

.cart-item-img {
    width: 100px;
    aspect-ratio: 1;
}
</style>