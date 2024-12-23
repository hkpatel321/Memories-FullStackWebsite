import * as api from '../api';
import { FETCH_ALL,CREATE,UPDATE,DELETE,LIKE ,FETCH_BY_SEARCH,START_LOADING,END_LOADING,FETCH_POST,COMMENT} from '../constants/actionTypes';
export const getPost = (id) => async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
     
      const { data } = await api.fetchPost(id); 
     
      dispatch({
        type: FETCH_POST,
        payload: data,
      });
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log("Error fetching post:", error);
    }
  };
  
export const getPosts = (page) => async (dispatch) => {
    try {
         dispatch({type:START_LOADING});
        const { data } = await api.fetchPosts(page); 
        dispatch({
          type: FETCH_ALL,
          payload: {
            data: data.data,
            currentPage: data.currentPage,
            numberOfPages: data.numberOfPages
          }
        });
        dispatch({type:END_LOADING});
    } catch (error) {
        console.log(error);
    }
  };
  

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
    } catch (error) {
        console.error(error);
    }
};


export const createPost=(post,history)=>async(dispatch)=>{
    try {
        dispatch({type:START_LOADING});

        const {data}=await api.createPost(post);
        history.push(`/posts/${data._id}`);
        dispatch({type:CREATE,payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const updatePost=(id,post)=>async(dispatch)=>{
    try {
       const {data}= await api.updatePost(id,post);
       dispatch({type:UPDATE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const deletePost=(id)=>async(dispatch)=>{
    try {
      await api.deletePost(id);
      dispatch({type:DELETE,payload:id});
    } catch (error) {
        console.log(error);
    }
}

export const likePost=(id)=>async(dispatch)=>{
    try {
        const {data}=await api.likePost(id);
        dispatch({type:LIKE,payload:data});
    } catch (error) {
        console.log(error);
        
    }
}

export const commentPost=(value,id)=>async(dispatch)=>{
    try {
      const {data}=  await api.comment(value,id);
      dispatch({type:COMMENT,payload:data});
      return data.comments;
    } catch (error) {
        console.log(error);
    }
}