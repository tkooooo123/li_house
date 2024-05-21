<template>
    <div class="container pt-mh">
        <div class="row pt-5 g-5">
            <div class="col-md-7 d-md-flex flex-sm-row-reverse justify-content-between">
                <div className="product-img-wrapper">
                    <img className="product-img" :src="product.imageUrl" :alt="product.title" />
                </div>

                <div class="d-flex  flex-md-column text-nowrap overflow-hidden me-md-3 me-0 mt-3 mt-md-0">
                    <div class="bg-light m-1" v-for="img in product.imagesUrl" :key="img">
                        <img class="product-images" :src="img" alt="商品其他圖片">
                    </div>
                </div>
            </div>
            <div class="col-md-5">
                <h2 class="text-primary fw-bold">{{ product.title }}</h2>
                <span class="fw-bold fs-5 mt-2">{{ product.category }}</span>
                <div class="mt-3">
                    <span class="text-danger fw-bold me-4 fs-3">NT$ {{ product.price }}</span>
                    <span class="text-decoration-line-through fw-bold text-muted">NT$ {{ product.origin_price }}</span>
                </div>
                <div class="row align-items-center mt-4">
                    <div class="col-lg-6 col-md-12 col-sm-6">
                        <QuantityBtn :quantity="1" @change-quantity="getQty" />
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-6 mt-lg-0 mt-md-3 mt-sm-0 mt-3">
                        <button class="btn btn-primary w-100"
                        @click="addToCart(product.id, qty)"
                        >加入購物車</button>
                    </div>
                </div>
                <hr>

                <h3 class="fw-bold">商品介紹</h3>
                <span class="mt-1 fw-bold">{{ product.description }}</span>
                <h3 class="fw-bold mt-3">內容</h3>
                <p class="product-content mt-1 fw-bold">{{ product.content }}</p>
            </div>
        </div>
        <hr>
        <h3 class="text-primary text-center fw-bold">相關商品</h3>
        <div class="py-5">
            <ProductSwiper :products="relativeProducts" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productsStore from '@/stores/productsStore'
import QuantityBtn from '@/components/front/products/QuantityBtn.vue'
import ProductSwiper from '@/components/front/products/ProductSwiper.vue'
import cartStore from '@/stores/cartStore'

export default {
    data() {
        return {
            qty: 1,
        }
    },
    components: {
        QuantityBtn,
        ProductSwiper
    },
    created() {
        this.fetchProduct(this.$route.params.productId);
    },
    mounted() {

    },
    methods: {
        ...mapActions(productsStore, [
            'fetchProduct',
        ]),
        ...mapActions(cartStore, [
            'addToCart'
        ]),
        getQty(num) {
            this.qty = num
        },

    },
    computed: {
        ...mapState(productsStore, [
            'product',
            'productsAll',
            'relativeProducts'
        ]),
        id() {
            return this.$route.params.productId
        },
    },
    watch: {
        id(newId, oldId) {
            console.log(oldId, 1)
            if (newId !== oldId) {
                this.fetchProduct(newId);
            }
        }
    }
}
</script>

<style lang="scss">
.product-img {
    max-height: 30rem;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 1;
}

.product-images {
    width: 100px;
    aspect-ratio: 1;
}

.product-content {
    white-space: pre-line;
}
</style>