import { VIEW_REQUESTS ,APPROVE_REJECT} from "../actions/Types";

const initialState = {
  viewRequests: [],
  status : ""
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

    default:
      return state;
  }
};

export default reducer;
