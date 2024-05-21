<template>
    <div class="container pt-mh">

        <div class="row py-5 g-3" v-if="cartList.length">
            <Stepper :stepper="1" />
            <div class="col-md-8 col-12">
                <div class="d-flex justify-content-between">
                    <h2 class="fw-bold text-primary">購物車清單</h2>
                    <button class="btn btn-outline-primary fw-bold delete-all"
                        @click="openDeleteCartModal">全部刪除</button>
                    <DeleteCartModal ref="deleteCartModal" @handle-delete="handleCartDelete" />
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
                            <button class="btn border-0" @click="openDeleteItemModal(item)"><i
                                    class="bi bi-trash3-fill"></i></button>
                        </div>

                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <QuantityBtn :item="item" />

                            <strong class="ps-5">小計 ${{ item.product.price * item.qty }}</strong>

                        </div>

                    </li>
                    <DeleteItemModal ref="deleteItemModal" :item="tempItem" @handle-delete="handleItemDelete"/>
                </ul>
            </div>
            <div class="col-md-4 col-12">
                <h2 class="fw-bold text-primary">使用優惠券</h2>
                <div class=" d-flex coupon-group flex-lg-row justify-content-between pt-3">
                    <input type="text"
                        class="coupon-input border border-primary rounded-pill fw-bold py-lg-0 ps-3 me-lg-3"
                        placeholder="請輸入優惠碼" v-model="coupon">
                    <button type="button"
                        class="btn btn-primary text-white rounded-pill fw-bold mt-3 mt-lg-0"
                        @click="useCoupon(coupon)"
                        >套用</button>
                </div>
                <p class="m-2 text-primary" v-if="cartList[0].coupon"><strong>已套用優惠碼：{{ cartList[0].coupon?.code }}</strong></p>
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
                            <td>- NT$ 
                                {{ total - Math.ceil(finalTotal) }}
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td class="text-start">總金額</td>
                            <td>NT$ {{ Math.ceil(finalTotal) }}</td>
                        </tr>
                    </tfoot>
                </table>
                <div class="d-flex justify-content-between">
                    <RouterLink class="btn btn-outline-secondary fw-bold rounded-pill" to="/products">繼續購物</RouterLink>
                    <RouterLink class="btn btn-primary fw-bold text-white rounded-pill" to="/cart/checkout">確認結帳</RouterLink>
                </div>
            </div>
        </div>
        <div class="text-center mt-5" v-else>
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
import QuantityBtn from '@/components/front/cart/QuantityBtn.vue';
import DeleteCartModal from '@/components/front/cart/DeleteCartModal.vue';
import DeleteItemModal from '@/components/front/cart/DeleteItemModal.vue';

export default {
    components: {
        Stepper,
        QuantityBtn,
        DeleteCartModal,
        DeleteItemModal,
    },
    data() {
        return {
            tempItem: '',
            coupon: ''
        }
    },
    created() {
        this.fetchCart();
        this.coupon = 'PET888'
    },
    methods: {
        ...mapActions(cartStore, [
            'fetchCart',
            'deleteCartItem',
            'deleteCart',
            'updateCartItem',
            'useCoupon'
        ]),
        openDeleteCartModal() {
            this.$refs.deleteCartModal.showModal()
        },
        handleCartDelete() {
            this.deleteCart();
            this.$refs.deleteCartModal.hideModal()
        },
        openDeleteItemModal(item) {
            this.tempItem = {...item}
            this.$refs.deleteItemModal.showModal()
        },
        handleItemDelete(id) {
            this.deleteCartItem(id);
            this.$refs.deleteItemModal.hideModal()
        },
    },
    computed: {
        ...mapState(cartStore, [
            'cartList',
            'total',
            'finalTotal',
            'couponCode'
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

.delete-all,
.link-btn {
    &:hover {
        color: white;
    }
}

.cart-list {
    border: 1px solid $primary;
    border-radius: 16px;
    
}

.cart-item {
    border-top: 1px solid $primary;
    
    &:first-child {
        border-top: none;
    }
}

.cart-item-img {
    width: 100px;
    aspect-ratio: 1;
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