<template>
  <v-container elevation-10 class="mt-5">
    <v-col
      sm="12"
      md="8"
      lg="4"
      class="mx-auto mt-3 py-5"
      v-if="this.mode == 'false'"
    >
      <v-row sm="12" md="3" lg="3">
        <h2 class="headline grey--text text--darken-3 text-center">
          {{ produit.nom }}
        </h2>
      </v-row>
      <v-row>
        <v-card-text>
          <h2 class="title primary--text">
            {{ produit.categorie }}
          </h2>
          <v-row>
            <v-col>
              <p>Quantité Blanc-Mesnil : {{ produit.qtBM }}</p>
              <p>Quantité Paris : {{ produit.qtParis }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-row>

      <v-row>
        <v-col>
          <v-btn
            @click="editProduit()"
            type="button"
            class="
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--default
              primary
            "
          >
            Modifier
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col
      sm="12"
      md="8"
      lg="4"
      class="mx-auto mt-3 py-5"
      v-if="this.mode == 'true'"
    >
      <v-row sm="12" md="3" lg="3">
        <h2 class="headline grey--text text--darken-3 text-center">
          {{ produit.nom }}
        </h2>
      </v-row>
      <v-row>
        <h2 class="title primary--text">
          {{ produit.categorie }}
        </h2></v-row
      >
      <v-row sm="12" md="3" lg="3">
        <v-text-field
          name="qtParis"
          id="qtParis"
          v-model="qtParis"
          label="quantité Paris"
          type="number"
        >
        </v-text-field>
      </v-row>
      <v-row sm="12" md="3" lg="3">
        <v-text-field
          name="qtBM"
          id="qtBM"
          v-model="qtBM"
          label="quantité Blanc-mesnil"
          type="number"
        >
        </v-text-field>
      </v-row>
      <v-row>
        <v-col>
          <v-btn
            @click="saveProduit()"
            type="button"
            class="
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--default
              success
            "
          >
            Valider
          </v-btn>
          <v-btn
            to="/produits"
            type="button"
            class="
              v-btn v-btn--is-elevated v-btn--has-bg
              theme--light
              v-size--default
              error
            "
          >
            Annuler
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Produit",
  data: () => ({
    produit: {},
    qtBM: "",
    qtParis: "",
    mode: "false",
  }),
  async mounted() {
    const response = await axios.get(
      `http://localhost:4000/api/produits/${this.$route.params.id}`
    );
    const data = response.data;
    this.produit = data;
  },
  methods: {
    editProduit() {
      this.mode = "true";
    },
    saveProduit() {
      this.mode = "false";

      console.log(this.qtBM, this.qtParis);
      axios
        .put(`http://localhost:4000/api/produits/${this.$route.params.id}`, {
          nom: this.produit.nom,
          categorie: this.produit.categorie,
          qtBM: this.qtBM,
          qtParis: this.qtParis,
        })
        .then(function () {
          window.location.href = "/produits/";
        });
    },
  },
};
</script>