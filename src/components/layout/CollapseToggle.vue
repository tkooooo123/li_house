<template>
    <div>

        <div class="d-flex align-items-center justify-content-between border-bottom py-2">
            <h3 class="fw-bold  ms-3">{{ data.title }}</h3>
            <button class="btn border-0" type="button" data-bs-toggle="collapse" :data-bs-target="`#${data.id}`"
                aria-expanded="false" aria-controls="collapseExample" @click="switchToggle">
                <span v-if="isToggled"><i class="bi bi-chevron-up fs-2"></i></span>
                <span v-else><i class="bi bi-chevron-down fs-2"></i></span>
            </button>
        </div>
        <div class="collapse" :id="data.id">
            <div v-for="item in data.questions" :key="item.id" class="mt-3 ps-3">
            
            <h4 class="text-primary fw-bold">{{ item.id }}.{{ item.title }}</h4>
            <p class="fw-bold">{{ item.answer }}</p>
            <p class="text-danger"
            v-if="item.alert"
            >※ {{ item.alert }}</p>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    props: ['item'],
    data() {
        return {
            data: { ...this.item },
            isToggled: false
        }
    },
    methods: {
        switchToggle() {
            this.isToggled = !this.isToggled
        }
    }
}

</script>