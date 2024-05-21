<template>
    <div class="container pt-mh">
        <div class="row justify-content-center py-5">
            <div class="col-lg-6 col-md-9">
                <div class="border rounded-5 p-5">
                    <h2 class="fw-bold text-primary text-center">聯絡我們</h2>
                <VForm 
                v-slot="{ errors }"
                ref="form"
                @submit="handleSubmit"
                >
                    <div class="mb-3">
                        <label for="name" class="form-label">姓名<span class="text-danger">*</span></label>
                        <VField type="text" class="form-control border border-primary" id="name" placeholder="請輸入姓名"
                            name="姓名" rules="required" :class="{ 'is-invalid': errors['姓名'] }" />
                        <ErrorMessage name="姓名" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">電子郵件<span class="text-danger">*</span></label>
                        <VField type="email" class="form-control border border-primary" id="email"
                            placeholder="user1@gmail.com" name="email" rules="email|required"
                            :class="{ 'is-invalid': errors['email'] }" />
                        <ErrorMessage name="email" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="phone" class="form-label">聯絡電話<span class="text-danger">*</span></label>
                        <VField type="tel" class="form-control border border-primary" id="phone"
                            placeholder="0912123456" name="電話" :rules="isPhone"
                            :class="{ 'is-invalid': errors['電話'] }" />
                        <ErrorMessage name="電話" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="title" class="form-label">問題主旨<span class="text-danger">*</span></label>
                        <VField type="text" class="form-control border border-primary" id="title" placeholder="請輸入問題主旨"
                            name="問題主旨" rules="required" :class="{ 'is-invalid': errors['問題主旨'] }" />
                        <ErrorMessage name="問題主旨" class="invalid-feedback" />
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">問題描述<span class="text-danger">*</span></label>
                        <VField as="textarea" class="form-control border border-primary " id="message" name="問題描述"
                        placeholder="請描述問題內容" rows="4"
                            rules="required" :class="{ 'is-invalid': errors['問題描述'] }" />
                        <ErrorMessage name="問題描述" class="invalid-feedback" />
                    </div>
                    <div class="text-center pt-3">
                        <button type="submit" class="btn btn-primary rounded-pill px-5">
                            送出
                        </button>
                    </div>
                </VForm>
                </div>
               
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要正確的電話號碼'
        },
        handleSubmit() {
            this.$refs.form.resetForm()
        }
    }
}
</script>