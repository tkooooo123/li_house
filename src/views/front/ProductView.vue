<template>
    <div class="container pt-mh">
        <h1 class="pt-4">商品一覽</h1>
        <div class="row">
            <div class="col-md-3">
                <ul class="p-0">
                    <li class="category-item py-2" v-for="category in categoryList" :key="category">
                        <span class="fw-bold rounded-2" :class="{ active: categorySelected === category }"
                            @click="test(category)">{{ category }}

                        </span>
                    </li>
                </ul>
            </div>
            <div class="col-md-9">
                <div v-if="products.length">
                    <ul class="row g-3 p-0">
                        <li class="col-lg-4 col-sm-6 col-12" v-for="product in products" :key="product.id">
                            <ProductCard 
                            :product="product"
                            />
                        </li>
                    </ul>
                </div>
                <div class="d-flex justify-content-center">
                    <PaginationComponent :pages="pagination" :items="filteredProducts" @change-page="getPagination" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "pinia";
import productsStore from '@/stores/productsStore';
import cartStore from '@/stores/cartStore';
import PaginationComponent from '@/components/front/products/PaginationComponent.vue';
import ProductCard from "@/components/front/products/ProductCard.vue";

export default {
    components: {
        PaginationComponent,
        ProductCard,
    },
    created() {
        if(this.$route.query.category) {
          this.fetchFilter()
        } else {
            this.fetchProducts();
        this.getPagination(this.products)
        }
    },
    methods: {
        ...mapActions(productsStore, [
            'fetchProducts',
            'changeCategory',
            'getPagination'
        ]),
        ...mapActions(cartStore, [
            'addToCart',
        ]),
        test(item) {
            this.changeCategory(item)
            this.$router.push(`/products?category=${item}`)
        },
        async fetchFilter() {
            await this.fetchProducts()
            this.changeCategory(this.$route.query.category)
        }
    },
    computed: {
        ...mapState(productsStore, [
            'products',
            'filteredProducts',
            'categoryList',
            'categorySelected',
            'pagination'
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