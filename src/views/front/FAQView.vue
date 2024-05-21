<template>
    <div class="container pt-mh">
       <div class="row align-items-center pb-5">
        <img class="faq-img" src="https://i.imgur.com/X25Xa9m.png" alt="faq">
        <div class="col-9 mx-auto">
          
        <div v-for="item in data" :key="item.id">
            <CollapseToggle :item="item" />
        </div>
        </div>
       </div>
    </div>
</template>

<script>
import CollapseToggle from '@/components/layout/CollapseToggle.vue'

const questionList = [
    {
        id: 1,
        title: '購物常見問題',
        questions: [
            {
                id: 1,
                title: '購物流程說明',
                answer: '選擇商品＞＞加入購物車＞＞前往結帳＞＞填寫收件資訊＞＞完成購物',
                alert: '提醒您，商品加入購物車但未結帳前，並無保留商品庫存功能，商品庫存分配將以結帳順序為依據。'
            },
            {
                id: 2,
                title: '如何查詢目前訂單的處理情況?',
                answer: '請您先「會員中心」後至「訂單紀錄」，即可查詢該訂單的處理狀態。',
                alert: ''
            },
            {
                id: 3,
                title: '如何修改、加訂或合併訂單',
                answer: '為避免影響商品庫存及避免帳務錯誤，請恕我們無法為您再將訂單『修改』或『加購』或『合併』訂單商品。',
                alert: '提醒您，如遇訂單狀態已完成出貨無法攔截時，請恕無法協助取消訂單。'
            },
        ]
    },
    {
        id: 2,
        title: '配送取貨問題',
        questions: [
            {
                id: 1,
                title: '可選擇的配送方式有那些?',
                answer: '全店商品將以『黑貓宅急便』宅配方式寄出，宅配範圍目前限於台灣本島地區；外島地區將以郵局配送。',
                alert: '其他提醒：當商品出貨後，若未於通知期限內完成取貨或拒收，將會產生未取件記錄，如達3次以上(含)，未來將無法再使用該付款方式下單。'
            },
            {
                id: 2,
                title: '台灣外島地區可以寄送嗎?',
                answer: '外島地區將以郵局海運配送，預計3-7日內配達，而送達時間會因天氣狀況、船隻班次而有變動的可能性。',
                alert: ''
            }
        ]
    },
    {
        id: 3,
        title: '發票常見問題',
        questions: [
            {
                id: 1,
                title: '什麼是「電子發票」？商品收到了，發票怎麼沒一起附上？',
                answer: '根據財政部令「電子發票實施作業要點」，於消費開立之「二聯電子發票」、「三聯電子發票」，不主動寄送，本站亦會將發票號碼上傳至政府平台。目前本站消費開立之「三聯電子發票」為會員載具，尚未開放共通性載具選項。',
                alert: ''
            },
            {
                id: 2,
                title: '發票可以指定日期或開立其它品名嗎?',
                answer: '因發票採用系統化自動開立，因此發票上的品名將依實際訂購的商品名稱開立，請恕無法指定開立其它品名或指定開立日期。',
                alert: ''
            },
            {
                id: 3,
                title: '購物發票，是否可開立為多張發票?',
                answer: '因發票採用系統化自動開立，故一筆訂單對應一張發票，請恕無法分別開立多張。如有分別開立需求，請將商品分別下單。',
                alert: ''
            }
        ]
    }
]
export default {
    components: {
        CollapseToggle,
    },
    data() {
        return {
            data: questionList
        }
    },
}
</script>

<style lang="scss">
.faq-img {
    width: 100%;
    object-fit: cover;
}
</style>