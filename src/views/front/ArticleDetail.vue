<template>
    <div class="container pt-5">
        <div class="row justify-content-center">
            <div class="col-md-9 mt-5">
                <h1 className="article-title">《{{ article.title }}》</h1>
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
const { VITE_API, VITE_PATH } = import.meta.env;

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
                const api = `${VITE_API}api/${VITE_PATH}/article/${id}`;
                const res = await axios.get(api);
                this.article = res.data.article;

                //取得前後文章
                const articlesRes = await axios.get(`${VITE_API}api/${VITE_PATH}/articles`)
                articlesRes.data.articles.forEach((item, i) => {
                    if (item.id === id) {
                        this.prevArticle = articlesRes.data.articles[i - 1];
                        this.nextArticle = articlesRes.data.articles[i + 1];
                    }
                })
            } catch (error) {
                console.log(error);
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