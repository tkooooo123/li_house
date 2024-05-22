<template>
    <div class="bg-white pt-mh-100">
        <div class="container">
        <h1 class="fw-bold mt-3">訂單列表</h1>
        <table class="table fs-5">
            <thead>
                <tr class="fw-bold">
                    <th scope='col'>訂購日期</th>
                        <th scope='col'>訂單編號</th>
                        <th scope='col'>總金額</th>
                        <th scope='col'>付款狀態</th>
                        <th scope='col'>編輯 / 刪除</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderList"
                :key="order.id"
                >
                <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
                <td>{{ order.id }}</td>
                <td>NT$ {{ Math.ceil(order.total) }}</td>
                <td>
                    <span v-if="order.is_paid">已付款</span>
                    <span v-else>未付款</span>
                </td>
                <td>
                    <button class="btn btn-outline-primary fw-bold">編輯</button>
                    <span> / </span>
                    <button class="btn btn-outline-danger">刪除</button>
                </td>
                </tr>
            </tbody>

        </table>
        
       <div class="d-flex justify-content-center mt-5">
        <nav class="Page navigation align-middle">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: !pagination?.has_pre }">
                <button class="page-link" @click="changePage(curPage - 1)"
                    aria-label="Previus">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li class="page-item" v-for="page in pagination?.total_pages" :key="page"
                :class="{ active: page === pagination.current_page }" >
                <button class="page-link"
                @click="changePage(page)"
                >{{ page
                    }}</button>
            </li>

            <li class="page-item" :class="{ disabled: !pagination?.has_next }">
                <button class="page-link" @click="changePage(curPage + 1)"
                    aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>
       </div>
    </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import adminStore from '@/stores/adminStore'


export default {
    components: {
        
    },
    data() {
        return {
            pages: {
                has_pre: true,
                has_next: true,
                total_page: 7,
                current_page: 1 
            },
            curPage: 1
        }
    },
    created() {
        this.fetchOrders();
    
    },
    methods: {
        ...mapActions(adminStore, [
            'fetchOrders'
        ]),
        changePage(page) {
            this.curPage = page
        }
    },
    computed: {
        ...mapState(adminStore, [
            'orderList',
            'pagination'
        ])
    },
    watch: {
        curPage() {
            this.fetchOrders(this.curPage);
        }
    }
}

</script>