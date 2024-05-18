<template>
    <div class="container pt-5">
        <h1 class="pt-5 fw-bold">搜尋結果</h1>
        <div class="row pt-3">
            <div class="col-md-3">
                <h3 class="fw-bold pb-3">搜尋關鍵字：</h3>
                <span class="fw-bold bg-primary text-white p-2 rounded-4">{{ keyword }}</span>
            </div>
            <div class="col-md-9">
                <ProductCard 
                :products ="products"
                />
                <div class="d-flex justify-content-center">
                    <PaginationComponent :pages="pagination" :items="filteredProducts" @change-page="getPagination" />
                </div>
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
    data() {
        return {
            keyword: '',
        }
    },
    created() {
        console.log(this.$route.query.keyword, this.pagination)
        this.keyword = this.$route.query.keyword;
        this.searchProduct(this.keyword)
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
    }
}
</script>