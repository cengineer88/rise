import { useContext } from "react";
import HeaderContext from "../contexts/header";

const useHeader = () => useContext(HeaderContext);

export default useHeader;
