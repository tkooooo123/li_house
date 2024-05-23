<template>
    <div class="nav bg-primary">
        <div class="d-flex container justify-content-between align-items-center">

            <button class="toggle-btn btn border-0 d-md-none" @click="switchToggle" :class="{ active: isToggled }">
                <div class="toggle"></div>
            </button>
            <div class="toggle-menu bg-primary d-md-none">
                <ul class="mt-3">
                    <li>
                        <RouterLink to="/brandstory" class="nav-link ms-2"
                        @click="switchToggle"
                        >
                            品牌故事
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/articles" class="nav-link ms-2"
                        @click="switchToggle">
                            最新消息
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="products" class="nav-link ms-2"
                        @click="switchToggle">
                            商品一覽
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="contactus" class="nav-link ms-2"
                        @click="switchToggle"
                        >
                            聯絡我們
                        </RouterLink>
                    </li>
                </ul>
            </div>
            <div class="d-flex">
                <RouterLink to="/">
                    <img class="logo-img" src="/images/logo_img.png" alt="Li House">
                </RouterLink>
                <div class="d-none d-md-flex align-items-center ms-3">
                    <RouterLink class="nav-link fs-5 p-2 rounded-2" to="/articles">最新消息</RouterLink>
                    <RouterLink class="nav-link fs-5 p-2 rounded-2" to="/brandstory">品牌故事</RouterLink>
                    <RouterLink class="nav-link fs-5 p-2 rounded-2" to="/products">商品一覽</RouterLink>
                </div>
            </div>
            <div class="d-flex align-items-center">

                <div class="position-relative">
                    <i class="bi bi-search nav-icon rounded-3 fs-5" @click="switchActive"></i>
                    <SearchDropDown :isActive="isActive" :keywordList="keywordList" @search="handleSearch"
                        @clickKeyword="clickKeyword" />

                </div>
                <div class=" position-relative">
                    <RouterLink to="/cart">
                        <i class="bi bi-basket-fill nav-icon rounded-3 fs-5"></i>
                    </RouterLink>
                    <span class="position-absolute cartItem-quantity translate-middle badge rounded-pill bg-danger"
                        v-if="cartList.length">
                        {{ cartList.length }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import cartStore from '@/stores/cartStore';
import productsStore from "@/stores/productsStore";
import SearchDropDown from './SearchDropDown.vue'
export default {
    components: {
        SearchDropDown,
    },
    data() {
        return {
            isToggled: false,
            isActive: false,
            keywordList: [],
        }
    },
    methods: {
        ...mapActions(cartStore, [
            'fetchCart'
        ]),
        ...mapActions(productsStore, [
            'updateKeyword'
        ]),
        switchToggle() {
            this.isToggled = !this.isToggled;
        },
        switchActive() {
            this.isActive = !this.isActive;
        },
        handleSearch(keyword) {
            this.updateKeyword(keyword)
            this.switchActive();
            this.$router.push({ path: '/search', query: { keyword } });
        },
        clickKeyword(item) {
            this.switchActive();
            this.$router.push({ path: '/search', query: { keyword: item } });
        },
    },
    computed: {
        ...mapState(cartStore, [
            'cartList',

        ])
    },
    created() {
        this.fetchCart();
    }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.nav {
    position: fixed;
    left: 0;
    right: 0;
    height: 66px;
    z-index: 100;
}



.toggle-btn.active~.toggle-menu {
    display: flex;
}

.toggle {
    position: relative;
    width: 2em;
    height: .25rem;
    background: white;
    transition: all .5s;

    &:before,
    &:after {
        display: block;
        content: "";
        height: .25rem;
        width: 2rem;
        background: white;
        position: absolute;
        z-index: -2;
        transition: all 0.5s;

    }

    &:before {
        top: .625rem;
    }

    &:after {
        top: -.625rem;
    }
}

.active {
    transform: scale(.75);
    z-index: 300;

    .toggle {
        background: transparent;


        &:before {
            top: 0;
            transform: rotate(-45deg);
        }

        &:after {
            top: 0;
            transform: rotate(45deg);
        }
    }
}

.toggle-menu {
    display: none;
    position: fixed;
    padding-top: 66px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 200;
}

.logo-img {
    height: 50px;
}

.nav-link {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: all .3s ease;

    &:hover {
        color: $primary;
        background: white;

    }
}

.nav-icon {
    padding: 10px;
    color: white;
    transition: all .3s ease-out;

    &:hover {
        color: $primary;
        background: white;
    }
}
</style>