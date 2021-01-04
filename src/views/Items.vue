<template>
  <div class="order">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <p>Items</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div>
            <generic-item
              v-for="(item, index) in itemsData"
              :key="index"
              :alreadySelected="itemsData"
              :itemKey="index"
            />
          </div>
          <div>
            <special-item></special-item>
          </div>
        </b-col>
        <!--<b-col>
          <b-form-input
            v-model="orderData.date"
            type="date"
            placeholder="currentDate"
          ></b-form-input>
        </b-col>
        <b-col> </b-col>-->
      </b-row>
      <!--<b-row>
        <b-col>
          <p>Client:</p>
        </b-col>
        <b-col>
          <v-select
            placeholder="Select client"
            id="idClient"
            label="name"
            class="vselect"
            :options="clients"
            @input="clientSelected"
          ></v-select>
        </b-col>
        <b-col> </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Contact:</p>
        </b-col>
        <b-col>
          <v-select
            placeholder="Select contact"
            id="idContact"
            label="name"
            class="vselect"
            :options="contactOptions"
            @input="contactSelected"
          ></v-select>
        </b-col>
        <b-col> </b-col>
      </b-row>-->
      <b-row>
        <b-col> </b-col>
        <b-col>
          <b-button variant="success" @click="addGeneric">+ Generic</b-button>
        </b-col>
        <b-col>
          <b-button variant="success" @click="addSpecial">+ Special</b-button>
        </b-col>
        <b-col>
          <b-button variant="success" @click="emitSaveItems">Save</b-button>
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

import GenericItem from "@/views/GenericItem.vue";
import SpecialItem from "@/views/SpecialItem.vue";

//for data Validation:
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { Validations } from "vuelidate-property-decorators";
import EventBus from "@/event-bus";

@Component({
  components: {
    vSelect,
    GenericItem,
    SpecialItem
  },
  mixins: [validationMixin]
})
export default class Items extends Vue {
  // DATA
  public itemsData: any[] = [
    {
      id: 0,
      type: "",
      productName: "",
      price: 0.0,
      amount: 0,
      delivery: "",
      comment: ""
    }
  ];

  // COMPUTED
  //@Validations()
  //get validations() {
  //   return {
  //     itemsData: {
  //       date: { required },
  //       client: {
  //         id: { required },
  //         name: { required }
  //       },
  //       contact: {
  //         id: { required },
  //         name: { required }
  //       }
  //     }
  //   };
  // }

  //METHODS
  public addGeneric() {
    this.itemsData.push({
      id: 0,
      type: "g",
      productName: "",
      price: 0.0,
      amount: 0,
      delivery: "",
      comment: ""
    });
    console.log("Add Generic Row");
  }
  public addSpecial() {
    this.itemsData.push({
      id: 0,
      type: "s",
      productName: "",
      price: 0.0,
      amount: 0,
      delivery: "",
      comment: ""
    });
    console.log("Add Special Row");
  }

  public emitSaveItems() {
    console.log("save clicked");
    //EventBus.$emit('showItemsEvent');
  }
  //   public clientSelected(value: any) {
  //     console.log(value);
  //     console.log(this.orderData);
  //     this.contactOptions = [];
  //     this.orderData.client.name = value.name;
  //     this.orderData.client.id = value.id;
  //
  //     if (value.id === 1) {
  //       this.contactOptions = this.contactsClientA;
  //     } else if (value.id === 2) {
  //       this.contactOptions = this.contactsClientB;
  //     }
  //     console.log(this.contactOptions);
  //   }
  //   public contactSelected(value: any) {
  //     console.log(value);
  //     this.orderData.contact.id = value.id;
  //     this.orderData.contact.name = value.name;
  //   }
  //   public getContactOptions() {
  //     console.log("");
  //   }
  //
  //   public checkOrderData() {
  //     console.log("Check order data");
  //     this.$v.$touch();
  //     if (this.$v.$invalid) {
  //       alert("Please complete all data!");
  //       return;
  //     }
  //     //this.showAlert = true;
  //     alert("Order Details data are completed. Go to Save Order Details data...");
  //   }
  // }
  public addGeneric() {
    console.log("Add generic item");
  }

  public addSpecial() {
    console.log("Add special item");
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
.vselect {
  min-width: 250px;
}
.labelAlign {
  align-content: end;
}
</style>