<template>
    <div class="container pt-5">
        <CartStepper :stepper="2" />
        <div class="row py-5 g-5">
            <div class="col-lg-8 ">
                <div class="d-flex justify-content-between">
                    <RouterLink class="btn btn-outline-secondary fw-bold rounded-pill" to="/cart">返回購物車</RouterLink>
                    <h2 class="text-primary fw-bold fs-4">訂單金額：NT$ {{ Math.ceil(finalTotal) }}</h2>
                </div>
                <ul class="cart-list mt-3 p-0">
                    <li class="cart-item p-3 d-flex flex-column justify-content-center" v-for="item in cartList"
                        :key="item.id">
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <img class="cart-item-img" :src="item.product.imageUrl" :alt="item.product.title" />
                                <div className="d-inline-block  align-middle ms-3">
                                    <strong className="fw-bold">{{ item.product.title }}</strong>
                                    <p className="fs-8 text-muted fw-bold">{{ item.product.category }}</p>
                                    <span class="fw-bold">NT${{ item.product.price }}</span>
                                </div>
                            </div>
                            <div class="d-flex flex-column justify-content-between">
                                <strong class="text-end">x {{ item.qty }}</strong>
                                <strong class="text-end">小計 ${{ item.product.price * item.qty }}</strong>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
            <div class="col-md-4">
                <h2 class="fw-bold fs-4">訂購資訊</h2>
                <VForm v-slot="{ errors }" @submit="handleSubmit">
                    <div class="mb-3">
                        <label for="name" class="form-label">收件人姓名<span class="text-danger">*</span></label>
                        <VField type="text" class="form-control border border-primary" id="name"
                            placeholder="" name="姓名" rules="required" :class="{ 'is-invalid': errors['姓名'] }"
                            v-model.trim="user.name" />
                        <ErrorMessage name="姓名" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">收件人電話<span class="text-danger">*</span></label>
                        <VField type="tel" class="form-control border border-primary" id="phone"
                            placeholder="0912123456" name="電話" :rules="isPhone" :class="{ 'is-invalid': errors['電話'] }"
                            v-model.trim="user.tel" />
                        <ErrorMessage name="電話" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">收件人 email<span class="text-danger">*</span></label>
                        <VField type="email" class="form-control border border-primary" id="email"
                            placeholder="user1@gmail.com" name="email" rules="email|required"
                            :class="{ 'is-invalid': errors['email'] }" v-model.trim="user.email" />
                        <ErrorMessage name="email" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="address" class="form-label">收件人地址<span class="text-danger">*</span></label>
                        <VField type="text" class="form-control border border-primary" id="address"
                            placeholder="台中市東區XX路5號" name="地址" rules="required" :class="{ 'is-invalid': errors['地址'] }"
                            v-model.trim="user.address" />
                        <ErrorMessage name="地址" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">留言</label>
                        <VField as="textarea" class="form-control border border-primary " id="message"
                            name="留言" v-model.trim="message" />
                    </div>

                    <div class="text-end">
                        <button type="submit" class="btn btn-primary text-white rounded-pill fw-bold">
                        送出訂單
                    </button>
                    </div>
                </VForm>

            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import cartStore from '@/stores/cartStore';
import CartStepper from '@/components/front/cart/CartStepper.vue';

export default {
    components: {
        CartStepper
    },
    data() {
        return {
            user: {},
            message: ''
        }
    },
    methods: {
        ...mapActions(cartStore, [
            'submitOrder',
            'fetchCart'
        ]),
        async handleSubmit() {
            await this.submitOrder(this.user, this.message);
            await this.fetchCart();
             this.$router.push(`/cart/success/${this.orderId}`)
        },
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        }
    },
    computed: {
        ...mapState(cartStore, [
            'cartList',
            'finalTotal',
            'orderId'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

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