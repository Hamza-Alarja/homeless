import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 512" width="24" height="24">
    <path d="M264 48.5v-35c0-6.6-5.4-12-12-12h-67.5c-3.4 0-6.6 1.4-9 3.7-2.4 2.4-3.7 5.6-3.7 9v34.5H120c-22.1 0-40 17.9-40 40v51.5h-34V208h34v304h80V208h44.1l6.3-67.5H120V114c0-14.4 11.6-26 26-26h57V52c0-30.9 25.1-56 56-56h67.5c6.6 0 12 5.4 12 12z"/>
  </Svg>
  );
};

export default Icon;
