<template>
  <div class="info-card">
    <div class="info-card__screen" :class="{ 'screen-hidden': !voteMode }">
      <div class="ml-4">Voting is live!</div>
      <div>Voting ends 4/20/22 @ 3pm</div>
      <CarModel id="sub-model"/>
      <template v-if="$vuetify.breakpoint.mobile && !userExists">
        <div class="info-card__price">{{ offerDisplay }}</div>
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
      </template>
      <div class="link mt-2" v-else-if="$vuetify.breakpoint.mobile">
        You guessed ${{ user.offer.toLocaleString() }}
      </div>
    </div>
    <ValidationObserver
      v-if="$vuetify.breakpoint.mobile && !userExists"
      v-slot="{ handleSubmit }"
      ref="observer"
      slim
    >
      <form
        class="info-card__screen"
        @submit.prevent="handleSubmit(addNewOffer)"
      >
        <p>Just a few more details</p>
        <ValidationProvider
          rules="required|max:16"
          v-slot="{ errors }"
          name="Name"
        >
          <v-text-field
            label="Name"
            v-model="user.name"
            class="mb-4"
            hide-details
            outlined
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          rules="required|email"
          v-slot="{ errors }"
          name="Email"
          mode="eager"
        >
          <v-text-field
            label="Email"
            v-model="user.email"
            class="mb-2"
            hide-details
            outlined
            :error-messages="errors"
          ></v-text-field>
        </ValidationProvider>

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
              Back
            </v-btn>
          </v-col>
          <v-col>
            <v-btn
              class="mt-6"
              width="100%"
              color="#0092D8"
              dark
              depressed
              large
              :loading="!!loading"
              type="submit"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { email, max, required } from "vee-validate/dist/rules";
import CarModel from '@/components/CarModel.vue'

extend("required", required);
extend("email", email);
extend("max", max);

export default {
  components: {
    CarModel,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      loading: 0,
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
  props: {
    userExists: Boolean,
    userData: Object,
  },
  created() {
    if (this.userExists) {
      this.user = this.userData;
      this.offer = this.userData.offer;
    }
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
      this.loading++;
      try {
        this.user.offer = this.offer;

        const docData = {
          name: this.user.name,
          email: this.user.email,
          createdAt: new Date().toUTCString(),
          offer: this.user.offer,
        };

        const existingDocsResult = await getDocs(query(collection(this.$db, "offers"), where("email", "==", this.user.email)));
        const existingDocs = existingDocsResult.docs;

        if (existingDocs.length > 0) {
          const firstDocData = existingDocs[0].data();
          console.log(firstDocData)
          localStorage.setItem("offer-user", JSON.stringify(firstDocData));
          this.$emit("register-user", firstDocData);
        } else {
          const offerCreated = await addDoc(
            collection(this.$db, "offers"),
            docData
          );

          if (offerCreated?.firestore) {
            localStorage.setItem("offer-user", JSON.stringify(this.user));
            this.$emit("register-user", this.user);
          }
        }

        this.user.name = "";
        this.user.email = "";
        this.$refs.observer.reset();
      } finally {
        this.loading--;
      }
    },
  },
  computed: {
    offerDisplay() {
      return `$${this.offer.toLocaleString()}`;
    },
  },
};
</script>

<style lang="scss" scoped>
#sub-model {
  margin: 0 auto;
    @media screen and (min-width: 960px) {
      display: none;
    }
}
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
  .link {
    font-size: 22px;
    color: var(--ux-primary);
  }
}
</style>
