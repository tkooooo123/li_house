<template>
    <div class="bg-white pt-mh-100">
        <div class="container pb-5">
            <div class="d-flex justify-content-between align-items-center">
                <h2 class="fw-bold mt-3">文章列表</h2>
                <button class="btn btn-primary"
                @click="showArticleModal(null ,type = 'create')"
                >新增文章</button>
            </div>

            <table class="table fs-5">
                <thead>
                    <tr class="fw-bold">
                        <th scope='col'>建立日期</th>
                        <th scope='col'>標題</th>
                        <th scope='col'>作者</th>
                        <th scope='col'>描述</th>
                        <th scope='col'>公開狀態</th>
                        <th scope='col'>編輯 / 刪除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in articleList" :key="item.id">
                        <td>{{ new Date(item.create_at).toLocaleDateString() }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.author }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <span v-if="item.isPublic">啟用</span>
                            <span v-else>未啟用</span>
                        </td>
                        <td>
                            <button class="btn btn-outline-primary fw-bold"
                                @click="showArticleModal(item.id, 'edit')">編輯</button>
                            <span> / </span>
                            <button class="btn btn-outline-danger"
                            @click="showDeleteModal(item)"
                            >刪除</button>
                        </td>
                    </tr>
                </tbody>
                <ArticleModal ref="ArticleModal" :article="tempArticle" :type="type" />

            </table>
            <DeleteModal ref="DeleteModal" :title="articleTitle" :text="text" @handle-delete="handleDelete"/>
            <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage" />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import adminStore from '@/stores/adminStore'
import PaginationComponent from '@/components/admin/PaginationComponent.vue'
import ArticleModal from '@/components/admin/modal/ArticleModal.vue'
import DeleteModal from '@/components/admin/modal/DeleteModal.vue'
export default {
    components: {
        PaginationComponent,
        ArticleModal,
        DeleteModal
    },
    data() {
        return {
            curPage: 1,
            tempArticle: {},
            type: '',
            articleTitle: '',
            articleId:'',
            text: '文章'
        }
    },
    created() {
        this.fetchArticles()
    },

    methods: {
        ...mapActions(adminStore, [
            'fetchArticles',
            'fetchArticle',
            'deleteAritcle'

        ]),
        changePage(page) {
            this.curPage = page
        },
        async showArticleModal(id, text) {
            if(text === 'edit') {
                await this.fetchArticle(id);
            this.tempArticle = { ...this.article };
            } else {
                this.tempArticle = {
                    title: '',
                    author: '',
                    tag: [],
                    description: '',
                    content: '',
                    isPublic: true
                }
            }
            this.type = text
            this.$refs.ArticleModal.showModal()
        },
        showDeleteModal(article) {
            this.articleTitle = article.title;
            this.articleId = article.id;
            this.$refs.DeleteModal.showModal();
        },
        async handleDelete() {
            await this.deleteAritcle(this.articleId)
            this.$refs.DeleteModal.hideModal();
        }
    },
    computed: {
        ...mapState(adminStore, [
            'articleList',
            'pagination',
            'article'
        ])
    }
}
</script>