import React from 'react'
import Logo from './Logo'
import styles from "../styles/Loading.module.css";
function LoadingScreen() {
  return (
    <div style={{position:'fixed', width:'100vw', height:'100vh', backgroundColor:'black', zIndex:999, display:'flex', flexDirection:'column',alignItems:'center', justifyContent:'center'}}>
        <div className={styles.loadingLogo}>
            <Logo />
           
        </div>
        <h1 style={{position:'fixed', bottom:'100px', fontFamily:'sans-serif'}}>Loading....</h1>
    </div>
  )
}

export default LoadingScreen