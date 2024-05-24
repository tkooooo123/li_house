<template>
    <RouterLink class="to-top p-0" to=""
    @click="scrollToTop"
    :class="toggleClass"
    >
        <i class="bi bi-caret-up-fill fs-5 text-black p-0"></i>
    </RouterLink>
</template>

<script>

export default {
    data () {
        return {
            toggleClass: ''
        }
    },
    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        },
        toggleBtn() {
            this.toggleClass = window.scrollY > 300 ? 'show' : 'hide'
        }
    },
    mounted() {
        window.addEventListener('scroll', this.toggleBtn)
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.toggleBtn)
    }
    
}

</script>

<style lang="scss">
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.to-top {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: fixed;
    bottom: 3rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background: white;
    box-shadow:  0 2px 5px rgba(0, 0, 0, 0.2);
    visibility: hidden;

}
.hide {
    visibility: hidden;
}
.show {
   visibility: visible !important;
}
</style>