<template>
    <div v-if="products.length">
                    <ul class="row g-3 p-0">
                        <li class="col-lg-4 col-sm-6 col-12" v-for="product in products" :key="product.id">
                            <div class="product-card border border-primary rounded-2 h-100 d-flex flex-column">
                                <img class="product-img" :src="product.imageUrl" :alt="product.title">
                                <div class="d-flex flex-column flex-grow-1 p-2">
                                    <h4 class="mt-2 fw-bold flex-grow-1">{{ product.title }}</h4>
                                    <p class="fw-bold"> NT${{ product.price }}</p>
                                    <button class="product-btn btn btn-outline-primary fw-bold w-100"
                                    @click="addToCart(product.id)"
                                    > 加入購物車</button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
</template>

<script>
import { mapActions } from 'pinia';
import cartStore from '@/stores/cartStore';

export default {
    props: ['products'],
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