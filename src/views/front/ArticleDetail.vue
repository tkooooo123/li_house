<template>
    <div class="container pt-mh">
        <div class="row justify-content-center">
            <p class="fs-5 fw-bold m-0 text-md-end text-start mt-5">
                    <RouterLink to="/" class="text-secondary">首頁</RouterLink>
                    <span> / </span>
                    <RouterLink to="/articles" class="text-secondary">最新消息</RouterLink>
                    <span> / </span>
                    <RouterLink to="/articles" class="text-black">{{ article.title }}</RouterLink>
                </p>
            <div class="col-md-9">
                <h1 class="article-title fw-bold mt-md-2 mt-3">《{{ article.title }}》</h1>
           
                <div>
                    <span className="badge text-dark m-1 fs-6"><i className="bi bi-pencil"></i>
                        {{ article.author }}</span>
                    <span className="badge text-dark m-1 fs-6"><i className="bi bi-calendar3"></i> {{ new
                    Date(article.create_at).toLocaleDateString() }}</span>
                </div>
                <span className="bg-secondary badge text-dark p-1 m-1 fs-6" v-for="tag in article.tag" :key="tag"><i
                        className="bi bi-tag fs-6"></i>{{ tag }}</span>
                <img :src="article.image" className="card-img-top mt-3 bg-light" :alt="article.title" />
                <p className="card-text fw-bold text-muted mt-3">{{ article.description }}</p>
                <p className="card-text fw-bold mt-3">{{ article.content }}</p>
                <div className="row my-5">

                    <RouterLink className="col-6" v-if="prevArticle" :to="{ path: `/article/${prevArticle.id}` }">
                        <div className="border-bottom border-primary border-4 ps-3">
                            <i className="bi bi-arrow-left"></i> 前一篇 <br />
                            <span className="fw-bold">{{ prevArticle.title }}</span>
                        </div>
                    </RouterLink>
                    <RouterLink className="col-6" v-if="nextArticle" :to="{ path: `/article/${nextArticle.id}` }">
                        <div className="border-bottom border-primary border-4 ps-3">
                            後一篇 <i className="bi bi-arrow-right"></i><br />
                            <span className="fw-bold">{{ nextArticle.title }}</span>
                        </div>
                    </RouterLink>


                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axios from "axios";
import statusStore from "@/stores/statusStore";
import toastStore from "@/stores/toastStore";
const { VITE_API, VITE_PATH } = import.meta.env;
const status = statusStore();
const toast = toastStore();

export default {
    data() {
        return {
            article: {},
            prevArticle: {},
            nextArticle: {},
            pageId: this.$route.params.id,
        }
    },
    methods: {
        async fetchArticle(id) {
            try {
                status.isLoading = true;
                const api = `${VITE_API}api/${VITE_PATH}/article/${id}`;
                const res = await axios.get(api);
                if (res.data.article) {
                    this.article = res.data.article;
                    status.isLoading = false;
                    //取得前後文章
                    const articlesRes = await axios.get(`${VITE_API}api/${VITE_PATH}/articles`)
                    articlesRes.data.articles.forEach((item, i) => {
                        if (item.id === id) {
                            this.prevArticle = articlesRes.data.articles[i - 1];
                            this.nextArticle = articlesRes.data.articles[i + 1];
                        }
                    })
                } else {
                    toast.failToast(res.data.message)
                    status.isLoading = false;
                }
            } catch (error) {
                toast.handleError();
                status.isLoading = false;
            }
        },
    },
    created() {
        this.fetchArticle(this.$route.params.articleId);
    },
    computed: {
        id() {
            return this.$route.params.articleId;
        }
    },
    watch: {
        id(newId, oldId) {
            if (newId !== oldId) {
                this.fetchArticle(newId);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card-img-top {
    height: 25rem;
    object-fit: cover;
}
</style>