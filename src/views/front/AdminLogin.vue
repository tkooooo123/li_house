<template>
    <div class="container pt-mh">
        <div class="row justify-content-center py-5">
            <div class="col-lg-6 col-md-9">
                <div class="border rounded-5 p-5">
                    <h2 class="fw-bold text-primary text-center">後台管理登入</h2>
                    <VForm v-slot="{ errors }" @submit="adminLogin">
                        <div class="mb-3">
                            <label for="email" class="form-label">電子郵件<span class="text-danger">*</span></label>
                            <VField type="email" class="form-control border border-primary" id="email"
                                placeholder="user1@gmail.com" name="email" rules="email|required"
                                v-model="email"
                                :class="{ 'is-invalid': errors['email'] }" />
                            <ErrorMessage name="email" class="invalid-feedback" />
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">密碼<span class="text-danger">*</span></label>
                            <VField type="password" class="form-control border border-primary" id="password"
                                placeholder="請輸入密碼" name="密碼" rules="required"
                                v-model="password"
                                :class="{ 'is-invalid': errors['密碼'] }" />
                            <ErrorMessage name="密碼" class="invalid-feedback" />
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
import toastStore from '@/stores/toastStore';
import axios from 'axios';
const toast = toastStore();


export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        async adminLogin() {
            try {
                const api = `${import.meta.env.VITE_API}admin/signin`
                const data = { username: this.email, password: this.password }
                const res = await axios.post(api, data)
               if(res.data.success) {
                const { token, expired } = res.data;
                document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
                toast.successToast(res.data.message)
               } else {
                toast.failToast('帳號或密碼錯誤，請重新輸入')
               }
            } catch (error) {
                toast.handleError();
            }
        }
    }
}
</script>