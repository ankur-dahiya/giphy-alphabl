import React, { useContext, useEffect, useState } from 'react'
import "./home.css";
import searchicon from "../images/search_icon.png";
import star from "../images/star.png";
import Pagination from '../components/Pagination';
import postContext from '../components/context/post/postContext';

function Home() {
    const {postState,totalItems,fetchSearchPost} = useContext(postContext);
    const ITEMS_PER_PAGE = 3;
    const [page,setPage] = useState(0);
    const [inpQuery,setInpQuery] = useState("");

    const handlePage = (page)=>{
        setPage(page);
    }

    const handleSearch = async (e)=>{
        await fetchSearchPost(inpQuery,ITEMS_PER_PAGE,page);
        setPage(1);
        console.log(postState);
    }

    useEffect(()=>{
        (async ()=>{
            await fetchSearchPost(inpQuery,ITEMS_PER_PAGE,page);
        })()
    },[page])
    
  return (
    <div className='home'>
            <div className='searchbox'>
                <div className='inpbox'>
                    <img src={searchicon}></img>
                    <input type='text' placeholder='Article name or keywords...' value={inpQuery} onChange={(e)=>setInpQuery(e.target.value)}></input>
                </div>
                <button onClick={e=>handleSearch(e)}>Search</button>
            </div>
            {postState && <div className='result'>
                {postState.map((item,index)=>
                <div key={index} className='card'>
                <img className='card-img' src={item.images.fixed_height.url}/>
                <div className='card-desc'>
                    <div className='text-desc'>
                        <p className='title'>{item.title}</p>
                        <p className='username'>@{item.username}</p>
                    </div>
                    <img className='fav-img' src={star}/>
                </div>
            </div>
                )}
            </div>}
            <div>
                <Pagination page={page} handlePage={handlePage} totalItems={totalItems}></Pagination>
            </div>
    </div>
  )
}

export default Home