<template>
    <div class="contatiner d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div class="border border-2 border-primary p-5 rounded-3">
                <h1 class="fw-bold">404 此頁面不存在</h1>
                <p class="fw-bold fs-4 text-center pt-1">{{ seconds }} 秒後自動返回首頁</p>
                <p class="fw-bold fs-5 text-center text-secondary">或點擊下方按鈕</p>
                <div class="d-flex justify-content-around mt-3">
                    <RouterLink to="/">
                        <button type="button" class="btn btn-primary fw-bold">
                        回到首頁
                        </button>
                    </RouterLink>
                   
                </div>
            </div>
        </div>
</template>

<script>
import { set } from '@vueuse/core';
import { RouterLink } from 'vue-router';


export default {
    data() {
        return {
            seconds: 3,
            countId: ''
        }
    },
    methods: {
        autoCount() {
            this.countId = setInterval(() => {
                if(this.seconds === 0) {
                    clearInterval(this.countId);
                    return this.$router.push('/')
                }
                this.seconds = this.seconds - 1         
            }, 1000);
        }
    },
    created() {
        this.autoCount()
    }
}
</script>