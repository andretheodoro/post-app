import {
  SET_POSTS,
  SET_SEARCH_KEYWORD,
  SET_LOADING,
  SET_ERROR,
  ADD_POST,
  DELETE_POST,
  PostActionTypes,
  IPost,
} from "../../types/types";

export const setPosts = (posts: IPost[]): PostActionTypes => ({
  type: SET_POSTS,
  payload: posts,
});

export const setSearchKeyword = (keyword: string): PostActionTypes => ({
  type: SET_SEARCH_KEYWORD,
  payload: keyword,
});

export const setLoading = (loading: boolean): PostActionTypes => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string | null): PostActionTypes => ({
  type: SET_ERROR,
  payload: error,
});

export const addPost = (post: IPost): PostActionTypes => ({
  type: ADD_POST,
  payload: post,
});

export const deletePost = (id: number): PostActionTypes => ({
  type: DELETE_POST,
  payload: id,
});
