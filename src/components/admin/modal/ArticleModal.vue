<template>
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <VForm v-slot="{ errors }" red="form" @submit="handleSubmit">
                <div class="modal-content border-0">
                    <div class="modal-header">
                        <h5 class="modal-title fs-4 fw-bold" id="exampleModalLabel">編輯文章</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body fw-bold fs-5">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="p-2">
                                    <img :src="tempArticle.image" :alt="tempArticle.title" class="article-img">
                                </div>
                                <div class="mb-3">
                                    <label for="image" class="form-label">圖片連結<span class="text-danger">*</span></label>
                                    <VField type="text" class="form-control border border-primary" id="image"
                                        placeholder="" name="圖片連結" rules="required" v-model.trim="tempArticle.image"
                                        :class="{ 'is-invalid': errors['圖片連結'] }" />
                                    <ErrorMessage name="圖片連結" class="invalid-feedback" />
                                </div>
                                <div class="mb-3">
                                    <label for="img">上傳圖片</label>
                                    <input type="file" class="form-control border border-primary" ref="image" id="img"
                                    @change="uploadImage"
                                    >
                                </div>

                            </div>
                            <div class="col-md-8">
                                <div class="mb-3">
                                    <label for="title" class="form-label">標題<span class="text-danger">*</span></label>
                                    <VField type="text" class="form-control border border-primary" id="title"
                                        placeholder="" name="標題" rules="required"
                                        :class="{ 'is-invalid': errors['標題'] }" v-model.trim="tempArticle.title" />
                                    <ErrorMessage name="標題" class="invalid-feedback" />
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="author" class="form-label">作者<span
                                                    class="text-danger">*</span></label>
                                            <VField type="text" class="form-control border border-primary" id="author"
                                                placeholder="" name="作者" rules="required"
                                                :class="{ 'is-invalid': errors['作者'] }"
                                                v-model.trim="tempArticle.author" />
                                            <ErrorMessage name="作者" class="invalid-feedback" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="mb-3">
                                            <label for="tag" class="form-label">新增標籤</label>
                                            <div class="d-flex">
                                                <VField type="text" class="form-control border border-primary w-75"
                                                    id="tag" placeholder="" name="tag" v-model.trim="tempTag" />
                                                <button type="button" class="btn btn-primary text-white" @click="addTag"
                                                :class="{ disabled: tempTag.trim().length < 1, test: tempTag.trim().length < 1 }"
                                                >新增</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="tags">標籤</label>
                                    <div class="mt-2">
                                        <div v-for="item in tempTags" :key="item" class="d-inline position-relative me-3">
                                            <span class="fs-6 border rounded-pill border-primary px-3 py-1 ">{{
                item }}</span>
                                            <button type="button" class="remove-btn btn border border-black position-absolute"
                                                @click="removeTag(item)"></button>
                                        </div>

                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">文章描述<span
                                            class="text-danger">*</span></label>
                                    <VField as="textarea" class="form-control border border-primary " id="description"
                                        rules="required" :class="{ 'is-invalid': errors['文章描述'] }" name="文章描述" rows="5"
                                        v-model.trim="tempArticle.description" />
                                    <ErrorMessage name="文章描述" class="invalid-feedback" />
                                </div>
                                <div class="mb-3">
                                    <label for="content" class="form-label">文章內容<span
                                            class="text-danger">*</span></label>
                                    <VField as="textarea" class="form-control border border-primary " id="content"
                                        rules="required" :class="{ 'is-invalid': errors['文章內容'] }" name="文章內容" rows="5"
                                        v-model.trim="tempArticle.content" />
                                    <ErrorMessage name="文章內容" class="invalid-feedback" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill"
                            data-bs-dismiss="modal">取消</button>
                        <button type="submit" class="btn btn-primary fw-bold rounded-pill text-white">確定</button>
                    </div>
                </div>
            </VForm>
        </div>
    </div>

</template>


<script>
import Modal from 'bootstrap/js/dist/modal'
import adminStore from '@/stores/adminStore';
import { mapActions, mapState } from 'pinia'


export default {
    props: ['article', 'type'],
    data() {
        return {
            modal: {},
            tempArticle: '',
            tempTag: '',
            tempTags: []
        }
    },
    methods: {
        ...mapActions(adminStore, [
            'uploadImg',
            'postArticle'
        ]),
        showModal() {
            this.modal.show();
        },
        hideModal() {
            this.modal.hide();
        },
        addTag() {
            this.tempTags = [...this.tempTags, this.tempTag]
        },
        removeTag(tag) {
            this.tempTags = this.tempTags.filter(item => item !== tag);
        },
        async uploadImage() {
            if (this.$refs.image.files[0]) {
                await this.uploadImg(this.$refs.image.files[0]);
                this.tempArticle.image = this.imgUrl;
            }
        },
        async handleSubmit() {
            let data;
            if(this.type === 'create') {
                data = {            
                ...this.tempArticle,
                tag: [...this.tempTags],
                create_at: Date.now()
                }

            } else {
                data = {
                ...this.tempArticle,
                tag: [...this.tempTags],
            }

            }

           await this.postArticle(data, this.type);
           this.modal.hide();
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
        article() {
            this.tempArticle = { ...this.article };
            this.tempTags = [...this.article.tag];
            this.tempTag = '';
        }
    }
}
</script>

<style lang="scss">
.article-img {
    max-height: 300px;
    aspect-ratio: 1;
    object-fit: cover;
}

.remove-btn {
    padding: 0;
    width: 1rem;
    height: 1rem;
    top: 0;
    right: 0;
    transform: translate(50%, -40%);
    border-radius:50%;
    position: relative;
    
    &::before, &::after {
        position: absolute;
        content: '';
        height: 1px;
        width: 1rem;
        background-color: black;
        left: 0;
    }
    &::before {
        transform: rotate(-45deg);
    }
    &::after {
        transform: rotate(45deg);
    }
}
</style>