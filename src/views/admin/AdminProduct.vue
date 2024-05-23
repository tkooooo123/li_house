<template>
    <div class="pt-mh-100 bg-white">
        <div class="container pb-5">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold mt-3">商品列表</h2>
                <div>
                    <button class="btn btn-primary"
                @click="showProductModal(null ,type = 'create')"
                >新增商品</button>
                </div>
            </div>
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
                            <button class="btn btn-outline-primary fw-bold"
                                @click="showProductModal(item, type = 'edit')">編輯</button>
                            <span> / </span>
                            <button class="btn btn-outline-danger" @click="showDeleteModal(item)">刪除</button>
                        </td>
                    </tr>
                </tbody>
                <ProductModal ref="ProductModal" :product="tempProduct" :type="type"/>
                <DeleteModal ref="DeleteModal" :title="productTitle" :text="text" @handle-delete="handleDelete"/>
            </table>
            <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage" />
        </div>
    </div>
</template>

<script>
import PaginationComponent from '@/components/admin/PaginationComponent.vue'
import ProductModal from '@/components/admin/modal/ProductModal.vue'
import DeleteModal from '@/components/admin/modal/DeleteModal.vue'
import adminStore from '@/stores/adminStore'
import { mapActions, mapState } from 'pinia'


export default {
    components: {
        PaginationComponent,
        ProductModal,
        DeleteModal
    },
    data() {
        return {
            curPage: 1,
            tempProduct: {},
            type: '',
            productTitle: '',
            productId: '',
            text: '商品'
        }
    },
    created() {
        this.fecthAdminProducts();
    },
    methods: {
        ...mapActions(adminStore, [
            'fecthAdminProducts',
            'deleteProduct'
        ]),
        changePage(page) {
            this.curPage = page
        },
        showProductModal(product, type) {
            this.type = type;
            if(type === 'edit') {
                this.tempProduct = {...product};
            } else {
                this.tempProduct = {
                    title: '',
                    category: '',
                    origin_price: '',
                    price: '',
                    description: '',
                    content: '',
                    unit: '',
                    imageUrl: '',
                    imagesUrl: '',
                    is_enabled: true
                }
            }
    
            this.$refs.ProductModal.showModal()
        },
        showDeleteModal(product) {
            this.productTitle = product.title;
            this.productId = product.id;
            this.$refs.DeleteModal.showModal();
        },
        async handleDelete() {
            await this.deleteProduct(this.productId)
            this.$refs.DeleteModal.hideModal();
        }
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