
import { combineReducers } from 'redux';

const INITIAL_STATE = {
    itemList: [],
  };

const WishItems = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload]
        case 'REMOVE':
           // return state.filter(cartItem => Item.id !== action.payload.id)
            return state.filter(wish => wish.key!=key);
    }

    return state
}


export default combineReducers({
    WishItems: WishItems
});