<template>
    <div class="search-box position-absolute p-4" :class="{ show: isActive }">
        <div class="search-bar form-group d-flex">
            <input type="text" class="form-control rounded-0" placeholder="請輸入商品關鍵字" v-model="keyword">
            <button class="search-link nav-link" @click="() => {
                $emit('search', keyword);
                this.keyword = '';
            }">
                <i class="bi bi-search nav-icon rounded-3 fs-5"></i>
            </button>
        </div>
        <div class="mt-2 d-inline-block rounded-3" v-for="item in keywordList" :key="item">
            <span class="kw-link p-2 fw-bold bg-white m-2 d-inline-block rounded-3 text-decoration-none"
            @click="() => {
                $emit('clickKeyword',item);
                this.keyword = '';
            }"
            >
                {{ item }}
            </span>
              
     
        </div>
    </div>
</template>

<script>
import { mapState } from 'pinia';
import productsStore from '@/stores/productsStore';

export default {
    props: ['isActive'],
    data() {
        return {
            keyword: '',
        }
    },
    computed: {
        ...mapState(productsStore, [
            'keywordList'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.search-box {
    display: none;
    width: 300px;
    top: 5rem;
    right: 0;
    background-color: $primary;
    border-radius: 10px;

    input {
        border-right-color: $primary;

        &::placeholder {
            font-weight: bold;
        }
    }

}

.search-bar {
    border-radius: 10px;
    overflow: hidden;
}

.search-link {
    display: flex;
    align-items: center;
    background-color: #fff;
    color: $primary;
    border: 0px;

    &:hover {
        color: $primary;
    }
}

.show.search-box {
    display: block;
    
}

.kw-link {
    color: $primary;
    cursor:pointer;

    &:hover {
        opacity: 0.9;
    }
}
</style>