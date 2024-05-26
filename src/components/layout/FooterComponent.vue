<template>
    <footer class="footer bg-primary">
        <div class="container">
                    <div class="row pt-4 px-md-0 px-3">
                        <div class="col-md-4 col-6">
                            <h4 class="fw-bold text-white">關於我們</h4>
                            <ul class="d-flex flex-column p-0">
                                <RouterLink to="/brandstory" class="nav-item fw-bold">品牌故事</RouterLink>
                                <RouterLink to="/contactus" class="nav-item fw-bold">聯絡我們</RouterLink>
                            </ul>
                        </div>
                        <div class="col-md-4 col-6">
                            <h4 class="fw-bold text-white">顧客服務</h4>
                            <ul class="d-flex flex-column p-0">
                                <RouterLink to="/faq" class="nav-item fw-bold">常見問題</RouterLink>
                                <RouterLink to="/privacy" class="nav-item fw-bold">隱私權政策</RouterLink>
                            </ul>
                        </div>
                        <div class="col-md-4 text-white">
                            <div class="d-flex align-items-center mb-2"><h4 class="fw-bold m-0">Li House</h4> <RouterLink to="/admin/login" class="rounded-pill bg-white fw-bold py-1 px-2 ms-3">後台登入</RouterLink></div>
                            <ul class="d-flex flex-column p-0">
                                <span class="fw-bold">營業時間： 10:00 - 20:00</span>
                                <span class="fw-bold">電話：04-2345-6789</span>
                                <span class="fw-bold">Email： li_house@gmail.com</span>
                                
                            </ul>
                        </div>
                    </div>
                    <div class="border-top border-1 border-white mt-3 py-3 text-center text-white fw-bold">
                    本站僅作為網頁作品練習使用 2024 © All Rights Reserved.
                    </div>
                </div>
    
    </footer>
</template>

<style lang="scss" scoped>
@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';
.nav-item {
    color:white;
    text-decoration: none;
    &:hover {
 text-decoration:underline;
   
    }
}
</style>