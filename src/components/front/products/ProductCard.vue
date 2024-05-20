<template>
   <RouterLink class="text-decoration-none" :to="`/product/${product.id}`">
                <div class="product-card border border-primary rounded-2 h-100 d-flex flex-column">
                    <img class="product-img" :src="product.imageUrl" :alt="product.title">
                    <div class="d-flex flex-column flex-grow-1 p-2">
                        <h4 class="mt-2 fw-bold flex-grow-1 text-black">{{ product.title }}</h4>
                        <p class="fw-bold text-black"> NT${{ product.price }}</p>
                        <button class="product-btn btn btn-outline-primary fw-bold w-100"
                            @click="addToCart(product.id)"> 加入購物車</button>
                    </div>
                </div>
            </RouterLink>
</template>

<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
    props: ['product'],
    methods: {
        ...mapActions(cartStore, [
            'addToCart'
        ])
    },

}
</script>

<style lang="scss" scoped>
.product-card {
    overflow: hidden;
    cursor: pointer;

    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    }
}

.product-img {
    height: 300px;
    object-fit: cover;
    transition: all 0.2s;

    &:hover {
        transform: scale(1.05);
    }
}

.product-btn {
    &:hover {
        color: white;
    }
}
</style>