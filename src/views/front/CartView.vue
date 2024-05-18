<template>
    <div class="container pt-5">

        <div class="row pt-5 g-5" v-if="cartList.length">
            <Stepper
            :stepper="1"
            />
            <div class="col-md-8 col-12">
                <div class="d-flex justify-content-between">
                    <h2 class="fw-bold text-primary">購物車清單</h2>
                    <button class="btn btn-outline-primary fw-bold delete-all">全部刪除</button>
                </div>
                <ul class="cart-list mt-3 p-0">
                    <li class="cart-item p-3 d-flex flex-column justify-content-center" v-for="item in cartList"
                        :key="item.id">

                        <div class="d-flex justify-content-between">
                            <div>
                                <img class="cart-item-img" :src="item.product.imageUrl" :alt="item.product.title" />
                                <div className="d-inline-block  align-middle ms-md-3">
                                    <h5 className="fw-bold">{{ item.product.title }}</h5>
                                    <p className="fs-8 text-muted fw-bold">{{ item.product.category }}</p>
                                    <span class="fw-bold">NT${{ item.product.price }}</span>
                                </div>
                            </div>
                            <button class="btn"><i class="bi bi-trash3-fill"></i></button>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <div className="cart-item-quantity">
                                <button class="btn btn-outline-primary quantity-btn rounded-circle"><i
                                        class="bi bi-dash"></i></button>
                                <input type="number"
                                    class="from-control quantity-input text-center align-middle border border-primary rounded-pill mx-2"
                                    :value="item.qty" min="1" disabled>
                                <button type="button" class="btn btn-outline-primary quantity-btn rounded-circle"><i
                                        class="bi bi-plus"></i></button>
                            </div>


                            <strong class="ps-5">小計 ${{ item.product.price * item.qty }}</strong>

                        </div>

                    </li>
                </ul>
            </div>
            <div class="col-md-4 col-12">
                <h2 class="fw-bold text-primary">使用優惠券</h2>
                <div class=" d-flex coupon-group flex-lg-row justify-content-between pt-3">
                    <input type="text" class="coupon-input border border-primary rounded-pill fw-bold py-lg-0 ps-3 me-lg-3"
                        placeholder="請輸入優惠碼">
                    <button type="button" class="btn btn-primary text-white rounded-pill fw-bold mt-3 mt-lg-0">套用</button>
                </div>
                <table class="table mt-3 text-end fw-bold">
                    <tbody>
                        <tr>
                            <td class="text-start">商品總計</td>
                            <td>NT$ {{ total }}</td>
                        </tr>
                        <tr>
                            <td class="text-start">運費</td>
                            <td>NT$ 0</td>
                        </tr>
                        <tr>
                            <td class="text-start">優惠折抵</td>
                            <td>- NT$</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="text-start">總金額</td>
                            <td>NT$ {{ finalTotal }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-outline-primary fw-bold">繼續購物</button>
                    
                    <button type="button" class="btn btn-primary fw-bold text-white">確認結帳</button>
                </div>
            </div>
        </div>
        <div class="text-center mt-5"
        v-else
        >
        <div class="cart-icon text-center">
            <i class="bi bi-cart-x"></i>
        </div>
        <h2 className="fw-bold mt-3 text-center">您的購物車沒有商品！</h2>
        <RouterLink class="fw-bold btn btn-outline-primary mt-2 link-btn" to="/products">前往購物</RouterLink>

        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import Stepper from '@/components/front/cart/CartStepper.vue';

export default {
    components: {
        Stepper,
    },
    created() {
        this.fetchCart();
        console.log(this.cartList, 123)

    },
    methods: {
        ...mapActions(cartStore, [
            'fetchCart'
        ])
    },
    computed: {
        ...mapState(cartStore, [
            'cartList',
            'total',
            'finalTotal'
        ])
    }

}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.cart-icon {
    font-size: 9rem;
}

.delete-all, .link-btn {
    &:hover {
        color: white;
    }
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

.quantity-btn {
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;

    &:hover {
        color: white;
    }
}

.quantity-input {
    width: 5rem;
    height: 2rem;
}

.coupon-group {
    flex-direction: column;
}

.coupon-input {
    padding: 5px 0;
    min-width: 8rem;
    flex: 1;
}

td {
    border: none;
}

tfoot {
    border-top: 1px solid $primary;
}
</style>