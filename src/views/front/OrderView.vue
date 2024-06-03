<template>
    <div class="container pt-mh">
        <div class="row mb-5 mt-md-5 mt-3">
            <div class="d-md-flex flex-md-row-reverse align-items-center justify-content-between">
                <p class="fs-5 fw-bold m-0">
                    <RouterLink to="/" class="text-secondary">首頁</RouterLink>
                    <span> / </span>
                    <RouterLink to="/orders" class="text-black">我的訂單</RouterLink>
                </p>
                <h1 class="fw-bold mt-md-0 mt-3">我的訂單</h1>
            </div>
            <div class="col-md-3">
            </div>
            <div class="col-md-9">
                <table class="table fs-5 ">
                    <thead>
                        <tr class="fw-bold">
                            <th scope='col'>訂購日期</th>
                            <th scope='col'>總金額</th>
                            <th scope='col'>付款狀態</th>
                            <th scope='col'>處理狀態</th>
                            <th scope='col'>其他</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orderList" :key="order.id">
                            <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
                            <td>NT$ {{ Math.ceil(order.total) }}</td>
                            <td>
                                <span v-if="order.is_paid">已付款</span>
                                <span v-else>未付款</span>
                            </td>
                            <td>
                                <span v-if="order.status === 1">配送中</span>
                                <span v-else-if="order.status === 2">已送達</span>
                                <span v-else>處理中</span>
                            </td>
                            <td>
                                <button class="btn btn-outline-primary fw-bold"
                                    @click="showOrderModal(order)">查看明細</button>
                            </td>
                        </tr>
                    </tbody>
                    <OrderModal ref="OrderModal" :order="tempOrder"/>
                </table>
                <div class="d-flex justify-content-center">
                    <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage" />

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/admin/PaginationComponent.vue'
import OrderModal from '@/components/front/order/OrderModal.vue'
import toastStore from '@/stores/toastStore';
import statusStore from '@/stores/statusStore';

const { VITE_API, VITE_PATH } = import.meta.env;
const toast = toastStore();
const status = statusStore()

export default {

    components: {
        PaginationComponent,
        OrderModal
    },
    data() {
        return {
            orderList: [],
            pagination: {},
            curPage: 1,
            tempOrder: ''
        }

    },
    methods: {
        async fetchOrders(page = 1) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/orders?page=${page}`;
                const res = await axios.get(api);
                if (res.data.success) {
                    this.orderList = res.data.orders;
                    this.pagination = res.data.pagination;
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.messae);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        changePage(page) {
            this.curPage = page;
            console.log(page)
        },
         showOrderModal(order) {
            this.tempOrder = { ...order }
            this.$refs.OrderModal.showModal()
        },
    },

    created() {
        this.fetchOrders();
    },
    watch: {
        curPage() {
            this.fetchOrders(this.curPage)
        }
    }

}

</script>