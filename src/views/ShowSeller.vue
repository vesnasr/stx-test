<template>
  <div class="sellers">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <p>Seller:</p>
        </b-col>
        <b-col>
          <v-select
              placeholder="Select seller"
              id="idSeller"
              label="name"
              class="vselectsell"
              :options="sellers"
              @input="sellerSelected"
              v-model="selectedId"
          ></v-select>
        </b-col>
        <b-col>
          <p>%:</p>
        </b-col>
        <b-col>
          <b-form-input
              v-model="percentage"
              type="number"
              class="vinputsell"
              min="0.01"
              max="100"
              placeholder="%"
              @change="addPercentage"
          ></b-form-input>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import EventBus from '@/event-bus.ts';

//for data Validation:
import {validationMixin} from "vuelidate";
import {required} from "vuelidate/lib/validators";
import {Validations} from "vuelidate-property-decorators";

@Component({
  components: {
    vSelect
  },
  mixins: [validationMixin]
})
export default class ShowSeller extends Vue {
  // PROP
  @Prop() alreadySelectedSellers!: any[];
  @Prop() allSellers!: any[];
  @Prop() sellerKey!: any;

  // DATA
  public sellers: any[] = [];
  public orderData: any = [];
  public selectedId = this.alreadySelectedSellers[this.sellerKey];
  public percentage = this.alreadySelectedSellers[this.sellerKey].percentage;

  // COMPUTED
  @Validations()
  get validations() {
    return {
      sellersData: {
        id: {required},
        name: {required},
        percentage: {required}
      }
    };
  }

  //METHODS
  public created() {
    this.orderData = this.$store.getters.getOrderDataAction;

    // Removes already selected from list
    for (const sellerToCheckIndex in this.allSellers) {
      let founded = false;
      for (const oneOfAlreadySelectedIndex in this.alreadySelectedSellers) {
        if (this.allSellers[sellerToCheckIndex].id == this.alreadySelectedSellers[oneOfAlreadySelectedIndex].id) {
          founded = true;
        }
      }
      if (!founded) {
        this.sellers.push(this.allSellers[sellerToCheckIndex]);
      }
    }
  }

  public sellerSelected(value: any) {
    console.log(value);
    this.orderData.sellers[this.sellerKey] = value;
    this.$store.dispatch("setOrderDataAction", this.orderData);
  }

  public addPercentage(value: any) {
    this.orderData.sellers[this.sellerKey].percentage = value;
    this.$store.dispatch("setOrderDataAction", this.orderData);
  }

  public checkSellersData() {
    console.log("Bus works");
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
  width: 150px;
}

.vinputsell {
  width: 200px;
}

.labelAlign {
  align-content: end;
}
</style>