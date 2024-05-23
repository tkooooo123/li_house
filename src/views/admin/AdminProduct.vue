<template>
    <div class="pt-mh-100 bg-white">
        <div class="container pb-5">
            <h1 class="fw-bold mt-3">商品列表</h1>
            <table class="table fs-5">
                <thead>
                    <tr class="fw-bold">
                        <th scope='col'>圖片</th>
                        <th scope='col'>名稱</th>
                        <th scope='col'>分類</th>
                        <th scope='col'>售價</th>
                        <th scope='col'>啟用狀態</th>
                        <th scope='col'>編輯 / 刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in productList" :key="item.id">
                        <td>
                            <img :src="item.imageUrl" :alt="item.title" class="product-img">
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.category }}</td>
                        <td>NT$ {{ item.price }}</td>
                        <td>
                            <span v-if="item.is_enabled">已啟用</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary fw-bold" @click="showProductModal(item)">編輯</button>
                            <span> / </span>
                            <button class="btn btn-outline-danger" @click="showDeleteModal(product)">刪除</button>
                        </td>
                    </tr>
                </tbody>
                <ProductModal ref="ProductModal" :product="tempProduct"/>
            </table>
            <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage"/>
      </div>
    </div>
</template>

<script>
import PaginationComponent from '@/components/admin/PaginationComponent.vue'
import ProductModal from '@/components/admin/modal/ProductModal.vue'
import adminStore from '@/stores/adminStore'
import { mapActions, mapState } from 'pinia'


export default {
    components: {
        PaginationComponent,
        ProductModal
    },
    data() {
        return {
            curPage: 1,
            tempProduct: {}
        }
    },
    created() {
      this.fecthAdminProducts();
    },
    methods: { 
        ...mapActions(adminStore, [
            'fecthAdminProducts'
        ]),
        changePage(page) {
            this.curPage = page
        },
        showProductModal(product) {
           this.tempProduct = product;
            this.$refs.ProductModal.showModal()
        },
    },
    computed: {
        ...mapState(adminStore, [
            'productList',
            'pagination'
        ])
    },
    watch: {
        curPage() {
            this.fecthAdminProducts(this.curPage);
        }
    }
}
</script>

<style lang="scss" scoped>
.product-img {
    width: 100px;
    aspect-ratio: 1;
}

</style>