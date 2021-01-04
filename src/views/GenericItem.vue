<template>
  <div class="sellers">
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="1">
          <p>Product:</p>
        </b-col>
        <b-col cols="2">
          <v-select
            placeholder="Select product"
            id="idProduct"
            label="name"
            class="vselectsell"
            :options="products"
            @input="productSelected"
            v-model="selectedId"
          ></v-select>
        </b-col>
        <b-col cols="1">
          <p>Price:</p>
        </b-col>
        <b-col cols="2">
          <b-form-input
            v-model="price"
            type="number"
            class="vinputsell"
            placeholder="Select"
          ></b-form-input>
        </b-col>
        <b-col cols="1">
          <p>Amount:</p>
        </b-col>
        <b-col cols="2">
          <b-form-input
            v-model="amount"
            type="number"
            class="vinputsell"
            placeholder="Select"
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-button variant="success" @click="deleteItem">Delete</b-button>
          <b-button variant="success" @click="saveItem">Save</b-button>
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
export default class GenericItem extends Vue {
  // PROP
  @Prop() alreadySelected!: any;
  @Prop() itemKey!: any;

  // DATA

  //public allSelectedSellersData: any = this.alreadySelected;

  public products: any[] = [];

  public selectedId = this.alreadySelected[this.itemKey];
  public price = this.alreadySelected[this.itemKey].price;
  public amount = this.alreadySelected[this.itemKey].amount;

  // COMPUTED
  @Validations()
  get validations() {
    return {
      itemData: {
        id: {},
        name: { required },
        price: { required },
        amount: { required }
      }
    };
  }
  //METHODS
  public created() {
    this.getProducts();
  }

  public getProducts() {
    fetch("/api/product")
      .then(res => res.json())
      .then(json => {
        this.products = json;
      });
  }

  public productSelected(value: any) {
    console.log(value);
  }
  public addSellerRow() {
    console.log("Add Row");
  }

  public checkItemData() {
    console.log("Bus works");
  }
  public saveItem() {
    //data verification:
    this.$v.$touch();
    if (this.$v.$invalid) {
      alert("Please complete all data!");
      return;
    }
    alert()
    ///...save item...
  }
  public deleteItem() {
    console.log("delete");
    ///...delete item...
  }
}
</script>

<style lang="scss" scoped>
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
  width: 80px;
}
.labelAlign {
  align-content: end;
}
</style>