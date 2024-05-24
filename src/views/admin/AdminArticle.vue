<template>
    <div class="bg-white pt-mh-100">
        <div class="container pb-5">
            <h2 class="fw-bold mt-3">文章列表</h2>
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
                            <button class="btn btn-outline-primary fw-bold">編輯</button>
                            <span> / </span>
                            <button class="btn btn-outline-danger" >刪除</button>
                        </td>
                    </tr>
                </tbody>
               
            </table>
            
            <PaginationComponent :pagination="pagination" :curPage="curPage" @change-page="changePage"/>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import adminStore from '@/stores/adminStore'
import PaginationComponent from '@/components/admin/PaginationComponent.vue'

export default {
    components: {
        PaginationComponent
    },
    data() {
        return {
            curPage: 1
        }
    },
    created() {
        this.fetchArticles()
    },

    methods: {
        ...mapActions(adminStore, [
            'fetchArticles'
        ]),
        changePage(page) {
            this.curPage = page
        },
    },
    computed: {
        ...mapState(adminStore, [
            'articleList',
            'pagination'
        ])
    }
}
</script>