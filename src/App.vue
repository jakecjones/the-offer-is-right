<template>
  <v-app>
    <div class="panels">
      <div class="panels__panel model-panel">
        <CarModel id="model" />
        <qrcode-vue
        class="qr"
        value="https://the-offer-is-right.web.app/"
        size="150"
        level="H"
        :foreground="$ux.background"
        />
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
import '@google/model-viewer'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, onSnapshot, orderBy } from "firebase/firestore";
import QrcodeVue from 'qrcode.vue'

import loadStyles from '@/styles/styles';
import HeroSection from '@/components/HeroSection.vue'
import InfoCard from '@/components/InfoCard.vue'
import BidsSection from '@/components/BidsSection.vue'
import CarModel from '@/components/CarModel.vue'

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
  watch: {
    offers: {
      deep: true,

      handler(val) {
        console.log(val)
      }
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
    BidsSection,
    QrcodeVue,
    CarModel
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
.qr {
  position: absolute;
  box-shadow: 3px 3px 13px rgba(24, 53, 88, 0.2);
  border-radius: 10px;
  left: 0;
  bottom: 0;
  padding: 20px;
  margin: 2em;}
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
