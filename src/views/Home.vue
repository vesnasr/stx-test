<template>
  <div class="home">
    <div>
      <b-jumbotron>
        <b-container class="bv-example-row">
          <b-row>
            <b-col cols="5">
              <Order></Order>
            </b-col>
            <b-col cols="7">
              <Sellers></Sellers>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <hr class="my-4" />
              <Items></Items>
            </b-col>
          </b-row>
        </b-container>
        <hr class="my-4" />
        <b-button variant="success" @click="checkData()">Finalize</b-button>
      </b-jumbotron>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import Order from "@/views/Order.vue";
import Sellers from "@/views/Sellers.vue";
import Items from "@/views/Items.vue";


@Component({
  components: {
    //HelloWorld,
    Order,
    Sellers,
    Items
  }
})
export default class Home extends Vue {
  // DATA

  //METHODS
  public checkData() {
    console.log("Finalize");
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
.container {
  max-width: 1460px;
}
.labelAlign {
  align-content: end ;
}
</style>