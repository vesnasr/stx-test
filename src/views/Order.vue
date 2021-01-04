<template>
  <div class="order">
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <p>Order details</p>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>Order date:</p>
        </b-col>
        <b-col>
          <b-form-input
            v-model="orderData.date"
            type="date"
            placeholder="currentDate"
          ></b-form-input>
        </b-col>
        <b-col> </b-col>
      </b-row>
      <b-row>
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
            v-model="orderData.client"
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
            v-model="orderData.contact"
          ></v-select>
        </b-col>
        <b-col> </b-col>
      </b-row>
      <b-row>
        <b-col> </b-col>
        <b-col> </b-col>
        <b-col>
          <b-button variant="success" @click="checkOrderData">Save</b-button>
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
export default class Order extends Vue {
  // DATA
  public alertMessage: str = "Please complete all data!";
  public showAlert: bool = false;
  public sellers: any[] = [];
  public items: any[] = [];

  public orderData: any = {
    id: 0,
    date: "",
    client: {
      id: 0,
      name: ""
    },
    contact: {
      id: 0,
      name: ""
    },
    sellers: this.sellers,
    items: this.items
  };
  public clients: any[] = [];

  public contactOptions: any[] = [];

  // public contactsClientA: any[] = [
  //   { id: 1, name: "Contact A1" },
  //   { id: 2, name: "Contact A2" }
  // ];
  // public contactsClientB: any[] = [
  //   { id: 3, name: "Contact B1" },
  //   { id: 4, name: "Contact B2" }
  // ];

  public showCurrentDate: any = new Date();

  // COMPUTED
  @Validations()
  get validations() {
    return {
      orderData: {
        date: { required },
        client: {
          id: { required },
          name: { required }
        },
        contact: {
          id: { required },
          name: { required }
        }
      }
    };
  }

  //METHODS
  public created() {
    this.getClients();
    this.$store.dispatch("setOrderDataAction", this.orderData);
  }

  public getClients() {
    fetch("/api/client")
      .then(res => res.json())
      .then(json => {
        this.clients = json;
      });
  }
  public getContacts(clientId: any) {
    fetch("/api/client/" + clientId + "/contact")
      .then(res => res.json())
      .then(json => {
        this.contactOptions = [];
        this.contactOptions = json;
      });
  }

  public postOrder() {
    let processing: boolean = true;
    const data = this.orderData;
    fetch("/api/order", {
      method: "post",
      body: JSON.stringify(JSON.stringify(data))
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.orderData.id = data.id;
          alert(JSON.stringify("Order with id: " + data.id + " saved"));
        } else {
          alert(JSON.stringify("Error: " + data.message));
        }
        processing = false;
      });
  }
  public clientSelected(value: any) {
    console.log(value);
    console.log(this.orderData);
    this.orderData.contact = [];

    this.getContacts(this.orderData.client.id);

    //console.log(this.contactOptions);
  }
  public contactSelected(value: any) {
    console.log(value);
    //this.orderData.contact.id = value.id;
    //this.orderData.contact.name = value.name;
  }

  public checkOrderData() {
    //data verification:
    this.$v.$touch();
    if (this.$v.$invalid) {
      alert("Please complete all data!");
      return;
    }
    //set object in Store:
    this.$store.dispatch("setOrderDataAction", this.orderData);
    let ordData: any = this.$store.getters.getOrderDataAction;
    console.log(JSON.stringify(ordData));

    //Saving data:
    this.postOrder();
    //Order Details data are completed, checked and saved!
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
.vselect {
  min-width: 250px;
}
.labelAlign {
  align-content: end;
}
</style>