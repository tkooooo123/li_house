import { defineStore } from 'pinia';
import axios from 'axios';
import toastStore from './toastStore';
import statusStore from './statusStore';

const { VITE_API, VITE_PATH } = import.meta.env;
const toast = toastStore();
const status = statusStore()

export default defineStore('productsStore', {
    state: () => ({
        products: [],
        productsAll: [],
        filteredProducts: [],
        relativeProducts: [],
        otherProducts: [],
        categorySelected: '所有商品',
        categoryList: ['所有商品'],
        pagination: {
            current_page: 1,
            total_pages: 1,
            has_next: true,
            has_pre: false
        },
        product: {},
        keywordList: [],
    }),
    actions: {
        async fetchProducts() {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/products/all`;
                const res = await axios.get(api);

                if (res.data.products) {
                    const productsAll = res.data.products;
                    this.filteredProducts = productsAll;
                    this.productsAll = productsAll;
                    //取得產品分類清單
                    productsAll.forEach((item) => {
                        if (!this.categoryList.includes(item.category)) {
                            this.categoryList.push(item.category);
                        }
                    })
                    this.getPagination(productsAll);
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
        async searchProduct(keyword) {
            status.isLoading = true;
            await this.fetchProducts();
            const searchProducts = this.productsAll.filter((item) => item.title.includes(keyword));
            this.filteredProducts = searchProducts;
            this.getPagination(searchProducts);
            status.isLoading = false;
        },
        changeCategory(category) {
            if (category !== '所有商品') {
                this.categorySelected = category;
                const products = this.productsAll.filter((item) => item.category === category);
                this.filteredProducts = products;
                this.getPagination(products);

            } else {
                this.categorySelected = '所有商品';
                this.filteredProducts = this.productsAll;
                this.getPagination(this.productsAll);

            }
        },
        getPagination(items, curPage = 1, perPage = 12) {
            const totalPage = Math.ceil(items.length / perPage);
            const startIndex = (curPage - 1) * perPage;
            const endIndex = curPage * perPage;
            const paginationItems = items.slice(startIndex, endIndex);

            this.pagination = {
                current_page: curPage,
                total_pages: totalPage,
                has_next: curPage < totalPage,
                has_pre: curPage > 1
            };
            this.products = [...paginationItems];

        },
        updateKeyword(keyword) {
            this.keywordList = [...this.keywordList, keyword];
        },
        async fetchProduct(id) {
            try {
                status.isLoading = true;
                const productApi = `${VITE_API}api/${VITE_PATH}/product/${id}`;
                const productsAllApi = `${VITE_API}api/${VITE_PATH}/products/all`;
                const [productRes, productsAllRes] = await Promise.all([axios.get(productApi), axios.get(productsAllApi)])


                if (productRes.data.success) {
                    this.product = productRes.data.product;
                    this.productsAll = productsAllRes.data.products;
                    this.relativeProducts = productsAllRes.data.products.filter((item) => item.category === this.product.category && item.id !== id)
                    this.otherProducts = productsAllRes.data.products.filter((item) => item.id !== id)
                    status.isLoading = false;
                } else {
                    toast.failToast(productRes.data.message);
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        }
    },

})