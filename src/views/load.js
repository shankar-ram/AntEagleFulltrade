import React from "react";
import {css} from "@emotion/react";
import ScaleLoader  from 'react-spinners/ScaleLoader';
import CircleLoader from "react-spinners/CircleLoader";
import RingLoader from "react-spinners/RingLoader";

const loaderCSS = css`

display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20rem;
 
`;
class Load extends React.Component {
    render(){
        return(
        
        <ScaleLoader color="#7B308D" size={70} css={loaderCSS} />    

        );
    }

}
export default Load;