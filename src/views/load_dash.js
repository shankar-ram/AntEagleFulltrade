import React from "react";
import {css} from "@emotion/react";
import ScaleLoader  from 'react-spinners/ScaleLoader';
import CircleLoader from "react-spinners/CircleLoader";
import RingLoader from "react-spinners/RingLoader";

const loaderCSS = css`

position:absolute;
margin-top:12.5rem; 
margin-left:25rem;  
  
 
`;
class LoadDash extends React.Component {
    render(){
        return(
        
        <ScaleLoader color="#7B308D" size={70} css={loaderCSS} />    

        );
    }

}
export default LoadDash;