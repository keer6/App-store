import {
  createStore
} from 'redux';


const defaultState = {
  searchText: ''
}

const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH_QUERY':
      // 触发搜索框值改变的方法
      const newState = JSON.parse(JSON.stringify(state))
      newState.searchText = action.value
      return newState
    default:
      return state;
  }
}


const store = createStore(rootReducer)

export default store;