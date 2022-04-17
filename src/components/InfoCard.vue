<template>
    <div class="info-card">
        <div class="ml-4">
            Voting is live!
        </div>
        <div>
            Voting ends 4/20/22 @ 3pm
        </div>
        <div class="info-card__price">${{offer}}</div>

        <v-slider 
            :thumb-size="40"
            thumb-label="always"
            step="200"
            min="400"
            max="100000"
            v-model="offer"
            class="mt-10"
            hide-details
            :color="$ux.primary"
        >
          <template v-slot:thumb-label="{ value }">
            {{ getPriceEstimation(value) }}
          </template>
        </v-slider>
        <v-btn class="mt-6" color="#0092D8" dark depressed large>
            Cast your vote!
        </v-btn>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                offer: 22000
            }
        },
        methods: {
            getPriceEstimation(value) {
                if (value < 30000) {
                    return '$'
                }
                if (value > 30000 && value < 60000) {
                    return '$$'
                }
                if (value > 60000) {
                    return '$$$'
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
.info-card {
    box-shadow: 0px 6px 13px rgba(24, 53, 88, 0.1);
    border-radius: 6px;
    background-color: #fff;
    width: 90%;
    max-width: 450px;
    margin: -70px auto 0;
    position: relative;
    padding: 3em 1em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &__price {
        font-size: 32px;
    }
}
</style>