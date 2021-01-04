import { SET_ORDER_DATA_ACTION } from "./types";

export default {
  [SET_ORDER_DATA_ACTION](state: { orderDataAction: any }, orderDataAct: any) {
    state.orderDataAction = orderDataAct;
  }
};
