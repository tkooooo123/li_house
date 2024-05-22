import { defineStore } from 'pinia';
import axios from 'axios';
import toastStore from './toastStore';
import statusStore from './statusStore';

const { VITE_API, VITE_PATH } = import.meta.env;
const toast = toastStore();
const status = statusStore()

const token = document.cookie
.split('; ')
.find((row) => row.startsWith('hexToken='))
?.split('=')[1]

axios.defaults.headers.common['Authorization'] = token;


export default defineStore('adminStore', {
    status: () => ({
        orderList: [],
        pagination: {},
        curPage: ''
    }),
    actions: {
        async fetchOrders(page=1) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/admin/orders?page=${page}`;
                const res = await axios.get(api);
                if(res.data.success) {
                    status.isLoading = false;
                    this.orderList = res.data.orders;
                    this.pagination = res.data.pagination
                    this.curPage = res.data.pagination.current_page
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
                
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async editOrder(id, data) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/admin/order/${id}`;
                const res = await axios.put(api, {data});
                if(res.data.success) {
                    await this.fetchOrders(this.curPage);
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
    }

})