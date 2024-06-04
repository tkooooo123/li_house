<template>
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title fw-bold" id="exampleModalLabel">編輯訂單 </h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body fs-5">
                    <div class="row mt-2">
                        <div class="col-lg-6">
                            <h4 class="fw-bold text-primary">訂單資訊</h4>
                            <ul class="mt-3">
                                <li class="d-flex">
                                    <p class="fw-bold">訂購時間</p>
                                    <p class="ms-3">{{ new Date(order.create_at * 1000).toLocaleDateString() }}</p>
                                </li>
                                <div class="d-flex">
                                <p class="fw-bold">付款狀態</p>
                                <p class="ms-3">
                                    <span v-if="tempOrder.is_paid">已付款</span>
                                    <span v-else class="text-danger">未付款</span>
                                </p>
                            </div>
                            <div class="d-flex">
                                <p class="fw-bold">配送狀態</p>
                                <p class="ms-3">
                                    <span v-if="tempOrder.status === 2">已送達</span>
                                    <span v-else-if="tempOrder.status === 1">配送中</span>
                                    <span v-else>處理中</span>
                                </p>
                            </div>
                            </ul>
                            <h4 class="fw-bold mt-5 text-primary">聯絡資訊</h4>
                            <ul class="mt-3">
                                <li class="d-flex">
                                    <p class="fw-bold">姓名</p>
                                    <p class="ms-3">{{ tempOrder.user?.name }}</p>
                                </li>
                                <li class="d-flex">
                                    <p class="fw-bold">Email</p>
                                    <p class="ms-3">{{ tempOrder.user?.email }}</p>
                                </li>
                                <li class="d-flex">
                                    <p class="fw-bold">電話</p>
                                    <p class="ms-3">{{ tempOrder.user?.tel }}</p>
                                </li>
                                <li class="d-flex">
                                    <p class="fw-bold">地址</p>
                                    <p class="ms-3">{{ tempOrder.user?.address }}</p>
                                </li>
                                <li class="d-flex">
                                    <p class="fw-bold">備註</p>
                                    <p class="ms-3">
                                        <span v-if="tempOrder?.user?.message"> {{ tempOrder.user?.message }} </span>
                                        <span v-else>無</span>
                                    </p>
                                </li>
                            </ul>
                        </div>
                        <div class="col-lg-6">                            
                            <h4 class="fw-bold text-primary mt-3">購買商品</h4>
                            <ul class="mt-3 fw-bold">
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
            </div>
        </div>
    </div>

</template>


<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
    props: ['order'],
    data() {
        return {
            modal: {},
            tempOrder: '',

        }
    },
    methods: {
        showModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    },
    watch: {
        order() {
            this.tempOrder = { ...this.order }
        }
    }
}
</script>