import { defineStore } from 'pinia';

export default defineStore('toastStore', {
    state: () => ({
        message: [],
        count: 0
    }),
    actions: {
        handleError() {
            this.pushMessage({
                style: 'error',
                content: '發生錯誤，請稍後再試！'
              })
        },
        addMessage(res) {
            this.$patch({ message: res, count: this.count + 1 })
        },
        successToast(message) {
            this.addMessage({
                style: 'success',
                content: message
            });
        },
        errorToast(message) {
            this.addMessage({
                style: 'error',
                content: message
            });
        }
    }
})