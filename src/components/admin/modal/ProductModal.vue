<template>

    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <VForm v-slot="errors" class="product-form">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title fs-4 fw-bold" id="exampleModalLabel">編輯商品</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body fw-bold fs-5">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="p-2">
                                    <img :src="tempProduct.imageUrl" alt="" class="product-img">
                                </div>
                                <div class="mb-3">
                                    <label for="imageUrl" class="form-label">圖片連結<span class="text-danger">*</span></label>
                                    <VField type="text" class="form-control border border-primary" id="imageUrl"
                                        placeholder="" name="圖片連結" rules="required"
                                        :class="{ 'is-invalid': errors['圖片連結'] }" v-model.trim="tempProduct.imageUrl" />
                                    <ErrorMessage name="圖片連結" class="invalid-feedback" />
                                </div>
                                <div class="mb-3">
                                    <label for="upload">上傳圖片</label>
                                   <input type="file" class="form-control border border-primary"
                                   ref="image"
                                   @change="uploadImage"
                                   >
                                </div>

                            </div>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label for="title" class="form-label">品名<span class="text-danger">*</span></label>
                                    <VField type="text" class="form-control border border-primary" id="title"
                                        placeholder="" name="品名" rules="required"
                                        :class="{ 'is-invalid': errors['品名'] }" v-model.trim="tempProduct.title" />
                                    <ErrorMessage name="品名" class="invalid-feedback" />
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="categort" class="form-label">分類<span
                                                    class="text-danger">*</span></label>
                                            <VField type="text" class="form-control border border-primary" id="category"
                                                placeholder="" name="分類" rules="required"
                                                :class="{ 'is-invalid': errors['分類'] }"
                                                v-model.trim="tempProduct.category" />
                                            <ErrorMessage name="分類" class="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="unit" class="form-label">單位<span
                                                    class="text-danger">*</span></label>
                                            <VField type="text" class="form-control border border-primary" id="unit"
                                                placeholder="" name="單位" rules="required"
                                                :class="{ 'is-invalid': errors['單位'] }"
                                                v-model.trim="tempProduct.unit" />
                                            <ErrorMessage name="單位" class="invalid-feedback" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="origin_price" class="form-label">原價<span
                                                    class="text-danger">*</span></label>
                                            <VField type="number" class="form-control border border-primary"
                                                id="origin_price" placeholder="" name="原價" rules="required"
                                                :class="{ 'is-invalid': errors['原價'] }"
                                                v-model.trim="tempProduct.origin_price" />
                                            <ErrorMessage name="原價" class="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="price" class="form-label">售價<span
                                                    class="text-danger">*</span></label>
                                            <VField type="text" class="form-control border border-primary" id="price"
                                                placeholder="" name="售價" rules="required"
                                                :class="{ 'is-invalid': errors['售價'] }"
                                                v-model.trim="tempProduct.price" />
                                            <ErrorMessage name="售價" class="invalid-feedback" />
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">商品描述</label>
                                    <VField as="textarea" class="form-control border border-primary "
                                        id="description" rules="required"
                                        :class="{ 'is-invalid': errors['商品描述'] }" name="商品描述"
                                        rows="5"
                                        v-model.trim="tempProduct.description" />
                                    <ErrorMessage name="商品描述" class="invalid-feedback" />
                                </div>
                                <div class="mb-3">
                                    <label for="content" class="form-label">商品內容</label>
                                    <VField as="textarea" class="form-control border border-primary "
                                        id="content" rules="required"
                                        :class="{ 'is-invalid': errors['商品內容'] }" name="商品內容"
                                        rows="5"
                                        v-model.trim="tempProduct.content" />
                                    <ErrorMessage name="商品內容" class="invalid-feedback" />
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill"
                            data-bs-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary fw-bold rounded-pill text-white">
                            刪除</button>
                    </div>
                </div>
            </VForm>

        </div>
    </div>
</template>


<script>
import Modal from 'bootstrap/js/dist/modal'
import { mapActions, mapState } from 'pinia'
import adminStore from '@/stores/adminStore'

export default {
    props: ['product'],
    data() {
        return {
            modal: {},
            tempProduct: ''
        }
    },
    created() {
        this.tempProduct = { ...this.product }
    },
    methods: {
        ...mapActions(adminStore, [
            'uploadImg'
        ]),
        showModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
        async uploadImage() {
            await this.uploadImg(this.$refs.image.files[0]);
            this.tempProduct.imageUrl = this.imgUrl;
        }
    },
    computed: {
        ...mapState(adminStore, [
            'imgUrl'
        ])
    },
    mounted() {
        this.modal = new Modal(this.$refs.modal);
    },
    watch: {
        product() {
            this.tempProduct = { ...this.product }
            console.log(this.product)
        }
    }
}
</script>

<style lang="scss">
.product-img {
    max-height: 300px;
    aspect-ratio: 1;
}
</style>