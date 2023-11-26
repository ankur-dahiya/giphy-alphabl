import { useState } from "react";
import postContext from "./postContext";

const PostState = (props)=>{
  const fetchSearchPost = async (inpQuery,ITEMS_PER_PAGE,page)=>{
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=ccoDvbbewmH3QfACnciJHswHPoBWSyIC&q=${inpQuery}&limit=${ITEMS_PER_PAGE}&offset=${Math.max((page-1)*ITEMS_PER_PAGE,0)}&rating=g&lang=en&bundle=messaging_non_clips`)
    const resData = await response.json();
    console.log(resData);
    setPostState(resData.data);
    setTotalItems(resData.pagination.total_count);
  }

  const [postState,setPostState] = useState([]);
  const [totalItems,setTotalItems] = useState(0);

    return (
        <postContext.Provider value={{postState,totalItems,fetchSearchPost}}>
        {props.children}
        </postContext.Provider>
    );
}

export default PostState;