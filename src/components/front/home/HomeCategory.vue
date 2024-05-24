<template>
    <div class="container">
        <div class="home-category">
            <h2 class="py-5 fw-bold text-primary text-center fs-1" data-aos="fade-down">熱門分類</h2>
            <ul class="home-category-list row g-3 p-0" data-aos="fade-down"  data-aos-delay="150">
                <li class="col-md-3 col-sm-6 text-decoration-none"
                v-for="item in categoryList" :key="item.id"
                >
                    <RouterLink :to="{path:'products', query: { category: item.name}}">
                        <div class="home-category-list-item">
                            <span className="home-category-list-item-name">{{ item.name }}</span>
                        <img className="home-category-list-item-img" :src="item.imageUrl" :alt="item.name" />
                        </div>
                    </RouterLink>
                </li>


                <li class="col-md-3 col-sm-6 text-decoration-none">
                    <RouterLink to="/products">
                        <div class="home-category-list-item">
                            <span className="home-category-list-item-name">其他</span>
                            <img className="home-category-list-item-img" src="https://i.imgur.com/Zy3zGNv.jpeg"
                                alt="其他" />
                        </div>
                    </RouterLink>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            categoryList: [
                {
                    id: 1,
                    name: '寵物生活用品',
                    imageUrl: 'https://i.imgur.com/0r0ITxR.jpeg'
                },
                {
                    id: 2,
                    name: '寵物玩具',
                    imageUrl: 'https://i.imgur.com/ttDSZJk.jpeg'
                },
                {
                    id: 3,
                    name: '寵物食品',
                    imageUrl: 'https://i.imgur.com/wfJAV4D.jpeg'
                },
            ]
        }
    },


}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.home-category {
    &-title {
        font-size: 32px;
        text-align: start;
        transition: all 0.2s ease-in;

    }

    &-list-item {
        border: 1px solid $primary;
        position: relative;
        transition: all 0.2s ease-in-out;
        aspect-ratio: 1;

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            opacity: 0.3;
            background-color: #393939;
            transition: all 0.3s ease-in;
        }

    }

    &-list-item-name {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        text-align: center;
        font-size: 1.3rem;
        font-weight: bold;
        color: #fff;
        z-index: 5;
    }

    &-list-item-img {
        object-fit: cover;
        max-width: 100%;
        min-height: 100%;
        aspect-ratio: 1 / 1;
    }
}

a:hover {
    .home-category-list-item {
        transform: scale(1.1);

        &::before {
            background-color: transparent;
            border: 8px solid $gray-300;
        }
    }
}
</style>