<template>
    <model-viewer
    auto-rotate-delay="0"
    camera-orbit="0 80deg 0"
    max-field-of-view="80deg"
    field-of-view="20deg"
    class="model"
    ios-src="https://firebasestorage.googleapis.com/v0/b/the-offer-is-right.appspot.com/o/bmw.usdz?alt=media&token=91a3ce0a-2672-4ef3-a81b-c695d0654ece"
    src="https://firebasestorage.googleapis.com/v0/b/the-offer-is-right.appspot.com/o/bmw.glb?alt=media&token=a2b85579-2ccc-4adc-a535-5f95a067be0c"
    alt="Carvana model"
    environment-image="neutral"
    ar
    ar-modes="webxr model-viewer quick-look"
    auto-rotate
    :camera-controls="false"
>
</model-viewer>
</template>
<style lang="scss" scoped>
    #model {
      width: 100%;
      height: 100vh;
    }
</style>