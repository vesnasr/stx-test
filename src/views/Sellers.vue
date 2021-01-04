<template>
  <div class="sellers">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <p>Sellers</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <show-seller
            v-for="(seller, index) in alreadySelectedSellers"
            :key="index"
            :sellerKey="index"
            :alreadySelectedSellers="alreadySelectedSellers"
            :allSellers="allSellers"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <hr class="my-4" />
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-button variant="success" @click="addSellerRow">+ Seller</b-button>
          <b-button variant="success" @click="saveSellers">Save</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

//import EventBus from '@/event-bus.ts';

import ShowSeller from "@/views/ShowSeller.vue";

//for data Validation:
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Validations } from "vuelidate-property-decorators";

@Component({
  components: {
    vSelect,
    ShowSeller
  },
  mixins: [validationMixin]
})
export default class Sellers extends Vue {
  // DATA
  public orderData: any = [];
  public alreadySelectedSellers: any[] = [];

  public allSellers: any[] = [];
  // COMPUTED
  @Validations()
  get validations() {
    return {
      sellersData: {
        id: { required },
        name: { required },
        percentage: { required }
      }
    };
  }

  //METHODS
  public created() {
    this.orderData = this.$store.getters.getOrderDataAction;
    console.log(JSON.stringify(this.orderData));

    this.alreadySelectedSellers = this.orderData.sellers;

    fetch("/api/seller")
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.allSellers = json;
      });
  }

  public sellerSelected(value: any) {
    console.log(value);
  }

  public addSellerRow() {
    if (this.alreadySelectedSellers.length < this.allSellers.length) {
      this.alreadySelectedSellers.push({ id: 0, name: "", percentage: 0.0 });
    } else {
      alert("Sorry, you already add all the sellers!");
    }
  }

  public saveSellers() {
    //EventBus.$emit('saveSellersEvent');

    if (this.orderData.sellers.length<=0) {
      alert('You must choose at least one seller!');
      return;
    }

    // if (this.orderData.sellers.length>0) {
    //   if (this.orderData.sellers[this.orderData.sellers.length-1].name === '') {
    //     alert('You must fill seller name!');
    //     return;
    //   }
    // }

    let sum = 0;
    for (const sellerIndex in this.orderData.sellers) {
      sum += parseInt(this.orderData.sellers[sellerIndex].percentage);
    }

    if (sum === 100) {
      const orderId = this.orderData.id;
      if (orderId === 0) {
        alert("Sorry, you must save order detalis first!");
      } else {
        fetch("/api/order/" + orderId + "/seller", {
          method: "put",
          body: JSON.stringify(this.orderData.sellers)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              alert(
                JSON.stringify(
                  "For order with id: " + data.id + " update sellers"
                )
              );
            } else {
              alert(JSON.stringify("Error: " + data.message));
            }
          });
      }
    } else {
      alert("Sorry, total percentage must be 100%!");
    }
  }
}
</script>

<style lang="scss">
// IMPORT
@import "vue-select/src/scss/vue-select.scss";

.vs--searchable {
  padding: 5px 10px 5px 10px;
  border-radius: 10px;

  .vs__dropdown-toggle {
    height: 40px;
    background: none;
    background: -webkit-gradient(
      linear,
      right top,
      left top,
      color-stop(50%, #fff),
      color-stop(50%, #f9f9f9)
    );
    background: linear-gradient(to left, #fff 50%, #f9f9f9 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    border: 1px solid #f5f5f5;
    width: 100%;
    border-radius: 10px;
    -webkit-transition: all ease 0.8s;
    transition: all ease 0.8s;
  }
}

.hiddenLabel {
  min-width: 200px;
}

.vselectsell {
  width: 180px;
}

.vinputsell {
  width: 200px;
}

.labelAlign {
  align-content: end;
}
</style>