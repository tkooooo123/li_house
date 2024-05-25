<template>
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <VForm v-slot="{ errors }" @submit="handleSubmit">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title fs-4 fw-bold" id="exampleModalLabel">編輯優惠券</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body fw-bold fs-5">
                        <div class="mb-3">
                            <label for="title" class="form-label">標題<span class="text-danger">*</span></label>
                            <VField type="text" class="form-control border border-primary" id="title" placeholder=""
                                name="標題" rules="required" :class="{ 'is-invalid': errors['標題'] }"
                                v-model.trim="tempCoupon.title" />
                            <ErrorMessage name="標題" class="invalid-feedback" />
                        </div>
                        <div class="mb-3">
                            <label for="percent" class="form-label">折扣<span class="text-danger">*</span></label>
                            <VField type="number" class="form-control border border-primary" id="percent" placeholder=""
                                name="折扣" rules="required" :class="{ 'is-invalid': errors['折扣'] }"
                                v-model.trim="tempCoupon.percent" />
                            <ErrorMessage name="折扣" class="invalid-feedback" />
                        </div>
                        <div class="mb-3">
                            <label for="due-date" class="form-label">到期日<span class="text-danger">*</span></label>
                            <VField type="date" class="form-control border border-primary" id="due-date" placeholder=""
                                name="到期日" :rules="isNaN" :class="{ 'is-invalid': errors['到期日'] }"
                                v-model.trim="tempCoupon.due_date" />
                            <ErrorMessage name="到期日" class="invalid-feedback" />
                        </div>
                        <div class="mb-3">
                            <label for="code" class="form-label">優惠碼<span class="text-danger">*</span></label>
                            <VField type="text" class="form-control border border-primary" id="code" placeholder=""
                                name="優惠碼" rules="required" :class="{ 'is-invalid': errors['優惠碼'] }"
                                v-model.trim="tempCoupon.code" />
                            <ErrorMessage name="優惠碼" class="invalid-feedback" />
                        </div>
                        <div class="mb-3 d-flex align-items-center">
                            <input type="checkbox" class="form-check border border-primary me-2" id="is_enabled"
                                v-model="tempCoupon.is_enabled" :true-value="1" :false-value="0" name="是否啟用" />
                                <label for="is_enabled" class="form-label m-0">啟用優惠券</label>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill"
                            data-bs-dismiss="modal">取消</button>
                        <button  class="btn btn-primary fw-bold rounded-pill text-white"
                        type="submit"
                        > 確定</button>
                    </div>
                </div>
            </VForm>
        </div>
    </div>

</template>


<script>
import Modal from 'bootstrap/js/dist/modal'
import { mapActions } from 'pinia';
import adminStore from '@/stores/adminStore';

export default {
    props: ['coupon', 'type'],
    data() {
        return {
            modal: {},
            tempCoupon: {},
        }
    },
    methods: {
        ...mapActions(adminStore, [
            'postCoupon'
        ]),
        showModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
        isNaN(value) {
            return value !== 'NaN-NaN-NaN' ? true : '日期 為必填'
        },
        async handleSubmit() {
            const data = {
                title: this.tempCoupon.title,
                percent: Number(this.tempCoupon.percent),
                due_date: new Date(this.tempCoupon.due_date).getTime(),
                code: this.tempCoupon.code,
                is_enabled: Number(this.tempCoupon.is_enabled),
                id: this.tempCoupon.id
            }
            await this.postCoupon(data, this.type);
            this.hideModal();
        }
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    },
    watch: {
        coupon() {
            const date = `${new Date(this.coupon.due_date).getFullYear().toString()}-${(
                new Date(this.coupon.due_date).getMonth() + 1).toString().padStart(2, 0)}-${(
                    new Date(this.coupon.due_date).getDate().toString().padStart(2, 0))}`

            this.tempCoupon = {
                ...this.coupon,
                due_date: date,
            }
        }
    }
}
</script>