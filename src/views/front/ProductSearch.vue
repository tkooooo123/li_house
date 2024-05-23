<template>
    <div class="container pt-mh">
        <h1 class="pt-5 fw-bold">搜尋結果</h1>
        <div class="row pt-3">
            <div class="col-md-3">
                <h3 class="fw-bold pb-3">搜尋關鍵字：</h3>
                <span class="fw-bold bg-primary text-white p-2 rounded-4">{{ $route.query.keyword }}</span>
            </div>
            <div class="col-md-9 mt-5 mt-md-0">
                <div v-if="products.length">
                    <ul class="row g-3 p-0">
                        <li class="col-lg-4 col-sm-6 col-12" v-for="product in products" :key="product.id">
                            <ProductCard 
                            :product="product"
                            />
                        </li>
                    </ul>
                    <div class="d-flex justify-content-center py-5">
                        <PaginationComponent :pages="pagination" :items="filteredProducts"
                            @change-page="getPagination" />
                    </div>
                </div>

                <p className="fs-2 fw-bold text-center mt-5" v-else>沒有符合條件的商品。</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import productsStore from '@/stores/productsStore';
import ProductCard from '@/components/front/products/ProductCard.vue';
import PaginationComponent from '@/components/front/products/PaginationComponent.vue';

export default {
    components: {
        ProductCard,
        PaginationComponent
    },
    created() {
        this.searchProduct(this.$route.query.keyword)
    },
    methods: {
        ...mapActions(productsStore, [
            'searchProduct',
            'getPagination'
        ])
    },
    computed: {
        ...mapState(productsStore, [
            'products',
            'filteredProducts',
            'pagination'
        ])
    },
    watch: {
        $route(to) {
            this.searchProduct(to.query.keyword)
        }
    }
}
</script>