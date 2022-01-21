import { useEffect, useState } from "react"
import Footer from "../Components/Footer"
import Header from "../Components/Header"

const Layout = ({children}) => {
    const getWindowWidth = ()=>{
        const width = window.innerWidth
        return{width}
    }
    const[windowInnerWidth,setWindoInnerWidth]=useState(getWindowWidth())
    const hendleResize=()=>{
        setWindoInnerWidth(getWindowWidth())
    }
    useEffect(()=>{
        hendleResize()
        window.addEventListener("resize",hendleResize)
        return windowInnerWidth
        
    },[])
    console.log(windowInnerWidth);
    return (
        <div>
            <Header/>
            {children}
            {windowInnerWidth.width> 600 ? <Footer/> : null}
        </div>
      );
}
 
export default Layout;