<template>
     <div class="d-flex justify-content-center mt-5">
                <nav class="Page navigation align-middle">
                    <ul class="pagination">
                        <li class="page-item" :class="{ disabled: !pagination?.has_pre }">
                            <button class="page-link" @click="$emit('change-page', curPage - 1)" aria-label="Previus">
                                <span aria-hidden="true">&laquo;</span>
                            </button>
                        </li>
                        <li class="page-item" v-for="page in pagination?.total_pages" :key="page"
                            :class="{ active: page === pagination.current_page }">
                            <button class="page-link" @click="$emit('change-page', page)">{{ page
                                }}</button>
                        </li>

                        <li class="page-item" :class="{ disabled: !pagination?.has_next }">
                            <button class="page-link" @click="$emit('change-page', curPage + 1)" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
</template>

<script>
export default {
    props: ['pagination', 'curPage'],
}
</script>