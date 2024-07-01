import React from 'react'
import loaderImg from "../../assets/loader.gif"
import ReactDOM from 'react-dom'

function Loader() {
  return  ReactDOM.createPortal (
    <div className="wrapper"><div className="loader"><img src={loaderImg} alt="" /></div></div>,
    document.getElementById("loader")
  )
};

export const SpinnerImg = () => {
    return (
      <div className="--center-all">
        <img src={loaderImg} alt="Loading..." />
      </div>
    );
  };
export default Loader