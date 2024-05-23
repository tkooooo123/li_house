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
        curPage: '',
        productList: [],
        imgUrl: '',
        imgsUrl: []
    }),
    actions: {
        async fetchOrders(page = 1) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/admin/orders?page=${page}`;
                const res = await axios.get(api);
                if (res.data.success) {
                    status.isLoading = false;
                    this.orderList = res.data.orders;
                    this.pagination = res.data.pagination

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
                const res = await axios.put(api, { data });
                if (res.data.success) {
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
        },
        async deleteOrder(id) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/admin/order/${id}`;
                const res = await axios.delete(api);
                if (res.data.success) {
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
        },
        async fecthAdminProducts(page = 1) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/admin/products?page=${page}`;
                const res = await axios.get(api)

                if (res.data.success) {
                    status.isLoading = false;
                    this.productList = res.data.products;
                    this.pagination = res.data.pagination;
                } else {
                    toast.failToast(res.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError()
            }
        },
        async uploadImg(file) {
            try {
                status.isLoading = true;
                const formData = new FormData();
                formData.append('image', file);
                const api = `${VITE_API}api/${VITE_PATH}/admin/upload`;
                const res = await axios.post(api, formData);
                if (res.data.success) {
                    this.imgUrl = res.data.imageUrl;
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
        async uploadImgs(files) {
            try {
                status.isLoading = true;
                const imgs = []
                const imgsReq = []
                for (let i = 0; i < files.length; i++) {
                    const api = `${VITE_API}api/${VITE_PATH}/admin/upload`;
                    const formData = new FormData();
                    formData.append('image', files[i]);
                    const req = axios.post(api, formData)
                    imgsReq.push(req)
                }
                const data = await Promise.all([...imgsReq])
                if (data) {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].data.success) {
                            imgs.push(data[i].data.imageUrl)
                        } else {
                            toast.failToast(data[i].data.message);
                            status.isLoading = false;
                        }
                        this.imgsUrl = imgs;
                        status.isLoading = false;
                    }

                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
        async postProduct(data, type) {
            try {
                status.isLoading = true;
                let api = `${VITE_API}api/${VITE_PATH}/admin/product`;
                let method = 'post';

                if(type === 'edit') {
                    api = `${VITE_API}api/${VITE_PATH}/admin/product/${data.id}`
                    method = 'put'
                    
                }
                const res = await axios[method](api, { data })
                if(res.data.success) {
                    await this.fecthAdminProducts(this.curPage);
                    toast.successToast(res.data.message);
                    status.isLoading = false;
                } else {
                    toast.failToast(...res.data.message)
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }

        }
    }

})