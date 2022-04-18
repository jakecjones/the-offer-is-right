<template>
    <div class="bids-section">
        <div class="bids-section__row" v-for="(offer, index) in offers" :key="index">
            <HaloPrice :offer="offer.offer" />
            <PriceTag :offer="offer" />
        </div>
    </div>
</template>

<script>
import HaloPrice from '@/components/HaloPrice.vue'
import PriceTag from '@/components/PriceTag.vue'

    export default {
        components: {
            HaloPrice,
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

    &__row {
        display: flex;
        width: 100%;
        margin-bottom: 1em;
    }

}
</style>