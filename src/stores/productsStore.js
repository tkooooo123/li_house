import { defineStore } from 'pinia';
import axios from 'axios';
const { VITE_API, VITE_PATH } = import.meta.env
console.log('1')

export default defineStore('productsStore', {
    state: () => ({
        products: [],
        productsAll: [],
        categorySelected: '所有商品',
        categoryList: ['所有商品'],
        pagination: {
            current_page: 1,
            total_pages: 1,
            has_next: true,
            has_pre: false
        },
        product: {},
    }),
    actions: {
        async fetchProducts() {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/products/all`;
                const res = await axios.get(api);
                const productsAll = res.data.products;
                this.products = productsAll;
                this.productsAll = productsAll;

                //取得產品分類清單
                productsAll.forEach((item) => {
                    if (!this.categoryList.includes(item.category)) {
                        this.categoryList.push(item.category)
                    }
                })
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        },
        changeCategory(category) {
            if (category !== '所有商品') {
                this.categorySelected = category;
                const products = this.productsAll.filter((item) => item.category === category);
                this.products = products;
            } else {
                this.categorySelected = '所有商品';
                this.products = this.productsAll;
            }
        }
    },

})