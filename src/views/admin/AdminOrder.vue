<template>
    <div class="bg-white pt-mh-100">
        <div class="container pb-5">
            <h1 class="fw-bold mt-3">訂單列表</h1>
            <table class="table fs-5">
                <thead>
                    <tr class="fw-bold">
                        <th scope='col'>訂購日期</th>
                        <th scope='col'>訂單編號</th>
                        <th scope='col'>總金額</th>
                        <th scope='col'>付款狀態</th>
                        <th scope='col'>處理狀態</th>
                        <th scope='col'>編輯 / 刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orderList" :key="order.id">
                        <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
                        <td>{{ order.id }}</td>
                        <td>NT$ {{ Math.ceil(order.total) }}</td>
                        <td>
                            <span v-if="order.is_paid">已付款</span>
                            <span v-else>未付款</span>
                        </td>
                        <td>
                            <span v-if="order.status === 0">未處理</span>
                            <span v-else-if="order.status === 1">配送中</span>
                            <span v-else-if="order.status === 2">已送達</span>
                            <span v-else>未處理</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary fw-bold" @click="showOrderModal(order)">編輯</button>
                            <span> / </span>
                            <button class="btn btn-outline-danger" @click="showDeleteModal(order)">刪除</button>
                        </td>
                    </tr>
                </tbody>
                <OrderModal ref="OrderModal" :order="tempOrder" />
                <DeleteOrderModal ref="DeleteOrderModal" :id="tempId" @handle-delete="handleDelete" />
            </table>
           <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import adminStore from '@/stores/adminStore'
import OrderModal from '@/components/admin/modal/OrderModal.vue'
import DeleteOrderModal from '@/components/admin/modal/DeleteOrderModal.vue'
import PaginationComponent from '@/components/admin/PaginationComponent.vue'

export default {
    components: {
        OrderModal,
        DeleteOrderModal,
        PaginationComponent
    },
    data() {
        return {
            curPage: 1,
            tempOrder: {},
            tempId: '',
        }
    },
    created() {
        this.fetchOrders();

    },
    methods: {
        ...mapActions(adminStore, [
            'fetchOrders',
            'deleteOrder'
        ]),
        changePage(page) {
            this.curPage = page
        },
        showOrderModal(order) {
            this.tempOrder = { ...order }
            this.$refs.OrderModal.showModal()
        },
        showDeleteModal(order) {
            this.tempId = order.id
            this.$refs.DeleteOrderModal.showModal()
        },
        handleDelete() {
            this.deleteOrder(this.tempId)
            this.$refs.DeleteOrderModal.hideModal()
        }

    },
    computed: {
        ...mapState(adminStore, [
            'orderList',
            'pagination',
        ])
    },
    watch: {
        curPage() {
            this.fetchOrders(this.curPage);
        }
    }
}

</script>