<template>
  <v-app>
    <div class="panels">
      <div class="panels__panel model-panel">
          <model-viewer
            auto-rotate-delay="0"
            camera-orbit="0 80deg 0"
            max-field-of-view="80deg"
            field-of-view="20deg"
            id="model"
            class="model"
            src="https://firebasestorage.googleapis.com/v0/b/the-offer-is-right.appspot.com/o/scene.glb?alt=media&token=fba82636-b7ff-4647-b249-326b30fa1d67"
            alt="Carvana model"
            environment-image="neutral"
            ar
            ar-modes="webxr model-viewer quick-look"
            auto-rotate
            :camera-controls="false"
        >
        </model-viewer>
      </div>
      <div class="panels__panel">
        <HeroSection />
        <InfoCard />
        <BidsSection />
      </div>
    </div>
  </v-app>
</template>

<script>
import loadStyles from '@/styles/styles';
import '@google/model-viewer'
import HeroSection from '@/components/HeroSection.vue'
import InfoCard from '@/components/InfoCard.vue'
import BidsSection from '@/components/BidsSection.vue'

export default {
  name: 'App',
  created() {
    loadStyles();
  },
  components: {
    HeroSection,
    InfoCard,
    BidsSection
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F4F8FA;
}
.panels {
  display: flex;
  &__panel {
    width: 40%;
    max-height: 100vh;
    overflow: auto;
  }
  .model-panel {
    background-color: #fff;
    position: relative;
    width: 70%;
    #model {
      width: 100%;
      height: 100vh;
    }
  }
}
</style>
