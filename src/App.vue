<template>
  <v-app>
    <div class="panels">
      <div class="panels__panel model-panel">
        <CastedVotes />
        <CarModel id="model" />
        <qrcode-vue
        class="qr"
        value="https://the-offer-is-right.web.app/"
        size="180"
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
        <BidsSection v-if="hasOffers && !isRankingSection" :offers="offers"/>
        <RankingSection v-if="hasOffers && isRankingSection" :offers="rankedOffers"/>
      </div>
    </div>
  </v-app>
</template>

<script>
import Vue from 'vue';
import '@google/model-viewer'

import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, onSnapshot, orderBy, getDocs, doc, getDoc } from "firebase/firestore";
import QrcodeVue from 'qrcode.vue'

import loadStyles from '@/styles/styles';
import HeroSection from '@/components/HeroSection.vue'
import InfoCard from '@/components/InfoCard.vue'
import BidsSection from '@/components/BidsSection.vue'
import RankingSection from '@/components/RankingSection.vue'
import CarModel from '@/components/CarModel.vue'
import CastedVotes from '@/components/CastedVotes.vue'

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
  async created() {
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

    this.rankedOffers = await this.getSortedOffers(74211);

  },
  data() {
    return {
      userExists: false,
      userData: {},
      config: {},
      offers: [],
      rankedOffers: [],
      updateKey: Date.now()
    }
  },
  watch: {
    offers: {
      deep: true,

      handler() {
        window.explode();
      }
    }
  },
  methods: {
    registerUser(user) {
      this.userExists = true;
      this.userData = user;
      this.updateKey = Date.now();
    },
    async getSortedOffers(goal) {
      const allDocsResult = await getDocs(
        query(collection(this.$db, "offers"))
      );
      const allDocs = allDocsResult.docs.map(doc => doc.data());
      return allDocs.filter(doc => doc.offer <= goal).sort((a, b) => {
        return b.offer - a.offer;
      })
    },
    async getRanks(goal) {
      const allDocsResult = await getDocs(
        query(collection(this.$db, "offers"))
      );
      const allDocs = allDocsResult.docs.map(doc => doc.data());
      let closest = null;
      let closestGuess = 0;
      for (const doc of allDocs) {
        if (doc.offer <= goal && doc.offer > closestGuess) {
          closest = doc;
          closestGuess = doc.offer
        }
      }
      return closest
    },
    async getConfig() {
      const docRef = doc(db, "config", "default");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.config = docSnap.data();
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
    }
  },
  components: {
    HeroSection,
    InfoCard,
    BidsSection,
    QrcodeVue,
    CarModel,
    CastedVotes,
    RankingSection
  },
  computed: {
    hasOffers() {
      return this.offers?.length;
    },
    isRankingSection() {
      return true
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
