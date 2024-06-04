<template>
    <div class="container" data-aos="fade-down" data-aos-delay="150">
        <div class="subscribe bg-primary py-3 my-5 rounded-5 row">
            <div className="col-md-6 d-md-flex flex-row-reverse">
                <div>
                    <h3 className="subscribe-title text-white fw-bold text-center ps-2">訂閱電子報</h3>
                    <p className="fw-bold text-white text-center m-0 fs-5">隨時取得最新資訊與活動</p>
                </div>
            </div>
            <div class="col-md-6">
                <VForm v-slot="{ errors }">
                    <div class="d-flex align-items-center pt-3">
                        <div class="form-group m-0 pb-3  mx-md-3 mx-auto position-relative">
                            <VField type="email" class="form-control border border-primary subscribe-input" id="email"
                                placeholder="user1@gmail.com" name="email" rules="email|required"
                                :class="{ 'is-invalid': errors['email'] }" />
                            <button className="subscribe-btn text-primary">
                                <i class="bi bi-send-fill"></i>
                            </button>
                            <ErrorMessage name="email" class="invalid-feedback" />
                        </div>


                    </div>

                </VForm>

            </div>

        </div>

    </div>
</template>


<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

.subscribe {

    &-input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    &-btn {

        position: absolute;
        top: 1px;
        right: -37.6px;
        width: 40px;
        padding: 6px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        border-style: none;
        border-left: 1px solid $primary;
        background-color: #fff;
        transition: all 0.2s;

        &:hover {
            i {
                transform: scale(1.2);
            }
        }

        i {
            display: block;
        }

    }
    .invalid-feedback {
        position: absolute;
    }

}
</style>