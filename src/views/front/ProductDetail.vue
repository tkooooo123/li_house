<template>
    <div class="container pt-mh">
        <p class="fs-5 fw-bold mt-5">
                    <RouterLink to="/" class="text-secondary">首頁</RouterLink>
                    <span> / </span>
                    <RouterLink to="/products" class="text-secondary">商品一覽</RouterLink>
                    <span> / </span>
                    <RouterLink to="" class="text-black">{{product.title}}</RouterLink>
                </p>
        <div class="row pt-3 g-3">
            <div class="col-md-7 d-md-flex flex-sm-row-reverse justify-content-between">
                <div className="product-img-wrapper">
                    <img className="product-img" :src="tempImg" :alt="product.title" />
                </div>

                <div class="d-flex flex-md-column text-nowrap overflow-hidden me-md-3 me-0 mt-3 mt-md-0">
                    
                    <div class="bg-light m-1">
                        <img class="product-images" :src="product.imageUrl" alt="商品其他圖片"
                        @click="showImg(product.imageUrl)"
                        >
                    </div>
                    <div class="bg-light m-1" v-for="img in product.imagesUrl" :key="img">
                        <img class="product-images" :src="img" alt="商品其他圖片"
                        @click="showImg(img)"
                        >
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
        
        <div class="py-5" v-if="relativeProducts.length">
            <h3 class="text-primary text-center fw-bold pb-5">相關商品</h3>
            <ProductSwiper :products="relativeProducts" />
        </div>
        <div class="py-5" v-else>
            <h3 class="text-primary text-center fw-bold pb-5">其他商品</h3>
            <ProductSwiper :products="otherProducts" />
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
            tempImg: ''
        }
    },
    components: {
        QuantityBtn,
        ProductSwiper
    },
    created() {
        this.fetchProduct(this.$route.params.productId);
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
        showImg(img) {
            this.tempImg = img
        }

    },
    computed: {
        ...mapState(productsStore, [
            'product',
            'productsAll',
            'relativeProducts',
            'otherProducts'
        ]),
        id() {
            return this.$route.params.productId
        },
    },
    watch: {
        id(newId, oldId) {
            if (newId !== oldId) {
                this.fetchProduct(newId);
            }
        },
        product() {
            this.tempImg = this.product.imageUrl    
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
    &:hover {
        cursor: pointer;
    }
}

.product-content {
    white-space: pre-line;
}
</style>