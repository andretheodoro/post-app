export const SET_POSTS = "SET_POSTS";
export const SET_SEARCH_KEYWORD = "SET_SEARCH_KEYWORD";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";

export interface IPost {
  id?: number | null;
  title: string;
  author: string;
  description: string;
  creation?: Date | null;
  update_date?: Date | null;
  idteacher: number;
}

export interface PostState {
  posts: IPost[];
  searchKeyword: string;
  loading: boolean;
  error: string | null;
}

interface SetPostsAction {
  type: typeof SET_POSTS;
  payload: IPost[];
}

interface SetSearchKeywordAction {
  type: typeof SET_SEARCH_KEYWORD;
  payload: string;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

interface AddPostAction {
  type: typeof ADD_POST;
  payload: IPost;
}

interface DeletePostAction {
  type: typeof DELETE_POST;
  payload: number;
}

interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: IPost;
}

export type PostActionTypes =
  | SetPostsAction
  | SetSearchKeywordAction
  | SetLoadingAction
  | SetErrorAction
  | AddPostAction
  | DeletePostAction
  | UpdatePostAction;
