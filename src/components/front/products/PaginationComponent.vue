<template>
    <nav class="Page navigation align-middle">
        <ul class="pagination">
            <li class="page-item" :class="{ disabled: !pages.has_pre }">
                <button class="page-link" @click="$emit('change-page', items, pages.current_page - 1)"
                    aria-label="Previus">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
            <li class="page-item" v-for="page in pages.total_pages" :key="page"
                :class="{ active: page === pages.current_page }" @click.prevent="$emit('change-page', items, page)">
                <button class="page-link">{{ page
                    }}</button>
            </li>

            <li class="page-item" :class="{ disabled: !pages.has_next }">
                <button class="page-link" @click="$emit('change-page', items, pages.current_page + 1)"
                    aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    props: ['pages', 'items', 'getPagination']
}
</script>