import {
  PostState,
  PostActionTypes,
  SET_POSTS,
  SET_SEARCH_KEYWORD,
  SET_LOADING,
  SET_ERROR,
  DELETE_POST,
} from "../../types/types";

const initialState: PostState = {
  posts: [],
  searchKeyword: "",
  loading: false,
  error: null,
};

export const postReducer = (
  state = initialState,
  action: PostActionTypes
): PostState => {
  switch (action.type) {
    case SET_POSTS:
      return { ...state, posts: action.payload };
    case SET_SEARCH_KEYWORD:
      return { ...state, searchKeyword: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};
