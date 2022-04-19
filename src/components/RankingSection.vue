<template>
    <div class="bids-section">
        <div class="bids-section__row" v-for="(offer, index) in offers" :key="index">
            <div class="bids-section__bid">
                <div class="bids-section__price">
                    ${{offer.offer.toLocaleString()}}
                </div>
            </div>
            <PriceTag :name="offer.name" />
        </div>
    </div>
</template>

<script>
import PriceTag from '@/components/PriceTag.vue'

    export default {
        components: {
            PriceTag
        },
        props: {
            offers: Array
        }
    }
</script>

<style lang="scss" scoped>
.bids-section {
    display: flex;
    width: 90%;
    max-width: 450px;
    margin: 20px auto;
    position: relative;
    flex-direction: column;
    &__bid {
        display: flex;
        align-items: center;
    }
    &__price {
        background-color: #FEB948;
        padding: 5px 10px;
        display: flex;
        align-items: center;
        font-size: 20px;
        letter-spacing: 1px;
        border: 4px solid var(--ux-background);
    }
    &__row {
        display: flex;
        width: 100%;
        margin-bottom: 1em;
    }

}
</style>