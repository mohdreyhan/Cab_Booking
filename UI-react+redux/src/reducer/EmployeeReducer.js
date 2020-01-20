import {
  CABREQUEST_MODAL,
  CAB_REQUESTINPUTS,
  CAB_REQUEST,
  DSPLAY_CARD,
  VIEWCAB_DETAILS
} from "../actions/Types";

const initialState = {
  modalShow: false,
  cabrequestInputs: [],
  reqSuccessMsg: "",
  carddata: [],
  viewcabs: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CABREQUEST_MODAL:
      return Object.assign({}, state, {
        modalShow: action.payload
      });
    case CAB_REQUESTINPUTS:
      return {
        ...state,
        cabrequestInputs: {
          ...state.cabrequestInputs,
          [action.payload.name]: action.payload.value
        }
      };
    case CAB_REQUEST:
      return Object.assign({}, state, {
        reqSuccessMsg: action.payload
      });
    case DSPLAY_CARD:
      return Object.assign({}, state, {
        carddata: action.payload
      });
    case VIEWCAB_DETAILS:
      return Object.assign({}, state, {
        viewcabs: action.payload
      });
    default:
      return state;
  }
};

export default reducer;
