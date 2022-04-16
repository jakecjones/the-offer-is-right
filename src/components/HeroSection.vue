<template>
    <div class="hero-section">
        <HeroLogo />
    </div>
</template>

<script>
    import HeroLogo from '@/components/HeroLogo.vue'

    export default {
        components: {
            HeroLogo
        }
    }
</script>

<style lang="scss" scoped>
.hero-section {
    background-color: var(--ux-background);
    width: 100%;
    height: 250px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
</style>