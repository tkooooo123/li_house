<template>
    <div class="pt-mh-100 bg-white">
        <div class="container">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold mt-3">優惠券列表</h2>
                <button class="btn btn-primary" @click="showCouponModal(null, type = 'create')">新增優惠券</button>
            </div>
            <table class="table fs-5">
                <thead>
                    <tr class="fw-bold">
                        <th scope='col'>標題</th>
                        <th scope='col'>折扣</th>
                        <th scope='col'>優惠碼</th>
                        <th scope='col'>到期日</th>
                        <th scope='col'>啟用狀態</th>
                        <th scope='col'>編輯 / 刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in couponList" :key="item.id">
                        <td>{{ item.title }}</td>
                        <td>{{ item.percent }} %</td>
                        <td>{{ item.code }}</td>
                        <td>{{ new Date(item.due_date).toLocaleDateString() }}</td>
                        <td>
                            <span v-if="item.is_enabled">啟用</span>
                            <span v-else>未啟用</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary fw-bold"
                                @click="showCouponModal(item, 'edit')">編輯</button>
                            <span> / </span>
                            <button class="btn btn-outline-danger" @click="showDeleteModal(item)">刪除</button>
                        </td>
                    </tr>
                    <CouponModal ref="CouponModal" :coupon="tempCoupon" :type="type"/>
                </tbody>
            </table>

            <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import adminStore from '@/stores/adminStore'
import PaginationComponent from '@/components/admin/PaginationComponent.vue'
import CouponModal from '@/components/admin/modal/CouponModal.vue'
export default {
    components: {
        PaginationComponent,
        CouponModal
    },
    data() {
        return {
            curPage: 1,
            tempCoupon: {},
            type: ''
        }
    },
    methods: {
        ...mapActions(adminStore, [
            'fetchCoupons'
        ]),
        showCouponModal(coupon, type) {
            if(type === 'edit') {
                this.tempCoupon = {...coupon};
            } else {
                this.tempCoupon = {
                    title: '',
                    percent: '',
                    due_date: '',
                    code: '',
                    is_enabled: 1
                }
            }

            
            this.type = type;
            this.$refs.CouponModal.showModal();
        },
        showDeleteModal() {

        },
        changePage(page) {
            this.curPage = page
        },
       
    },
    computed: {
        ...mapState(adminStore, [
            'couponList',
            'pagination'
        ])
    },
    created() {
        this.fetchCoupons();
    }
}
</script>