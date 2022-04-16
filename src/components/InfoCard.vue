<template>
    <div class="info-card">
        <div class="ml-4">
            Voting is live!
        </div>
        <div>
            Voting ends 4/20/22 @ 3pm
        </div>
        <v-btn class="mt-4" color="#0092D8" dark depressed large>
            Cast your vote!
        </v-btn>
    </div>
</template>

<script>
    export default {
        
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
}
</style>