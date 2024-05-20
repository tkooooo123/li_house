<template>
    <div className="cart-item-quantity">
        <button class="btn btn-outline-primary quantity-btn rounded-circle"
        @click="updateQty('minus')"
        :disabled="tempQty <= 1"
        ><i class="bi bi-dash"></i></button>
        <input type="number"
            class="from-control quantity-input text-center align-middle border border-primary rounded-pill mx-2"
            v-model="tempQty"  min="1" disabled>
        <button type="button" class="btn btn-outline-primary quantity-btn rounded-circle"
        @click="updateQty('add')"
        ><i
                class="bi bi-plus"></i></button>
    </div>
</template>

<script>

export default {
    props: ['quantity'],
    data() {
        return {
            tempQty: 1
        }
    },
    created() {
        this.tempQty = this.quantity
    },
    methods: {
        updateQty(type,) {
            type === 'add' ? ++this.tempQty : --this.tempQty
            this.$emit('change-quantity',this.tempQty)
        }
    }
}
</script>

<style lang="scss" scoped>
.quantity-btn {
    width: 1.8rem;
    height: 1.8rem;
    padding: 0;

    &:hover {
        color: white;
    }
}

.quantity-input {
    width: 5rem;
    height: 2rem;
}
</style>