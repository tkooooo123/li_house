import { defineStore } from 'pinia';
import axios from 'axios';
const { VITE_API, VITE_PATH } = import.meta.env
console.log('1')

export default defineStore('productsStore', {
    state: () => ({
        products: [],
        productsAll: [],
        filteredProducts: [],
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
                this.filteredProducts = productsAll;
                this.productsAll = productsAll;
                //取得產品分類清單
                productsAll.forEach((item) => {
                    if (!this.categoryList.includes(item.category)) {
                        this.categoryList.push(item.category)
                    }
                })
                this.getPagination(productsAll);
                console.log(res)
            } catch (error) {
                console.log(error)
            }
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
                this.getPagination(this.productsAll)
                
            }
        },
        getPagination(items, curPage = 1, perPage = 10) {
            console.log(items, 'ite')
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

            this.products = [...paginationItems]
            
        }
    },

})