<template>
    <div class="price-tag">
        <div class="price-tag__line"></div>
        <div class="price-tag__tag">
            <svg  width="161" height="76" viewBox="0 0 161 76" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M148.5 74H28.2584C25.6092 74 23.0682 72.9487 21.1933 71.077L4.93488 54.8459C3.05588 52.9701 2 50.424 2 47.7689V25.6428C2 22.7324 3.26791 19.9664 5.4728 18.0668L21.3077 4.42401C23.1228 2.86018 25.4391 2 27.8349 2H148.5C154.023 2 158.5 6.47715 158.5 12V64C158.5 69.5229 154.023 74 148.5 74Z" fill="#FEB948" stroke="#122946" stroke-width="4"/>
            <circle cx="20" cy="38" r="6" fill="#122946"/>
            </svg>
            <div class="price-tag__name">
                <p>{{offer.name}}</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            offer: Object
        },
        created() {
            this.showOffers = this.$route.query.showOffers == 'true';
        }
    }
</script>

<style lang="scss" scoped>
.price-tag {
    position: relative;
    width: calc(100% - 80px);
    display: flex;
    justify-content: flex-end;
    flex: 1;
    &__tag {
        position: relative;
        right: 0;
    }
    &__name {
        position: absolute;
        top: 0;
        right: 15px;
        display: flex;
        align-items: center;
        width: calc(100% - 50px);
        height: 100%;
        p {
            margin-top: 7px;
            text-align: left;
            width: 100%;
            overflow-wrap: break-word;
            font-size: calc(1rem);
            display: inline-block;
            font-weight: 400;
        }
    }
    &__line {
        position: relative;
        flex: 1;
        &::after {
            position: absolute;
            content: "";
            border-top: 1px dashed var(--ux-background);
            width: calc(100% - 20px);
            top: calc(50% - 2px);
            left: 10px;
        }
    }
}
</style>