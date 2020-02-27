import {FETCH_SHORTEN_SUCCESS} from "./actions";

const initialState = {
    link: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SHORTEN_SUCCESS:
            return {...state, link: action.link};
        default:
            return state
    }
};

export default reducer