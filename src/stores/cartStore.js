import { defineStore } from 'pinia';
import axios from 'axios';
import toastStore from './toastStore';

const { VITE_API, VITE_PATH } = import.meta.env;

const toast = toastStore();

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
                const api = `${VITE_API}api/${VITE_PATH}/cart`;
                const res = await axios.get(api);
                if (res.data.success) {
                    this.cartList = res.data.data.carts;
                    this.total = res.data.data.total;
                    this.finalTotal = res.data.data.final_total;
                } else {
                    toast.failToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async addToCart(product_id, qty = 1) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/cart`;
                const data = { product_id, qty }
                const res = await axios.post(api, { data });
                if (res.data.success) {
                    toast.successToast(res.data.message);
                    await this.fetchCart();
                } else {
                    toast.failToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async deleteCartItem(id) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/cart/${id}`
                const res = await axios.delete(api)
                if (res.data.success) {
                    await this.fetchCart()
                    toast.successToast(res.data.message)
                } else {
                    toast.failToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async deleteCart() {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/carts`
                const res = await axios.delete(api)
                if (res.data.success) {
                    await this.fetchCart()
                    toast.successToast(res.data.message)
                } else {
                    toast.failToast(res.data.message)
                }

            } catch (error) {
                toast.handleError()
            }
        },
        async updateCartItem(id, qty) {

            const api = `${VITE_API}api/${VITE_PATH}/cart/${id}`
            const data = { product_id: id, qty }
            try {
                const res = await axios.put(api, { data })
                if (res.data.success) {
                    await this.fetchCart()
                    toast.successToast(res.data.message)
                } else {
                    toast.failToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async useCoupon(coupon) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/coupon`;
                const res = await axios.post(api, { data: { code: coupon } })
                if (res.data.success) {
                    toast.successToast(res.data.message)
                    this.fetchCart()
                } else {
                    toast.failToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async submitOrder(user, message) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/order`
                const res = await axios.post(api, { data: { user, message } })
                if (res.data.success) {
                    this.orderId = res.data.orderId
                    toast.successToast(res.data.message)
                } else {
                    toast.failToast(...res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async fetchOrder(id) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/order/${id}`
                const res = await axios.get(api)
                if(res.data.success) {
                    this.order = {...res.data.order}
                } else {
                    toast.failToast(res.data.message)
                }
               

            } catch (error) {
                toast.handleError()
            }
        },
        async goToPay(id) {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/pay/${id}`
                const res = await axios.post(api)
                if(res.data.success) {
                    await this.fetchOrder(id)
                    toast.successToast(res.data.message)
                } else {
                    toast.failToast(res.data.message)
                }
            } catch (error) {
                toast.handleError()
            }

        }
    },

})
