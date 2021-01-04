/* VUE
-------------------------------------------------------------- */
import Vue from 'vue';

/* VUEX
-------------------------------------------------------------- */
import Vuex from 'vuex';

Vue.use(Vuex);

// main actions

export const setOrderDataAction = (context: any, orderDataAct: any) => {
  context.commit('SET_ORDER_DATA_ACTION', orderDataAct);
};

