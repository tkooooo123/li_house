<template>
  <div class="container pt-5">
    <h2 class="text-primary fw-bold text-center fs-1" data-aos="fade-down">熱門活動</h2>
    <div class="row mt-5">
      <div class="col-md-6 text-center" data-aos="fade-down" data-aos-delay="150">
        <div class="activity text-white mt-3">
          <div class="activity-content">
            <p class="fw-bold fs-3"><i class="bi bi-calendar3 me-2"></i>期間限定</p>
            <h3 class="fw-bold pt-3">活動名稱：歡慶開幕</h3>
            <p class="fw-bold fs-4">舉辦期間：即日起 ~ 8月31日</p>
            <p class="fw-bold fs-4">折扣優惠：全站商品享88折</p>
          </div>
        </div>
      </div>
      <div class="col-md-6 pt-3 mt-5 mt-md-0" data-aos="fade-down" data-aos-delay="150">
        <div class="d-flex flex-column justify-content-center h-100">
          <div className="ticket  mx-auto text-center  py-3 fs-5">
            <span className="ticket-text fs-4">優惠碼</span>
            <span className="ticket-dash  mx-2"></span>
            <span className="ticket-code fs-4">PET888</span>
          </div>
          <div class="text-center pt-3">
            <button type="button" @click="copy('PET888')"
              class="btn btn-primary rounded-0 p-3 mt-3 text-white fw-bold rounded-pill" :class="{ disabled: text }">
              <i class="bi" :class="{ 'bi-calendar': !text, 'bi-calendar-check': text }"></i>
              {{ text ? '複製成功' : '複製優惠碼' }}

            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import { useClipboard } from '@vueuse/core'
const { text, copy } = useClipboard()

</script>
<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.activity {
  background-image: url('https://i.imgur.com/yjkPbSa.jpeg');
  background-position: center center;
  background-size: cover;
  border-radius: 16px;
  padding: 10rem 0;
  position: relative;

  &-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  &::before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: black;
    opacity: 0.2;
    border-radius: 16px;
  }
}

.ticket {
  position: relative;
  width: 70%;
  border: 1px solid black;

  .ticket-dash {
    border-left: 1px dashed black;
  }

}

.ticket::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  height: 1.5rem;
  width: 1.5rem;
  background-color: $light-gray;
  border-radius: 50%;
  border-right: 1px solid black;
}

.ticket::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  height: 1.5rem;
  width: 1.5rem;
  background-color: $light-gray;
  border-radius: 50%;
  border-left: 1px solid black;

}
</style>