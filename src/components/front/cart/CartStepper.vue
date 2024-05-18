<template>
     <div class="stepper d-flex justify-content-center my-5">
            <div class="step"
            :class="{ active: stepper === 1, checked: stepper > 1 }"
            >
                <div className="circle"></div>
                <div className="label mt-1">確認商品</div>
            </div>
            <div class="step"
            :class="{ active: stepper === 2, checked: stepper > 2 }"
            >
                <div className="circle"></div>
                <span className="connect-line"></span>
                <div className="label mt-1">填寫資料</div>
            </div>
            <div class="step"
            :class="{ active: stepper === 3}"
            >
                <div className="circle"></div>
                <span className="connect-line"></span>
                <div className="label mt-1">完成訂購</div>
            </div>
        </div>
</template>

<script>

export default {
    props: ['stepper']
}
</script>

<style lang="scss" scoped>

@import 'bootstrap/scss/functions';
@import '@/assets/helpers/variables';

@mixin getStepNums($num) {
    @for $i from 1 through $num {
        &:nth-child(#{$i}) .circle::after {
            color: black;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            content: "#{$i}";
            font-weight: 700;
        }
    }
}



.stepper {
   

    .step {
        position: relative;
        display: flex;
        justify-content: center;
        width: 30%;
        

        .circle {
            position: relative;
            width: 3rem;
            height: 3rem;
            background: $primary;
            border-radius: 50%;
            opacity: 0.7;
        }

        @include getStepNums(3);

        &.active,
        &.checked {
          .circle,
          .connect-line,
          .label {
            opacity: 1;
          }
        }
        
        &.checked {
            .circle::after{
            content: '\2713'
          }
        }


        .connect-line {
            position: absolute;
            height: 2px;
            top: 50%;
            transform: translateY(-50%);
            left: calc(-50% + 20%);
            right: calc(+50% + 20%);
            background: $primary;
            opacity: 0.7;
        }
        .label {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            margin-top: 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            text-align:center;
            opacity: 0.3;
          }
    

    }

    
}
</style>