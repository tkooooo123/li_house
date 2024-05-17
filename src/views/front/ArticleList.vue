<template>
    <div class="container pt-5">
        <div class="row">
            <h1 class="pt-5 fw-bold">最新消息</h1>
            <div class="col-lg-4 mt-3" v-for="article in articleList" :key="article.id">
                <RouterLink :to="{ path: `/article/${article.id}` }">
                    <div class="card">
                        <img :src="article.image" className="card-img-top bg-light" :alt="article.title" />
                        <div className="card-body">
                            <h5 className="card-title fw-bold text-primary">{{ article.title }}</h5>

                            <p className="card-text fw-bold text-muted">{{ article.description }}</p>

                            <div>
                                <span className="badge text-dark  p-1"><i className="bi bi-pencil"></i>
                                    {{ article.author }}</span>
                                <span className="badge text-dark m-1 p-1"><i className="bi bi-calendar3"></i> {{ new
                Date(article.create_at).toLocaleDateString() }}</span>

                            </div><span className="bg-secondary badge text-dark p-1 m-1" v-for="tag in article.tag"
                                :key="tag"><i className="bi bi-tag"></i>{{ tag }}</span>

                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
const { VITE_API, VITE_PATH } = import.meta.env;

export default {
    data() {
        return {
            articleList: []
        }
    },
    methods: {
        async fetchArticleList() {
            try {
                const api = `${VITE_API}api/${VITE_PATH}/articles`
                const res = await axios.get(api);
                this.articleList = res.data.articles;
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.fetchArticleList();
    }
}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '../../assets/helpers/variables';

.card-img-top {
    height: 15rem;
    object-fit: cover;
}
</style>