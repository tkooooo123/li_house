<template>
    <div></div>
</template>

<script>
import { useToast } from "vue-toastification";
import { mapActions, mapState } from 'pinia';
import toastStore from '@/stores/toastStore'

export default {
    computed: {
        ...mapState(toastStore, [
            'message',
            'count'
        ])
    },
    methods: {
        ...mapActions(toastStore, ['addMessage']),
        createToast() {
            if (this.message.style) {
        const toast = useToast()
        toast[this.message.style](this.message.content)
        return { toast }
      }
        }
    },
   
    watch: {
        count: {
            handler: 'createToast'
        }
    }
  

}
</script>