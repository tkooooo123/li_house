<template>
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fw-bold" id="exampleModalLabel">編輯訂單 </h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body fw-bold fs-5">
                    <div class="row mt-2">
                        <div class="col-lg-6">
                            <h4 class="fw-bold text-primary">訂單資訊</h4>
                            <ul class="mt-3">
                                <li class="d-flex">
                                    <p>訂購時間</p>
                                    <p class="ms-3">{{ new Date(order.create_at * 1000).toLocaleDateString() }}</p>
                                </li>
                                <li class="d-flex">
                                    <p>訂單編號</p>
                                    <p class="ms-3">{{ tempOrder.id }}</p>
                                </li>
                            </ul>
                            <h4 class="fw-bold mt-5 text-primary">聯絡資訊</h4>
                            <ul class="mt-3">
                                <li class="d-flex">
                                    <p>姓名</p>
                                    <p class="ms-3">{{ tempOrder.user?.name }}</p>
                                </li>
                                <li class="d-flex">
                                    <p>Email</p>
                                    <p class="ms-3">{{ tempOrder.user?.email }}</p>
                                </li>
                                <li class="d-flex">
                                    <p>電話</p>
                                    <p class="ms-3">{{ tempOrder.user?.tel }}</p>
                                </li>
                                <li class="d-flex">
                                    <p>地址</p>
                                    <p class="ms-3">{{ tempOrder.user?.address }}</p>
                                </li>
                                <li class="d-flex">
                                    <p>備註</p>
                                    <p class="ms-3">
                                        <span v-if="tempOrder?.user?.message"> {{ tempOrder.user?.message }} </span>
                                        <span v-else>無</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">
                            <h4 class="fw-bold text-primary mt-3">狀態變更</h4>
                            <div class="mt-2">
                                <select class="form-control" name="status" id="status" v-model="tempStatus">
                                    <option v-for="item in statusList" :key="item.id" :value="item.id">{{ item.title }}
                                    </option>
                                </select>
                            </div>
                            <h4 class="fw-bold text-primary mt-3">購買商品</h4>
                            <ul class="mt-3">
                                <li class="d-flex justify-content-between border" v-for="item in tempOrder?.products"
                                    :key="item.id">
                                    <p class="my-3 px-2">{{ item.product.title }}</p>
                                    <p class="w-50 d-flex justify-content-between my-3 px-2">
                                        <span> {{ item.qty }} / {{ item.product.unit }}</span>
                                        NT$ {{ Math.ceil(item.final_total) }}
                                    </p>
                                </li>
                                <hr>
                                <div class="d-flex justify-content-between">
                                    <p>總計</p>
                                    <p>NT$ {{ Math.ceil(tempOrder.total) }}</p>
                                </div>
                            </ul>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill"
                        data-bs-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary fw-bold rounded-pill text-white"
                        @click="handleSubmit">確定</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script>
import Modal from 'bootstrap/js/dist/modal'
import { mapActions } from 'pinia';
import adminStore from '@/stores/adminStore';

export default {
    props: ['order'],
    data() {
        return {
            modal: {},
            tempOrder: '',
            tempStatus: this.order.tatus,
            statusList: [
                {
                    id: 0,
                    title: '未處理',
                },
                {
                    id: 1,
                    title: '配送中',
                },
                {
                    id: 2,
                    title: '已送達',
                }
            ]
        }
    },
    methods: {
        ...mapActions(adminStore, [
            'editOrder'
        ]),
        showModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
        handleSubmit() {
            const data = {
                ...this.tempOrder,
                status: Number(this.tempStatus)
            };
            const id = this.tempOrder.id;
            this.editOrder(id, data);
            
            this.modal.hide();
        }
    },
    created() {
        
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    },
    watch: {
        order() {
            this.tempOrder = { ...this.order }
            this.tempStatus = this.order.status || 0
        }
    }
}
</script>