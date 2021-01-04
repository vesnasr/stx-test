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
            v-for="(seller, index) in sellersData"
            :key="index"
            :alreadySelected="sellersData"
            :sellerKey="index"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col><hr class="my-4"/></b-col>
      </b-row>
      <b-row>
        <b-col> </b-col>
        <b-col>
          <b-button variant="success" @click="addSellerRow">+ Seller</b-button>
          <b-button variant="success" @click="emitSaveSellers">Save</b-button>
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

import EventBus from '@/event-bus.ts';

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
  //public alertMessage: string = "Please complete all data!";
  //public showAlert: boolean = false;

  public sellersData: any[] = [{ id: 0, name: "", percentage: 0.00 }];

  // public sellers: any[] = [
  //   { id: 1, name: "Seller A" },
  //   { id: 2, name: "Seller B" },
  //   { id: 3, name: "Seller C" }
  // ];

  // COMPUTED
  @Validations()
  get validations() {
    // return {
    //   sellersData: {
    //     id: { required },
    //     name: { required },
    //     percentage: { required }
    //   }
    // };
  }

  //METHODS

  public sellerSelected(value: any) {
    console.log(value);
  }
  public addSellerRow() {
    this.sellersData.push({ id: 0, name: "", percentage: 0.00 });
    console.log("Add Row");
  }

  public emitSaveSellers() {
    console.log('save clicked');
    EventBus.$emit('showSellersEvent');
  }
  // this.$v.$touch();
  // if (this.$v.$invalid) {
  //   alert("Please complete all data!");
  //   return;
  // }
  // //this.showAlert = true;
  // alert("Order Details data are completed. Go to Save Order Details data...");
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