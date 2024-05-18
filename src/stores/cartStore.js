import { defineStore } from 'pinia';
import axios from 'axios';

const { VITE_API, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
    state: () => ({
        cartList: [],
        total: '',
        finalTotal: ''
        
    }),
    actions: {
        async fetchCart() {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/cart`;
                const res = await axios.get(api);
                console.log(res.data.data)
                this.cartList = res.data.data.carts;
                this.total = res.data.data.total;
                this.finalTotal = res.data.data.final_total;
            } catch (error) {
                console.log(error);
            }
        },
        async addToCart(product_id, qty = 1) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/cart`;
                const data = { product_id, qty }
                const res = await axios.post(api, { data });
                await this.fetchCart();
            } catch (error) {
                console.log(error);
            }
        }
    },

})
