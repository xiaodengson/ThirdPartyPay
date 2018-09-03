/**
 * Created by dengfuming on 2018/8/8.
 */

import rootReducer from '../reducers';
import { createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

export default ()=>{
    // 根据 reducer 初始化 store
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    )

    return store;
};

