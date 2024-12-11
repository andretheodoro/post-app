// import { createStore } from "redux";
// import { postReducer } from "./postReducer";

// const store = createStore(postReducer);

// export default store;
import { createStore, combineReducers } from "redux";
import { postReducer } from "./postReducer";
// Combine reducers (se houver mais de um)
const rootReducer = combineReducers({
  posts: postReducer,
});

// Defina o tipo de RootState a partir da store
export type RootState = ReturnType<typeof rootReducer>;

// Crie a store
const store = createStore(rootReducer);

export default store;
