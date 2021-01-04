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
          ></b-form-input>
        </b-col>
      </b-row>
   </b-container>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import EventBus from '@/event-bus.ts';

//for data Validation:
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Validations } from "vuelidate-property-decorators";

@Component({
  components: {
    vSelect
  },
  mixins: [validationMixin]
})
export default class ShowSeller extends Vue {
  // PROP
  @Prop() alreadySelected!: any;
  @Prop() sellerKey!: any;

  // DATA

  //public allSelectedSellersData: any = this.alreadySelected;

  public sellers: any[] = [];

  public selectedId = this.alreadySelected[this.sellerKey];
  public percentage = this.alreadySelected[this.sellerKey].percentage;

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

  mounted() {
    const self = this;
    EventBus.$on('showSellersEvent', function(data: any) {
      self.checkSellersData();
    });
  }

  //METHODS
  public created() {
    this.getSellers();
  }

  public getSellers() {
    fetch('/api/seller')
      .then(res => res.json())
      .then(json => {
          this.sellers = json;
        }
      )
  }

  public sellerSelected(value: any) {
    console.log(value);
  }
  public addSellerRow() {
    console.log("Add Row");
  }

  public checkSellersData() {
    console.log("Bus works");
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
  width: 150px;
}
.vinputsell {
  width: 200px;
}
.labelAlign {
  align-content: end;
}
</style>