import {SET_INDEX} from "../actions/types";

const initialState = {
  index: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_INDEX:
      return {
        ...state,
        index: action.payload,
      };
    default:
      return state;
  }
}
