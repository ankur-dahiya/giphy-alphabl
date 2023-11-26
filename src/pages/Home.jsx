import React, { useEffect, useState } from 'react'
import "./home.css";
import searchicon from "../images/search_icon.png";
import star from "../images/star.png";
import Pagination from '../components/Pagination';

function Home() {
    const ITEMS_PER_PAGE = 3;
    const [page,setPage] = useState(0);
    const [inpQuery,setInpQuery] = useState("");
    const [totalItems,setTotalItems] = useState(0);
    const [data,setData] = useState(null);
    // const data = [{
    //     image : "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     title : "this is gif",
    //     username : "ankur-dahiya"
    // },
    // {
    //     image : "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     title : "this is gif",
    //     username : "ankur-dahiya"
    // },
    // {
    //     image : "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     title : "this is gif",
    //     username : "ankur-dahiya"
    // },
    // {
    //     image : "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    //     title : "this is gif",
    //     username : "ankur-dahiya"
    // }]

    const handlePage = (page)=>{
        setPage(page);
    }

    const handleSearch = async (e)=>{
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=ccoDvbbewmH3QfACnciJHswHPoBWSyIC&q=${inpQuery}&limit=${ITEMS_PER_PAGE}&offset=${Math.max((page-1)*ITEMS_PER_PAGE,0)}&rating=g&lang=en&bundle=messaging_non_clips`)
        const resData = await response.json();
        setTotalItems(resData.pagination.total_count);
        setData(resData.data);
    }

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=ccoDvbbewmH3QfACnciJHswHPoBWSyIC&q=${inpQuery}&limit=${ITEMS_PER_PAGE}&offset=${Math.max((page-1)*ITEMS_PER_PAGE,0)}&rating=g&lang=en&bundle=messaging_non_clips`)
            const resData = await response.json();
            setData(resData.data);
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
            {data && <div className='result'>
                {data.map((item,index)=>
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