<template>
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fs-4 fw-bold" id="exampleModalLabel">確定要刪除訂單嗎？</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body fw-bold fs-5">
        訂單編號「{{id}}」刪除後將無法復原，確認要刪除嗎？
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary fw-bold rounded-pill" data-bs-dismiss="modal">取消</button>
        <button type="button" class="btn btn-primary fw-bold rounded-pill text-white"
        @click="$emit('handle-delete')"
        > 刪除</button>
      </div>
    </div>
  </div>
</div>

</template>


<script>
import Modal from 'bootstrap/js/dist/modal'

export default {
    props: ['id'],
    data() {
        return {
            modal: {}
        }
    },
    methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  }
}
</script>