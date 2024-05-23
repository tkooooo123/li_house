import { defineStore } from 'pinia';
import axios from 'axios';
import toastStore from './toastStore';
import statusStore from './statusStore';

const { VITE_API, VITE_PATH } = import.meta.env;

const toast = toastStore();
const status = statusStore();

export default defineStore('cartStore', {
    state: () => ({
        cartList: [],
        total: '',
        finalTotal: '',
        orderId: '',
        order: {}
    }),
    actions: {

        async fetchCart() {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/cart`;
                const res = await axios.get(api);
                if (res.data.success) {
                    this.cartList = res.data.data.carts;
                    this.total = res.data.data.total;
                    this.finalTotal = res.data.data.final_total;
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false
            }
        },
        async addToCart(product_id, qty = 1) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/cart`;
                const data = { product_id, qty };
                const res = await axios.post(api, { data });
                if (res.data.success) {
                    toast.successToast(res.data.message);
                    await this.fetchCart();
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async deleteCartItem(id) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/cart/${id}`;
                const res = await axios.delete(api);
                if (res.data.success) {
                    await this.fetchCart();
                    toast.successToast(res.data.message);
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async deleteCart() {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/carts`;
                const res = await axios.delete(api);
                if (res.data.success) {
                    await this.fetchCart();
                    toast.successToast(res.data.message);
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }

            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async updateCartItem(id, qty) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/cart/${id}`;
                const data = { product_id: id, qty };
                const res = await axios.put(api, { data });
                if (res.data.success) {
                    await this.fetchCart();
                    toast.successToast(res.data.message);
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async useCoupon(coupon) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/coupon`;
                const res = await axios.post(api, { data: { code: coupon } })
                if (res.data.success) {
                    toast.successToast(res.data.message);
                    this.fetchCart();
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async submitOrder(user, message) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/order`;
                const res = await axios.post(api, { data: { user, message } });
                if (res.data.success) {
                    this.orderId = res.data.orderId;
                    toast.successToast(res.data.message);
                    status.isLoading = false;
                } else {
                    toast.failToast(...res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async fetchOrder(id) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/order/${id}`;
                const res = await axios.get(api);
                if(res.data.success) {
                    this.order = {...res.data.order};
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async goToPay(id) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/pay/${id}`;
                const res = await axios.post(api);
                if(res.data.success) {
                    await this.fetchOrder(id);
                    toast.successToast(res.data.message);
                    status.isLoading = false;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }

        }
    },

})
