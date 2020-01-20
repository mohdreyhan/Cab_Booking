import {
  VIEW_REQUESTS,
  APPROVE_REJECT,
  ADDCAB_INPUTS,
  ADDCAB_SUCCESS,
  MASTER_CABDETAILS,
  UPDATE_MASTERCABS,
  UPDATECAB_INPUTS,
  DELETE_CABSUCC,
  ASSIGNCAB_INPUTS,
  ASSIGNCAB_SUCC,
  SAMPLE_ACTION
} from "../actions/Types";

const initialState = {
  viewRequests: [],
  status: "",
  addcab_Inputs: [],
  addcabSucMsg: "",
  cabdetails: [],
  updatedcabdetails: [],
  updatecab_Inputs: [],
  updatesuccMsg: "",
  deletesuccMsg: "",
  assigncab_inputs: [],
  assigncabsuccMsg: "",
  SAMPLE_ACTION_Inputs: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_REQUESTS:
      return Object.assign({}, state, {
        viewRequests: action.payload
      });
    case APPROVE_REJECT:
      return Object.assign({}, state, {
        status: action.payload
      });
    case ADDCAB_INPUTS:
      return {
        ...state,
        addcab_Inputs: {
          ...state.addcab_Inputs,
          [action.payload.name]: action.payload.value
        }
      };
    case ADDCAB_SUCCESS:
      return Object.assign({}, state, {
        addcabSucMsg: action.payload
      });
    case MASTER_CABDETAILS:
      return Object.assign({}, state, {
        cabdetails: action.payload
      });
    case UPDATECAB_INPUTS:
      console.log("action.payload.value",action.payload.value)
      return {
        ...state,
        updatecab_Inputs: {
          ...state.updatecab_Inputs,
          [action.payload.name]: action.payload.value
        }
      };
    case UPDATE_MASTERCABS:
      return Object.assign({}, state, {
        updatesuccMsg: action.payload
      });
    case DELETE_CABSUCC:
      return Object.assign({}, state, {
        deletesuccMsg: action.payload
      });
    case ASSIGNCAB_INPUTS:
      return {
        ...state,
        assigncab_inputs: {
          ...state.assigncab_inputs,
          [action.payload.name]: action.payload.value
        }
      };

    case ASSIGNCAB_SUCC:
      return Object.assign({}, state, {
        assigncabsuccMsg: action.payload
      });

    default:
      return state;
  }
};

export default reducer;
