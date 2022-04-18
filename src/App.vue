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
            src="https://firebasestorage.googleapis.com/v0/b/the-offer-is-right.appspot.com/o/bmw.glb?alt=media&token=a2b85579-2ccc-4adc-a535-5f95a067be0c"
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
        <InfoCard
          :key="updateKey"
          :userData="userData"
          :userExists="userExists"
          @register-user="registerUser"
        />
        <BidsSection v-if="hasOffers" :offers="offers"/>
      </div>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, onSnapshot, orderBy } from "firebase/firestore";

import loadStyles from '@/styles/styles';
import '@google/model-viewer'
import HeroSection from '@/components/HeroSection.vue'
import InfoCard from '@/components/InfoCard.vue'
import BidsSection from '@/components/BidsSection.vue'

const firebaseConfig = {
  apiKey: "AIzaSyDUqnPj7PzxDsR9r-Bs8Yy-Oq-V31z1eFs",
  authDomain: "the-offer-is-right.firebaseapp.com",
  projectId: "the-offer-is-right",
  storageBucket: "the-offer-is-right.appspot.com",
  messagingSenderId: "814405055456",
  appId: "1:814405055456:web:647aca5986ea5b65fa3185",
  measurementId: "G-F1VLQLRZ74"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
Vue.prototype.$db = db;


export default {
  name: 'App',
  created() {
    const userData = JSON.parse(localStorage.getItem('offer-user'));

    if (userData?.email && userData?.offer) {
      this.userExists = true;
      this.userData = userData;
    }

    loadStyles();
    const q = query(collection(db, "offers"), orderBy('createdAt', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const offers = [];
      querySnapshot.forEach((doc) => {
          offers.push(doc.data());
      });
      this.offers = offers;
    });
  },
  data() {
    return {
      userExists: false,
      userData: {},
      offers: [],
      updateKey: Date.now()
    }
  },
  methods: {
    registerUser(user) {
      this.userExists = true;
      this.userData = user;
      this.updateKey = Date.now();
    }
  },
  components: {
    HeroSection,
    InfoCard,
    BidsSection
  },
  computed: {
    hasOffers() {
      return this.offers?.length;
    }
  }
}
</script>

<style lang="scss">
@font-face {
    font-family: "Brandon Text";
    src: url("./assets/fonts/BrandonText-Black.otf") format("opentype");
}

#app {
  font-family: "Brandon Text", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F4F8FA;
  font-weight: 100;
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
    @media screen and (max-width: 960px) {
      .model-panel {
          display: none;
      }
      &__panel {
        width: 100%;
        max-height: 100vh;
        overflow: auto;
      }
    }
}
</style>
