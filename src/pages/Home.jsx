import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import searchicon from "../images/search_icon.png";
import star from "../images/star.png";
import Pagination from "../components/Pagination";
import postContext from "../components/context/post/postContext";
import userContext from "../components/context/user/userContext";
import { Navigate } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../utility/constants";
import { Loader } from "@giphy/react-components";

function Home() {
  const { loading, setLoading } = useContext(postContext);
  const { userState } = useContext(userContext);
  const { postState, totalItems, fetchSearchPost, fetchTrendingPost } =
    useContext(postContext);
  const [page, setPage] = useState(1);
  const [inpQuery, setInpQuery] = useState("");

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSearch = async (e) => {
    setLoading(true);
    await fetchSearchPost(inpQuery, page);
    setPage(1);
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (inpQuery) {
        await fetchSearchPost(inpQuery, page);
      } else {
        await fetchTrendingPost(page);
      }
      setLoading(false);
    })();
  }, [page]);

  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          {!userState && <Navigate to="/login"></Navigate>}
          <div className="home">
            <div className="searchbox">
              <div className="inpbox">
                <img src={searchicon}></img>
                <input
                  type="text"
                  placeholder="Article name or keywords..."
                  value={inpQuery}
                  onChange={(e) => setInpQuery(e.target.value)}
                ></input>
              </div>
              <button onClick={(e) => handleSearch(e)}>Search</button>
            </div>
            {postState && (
              <div className="result">
                {postState.map((item, index) => (
                  <div key={index} className="card">
                    <img
                      className="card-img"
                      src={item.images.fixed_height.url}
                    />
                    <div className="card-desc">
                      <div className="text-desc">
                        <p className="title">{item.title}</p>
                        <p className="username">@{item.username}</p>
                      </div>
                      {/* <img className="fav-img" src={star} /> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {totalItems > ITEMS_PER_PAGE ? (
              <div>
                <Pagination
                  page={page}
                  handlePage={handlePage}
                  totalItems={totalItems}
                ></Pagination>
              </div>
            ) : (
              <div className="noquery">search something, it's free!! :D</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
