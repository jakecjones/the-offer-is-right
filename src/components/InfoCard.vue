<template>
  <div class="info-card">
    <div class="info-card__screen" :class="{ 'screen-hidden': !voteMode }">
      <div class="ml-4">Voting is live!</div>
      <div>Voting ends 4/20/22 @ 3pm</div>
      <div class="info-card__price">${{ offer }}</div>

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
      <v-btn
        @click="next"
        class="mt-6"
        width="100%"
        color="#0092D8"
        dark
        depressed
        large
      >
        Cast your vote!
      </v-btn>
    </div>
    <div class="info-card__screen">
      <p>Just a few more details</p>
      <v-text-field
        label="Name"
        v-model="user.name"
        class="mb-4"
        hide-details
        outlined
      ></v-text-field>
      <v-text-field
        label="Email"
        v-model="user.email"
        class="mb-2"
        hide-details
        outlined
      ></v-text-field>

      <v-row>
        <v-col cols="4">
          <v-btn
            @click="next"
            class="mt-6"
            width="100%"
            color="#eee"
            depressed
            large
          >
            back
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            @click="addNewOffer"
            class="mt-6"
            width="100%"
            color="#0092D8"
            dark
            depressed
            large
          >
            Submit
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      offer: 22000,
      voteMode: true,
      user: {
        name: "",
        email: "",
        createdAt: null,
        offer: 0,
      },
    };
  },
  methods: {
    getPriceEstimation(value) {
      if (value < 30000) {
        return "$";
      }
      if (value > 30000 && value < 60000) {
        return "$$";
      }
      if (value > 60000) {
        return "$$$";
      }
    },
    next() {
      this.voteMode = !this.voteMode;
    },
    async addNewOffer() {
      const d = new Date().toUTCString()
      
      this.user.offer = this.offer;

      const docData = {
        name: this.user.name,
        email: this.user.email,
        createdAt: `${d}`,
        offer: this.user.offer,
      };

      await addDoc(collection(this.$db, "offers"), docData);
    },
  },
};
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
  padding: 3em 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;

  &__screen {
    width: 100%;
    padding: 0 2em;
    flex-shrink: 0;
    -webkit-transition: transform 250ms;
    -webkit-transition: -webkit-transform 250ms;
    transition: 250ms margin ease-in-out;
  }

  .screen-hidden {
    margin-left: -100%;
  }

  &__price {
    font-size: 32px;
  }
}
</style>