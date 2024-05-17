<template>
    <NavbarComponent />
    <RouterView />
</template>

<script>
import NavbarComponent from '../../components/layout/NavbarComponent.vue'

export default {
    components: {
        NavbarComponent,
    }
}
</script>

