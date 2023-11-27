import { useState } from "react";
import postContext from "./postContext";
import { ITEMS_PER_PAGE } from "../../../utility/constants";

const PostState = (props) => {
  const api_key = process.env.REACT_APP_API;

  // search gifs by query
  const fetchSearchPost = async (inpQuery, page) => {
    setLoading(true);
    try {
      setPostState([]);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${inpQuery}&limit=${ITEMS_PER_PAGE}&offset=${Math.max(
          (page - 1) * ITEMS_PER_PAGE,
          0
        )}&rating=g&lang=en&bundle=messaging_non_clips`
      );
      const resData = await response.json();
      setPostState(resData.data);
      setTotalItems(resData.pagination.total_count);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  // get trending gifs
  const fetchTrendingPost = async (page) => {
    setLoading(true);
    try {
      setPostState([]);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=${ITEMS_PER_PAGE}&offset=${Math.max(
          (page - 1) * ITEMS_PER_PAGE,0)}&rating=g&bundle=messaging_non_clips`
      );
      const resData = await response.json();
      setPostState(resData.data);
      setTotalItems(resData.pagination.total_count);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const [postState, setPostState] = useState([]); // posts per page
  const [totalItems, setTotalItems] = useState(0); //total post count
  const [loading, setLoading] = useState(false); //loading state

  return (
    <postContext.Provider
      value={{
        postState,
        totalItems,
        fetchSearchPost,
        fetchTrendingPost,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </postContext.Provider>
  );
};

export default PostState;
