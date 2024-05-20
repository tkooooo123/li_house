<template>
    <div class="container pt-3">
        <h2 class="fs-2 fw-bold text-center text-primary">新品登場</h2>
        <ul class="p-0 row g-3">
            <li v-for="item in productList" :key="item.id" class="col-lg-3 col-sm-6">
                <RouterLink :to="{path: `product/${item.id}`}">
                    <div class="product-card border border-primary rounded-2 h-100 d-flex flex-column">
                    <img class="product-img" :src="item.imageUrl" :alt="item.title">
                    <div class="d-flex flex-column flex-grow-1 p-2">
                        <h4 class="mt-2 fw-bold flex-grow-1">{{ item.title }}</h4>
                        <div>
                            <span class="fw-bold text-black text-decoration-line-through">NT${{ item.origin_price }}</span>
                            <span class="fw-bold text-danger ps-3">NT${{ item.price }}</span>
                        </div>

                    </div>
                </div>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import productsStore from '@/stores/productsStore'
export default {


    data() {
        return {
            productList: [],
        }
    },
    created() {
        this.getProducts()
    },
    methods: {
        ...mapActions(productsStore, [
            'fetchProducts'
        ]),
        async getProducts() {
            await this.fetchProducts();
            console.log(this.productsAll)
            this.productList = this.productsAll.slice(0, 4)
        }
    },
    computed: {
        ...mapState(productsStore, [
            'products',
            'productsAll'
        ])
    }
}
</script>

<style lang="scss" scoped>
a{
    text-decoration:none;
}
.product-card {
    overflow: hidden;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    }
}

.product-img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    transition: all 0.2s;

    &:hover {
        transform: scale(1.05);
    }
}
</style>
