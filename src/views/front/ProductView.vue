<template>
    <div class="container pt-5">
        <h1 class="pt-4">商品一覽</h1>
        <div class="row">
            <div class="col-md-3">
                <ul class="p-0">
                    <li class="category-item py-2" v-for="category in categoryList" :key="category">
                        <span class="fw-bold rounded-2" :class="{ active: categorySelected === category }"
                            @click="changeCategory(category)">{{ category }}

                        </span>
                    </li>
                </ul>
            </div>
            <div class="col-md-9">
                <div v-if="products.length">
                    <ul class="row g-3 p-0">
                        <li class="col-lg-4 col-sm-6 col-12" v-for="product in products" :key="product.id">
                            <div class="product-card border border-primary rounded-2 h-100 d-flex flex-column">
                                <img class="product-img" :src="product.imageUrl"  :alt="product.title" >
                                <div class="d-flex flex-column flex-grow-1 p-2">
                                    <h4 class="mt-2 fw-bold flex-grow-1">{{ product.title }}</h4>
                                    <p class="fw-bold"> NT${{ product.price }}</p>
                                    <button class="product-btn btn btn-outline-primary fw-bold w-100 "> 加入購物車</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import productsStore from '@/stores/productsStore'

export default {
    created() {
        this.fetchProducts();
    },
    methods: {
        ...mapActions(productsStore, [
            'fetchProducts',
            'changeCategory'
        ])
    },
    computed: {
        ...mapState(productsStore, [
            'products',
            'categoryList',
            'categorySelected'
        ])
    },

}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.category-item {
    span {
        padding: 8px;

    }

    .active,
    &:hover>span {
        color: white;
        background: $primary;
        cursor: pointer;
    }
}

.product-card {
    overflow: hidden;
    cursor: pointer;
    
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    }
}

.product-img {
    height: 300px;
    object-fit: cover;
    transition: all 0.2s;
    &:hover {
        transform: scale(1.05);
    }
}

.product-btn {
    &:hover {
        color: white;
    }
}
</style>