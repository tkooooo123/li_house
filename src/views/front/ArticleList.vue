<template>
    <div class="container pt-mh">
        <div class="row mb-5 mt-md-5 mt-3">
            <div class="d-md-flex flex-md-row-reverse align-items-center justify-content-between">
                <p class="fs-5 fw-bold m-0">
                    <RouterLink to="/" class="text-secondary">首頁</RouterLink>
                    <span> / </span>
                    <RouterLink to="/articles" class="text-black">最新消息</RouterLink>
                </p>
                <h1 class="fw-bold mt-md-0 mt-3">最新消息</h1>
            </div>
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

                            </div><span className="bg-primary badge text-dark p-1 m-1" v-for="tag in article.tag"
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
import statusStore from '@/stores/statusStore';
import toastStore from '@/stores/toastStore';
const { VITE_API, VITE_PATH } = import.meta.env;
const status = statusStore();
const toast = toastStore();

export default {
    data() {
        return {
            articleList: []
        }
    },
    methods: {
        async fetchArticleList() {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/articles`
                const res = await axios.get(api);
                if (res.data.articles) {
                    this.articleList = res.data.articles;
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