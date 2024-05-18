import { defineStore } from 'pinia';
import axios from 'axios';
import toastStore from './toastStore';

const { VITE_API, VITE_PATH } = import.meta.env;

const toast = toastStore();

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
                if(res.data.success) {
                    toast.successToast(res.data.message);
                await this.fetchCart();
                } else {
                    toast.errorToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        }
    },

})
