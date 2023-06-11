import React from 'react'
import styles from "./Nav.module.scss"
import logo_white from "../assets/tinder_logo_white.png"
import logo_color from "../assets/color-logo-tinder.png"

const Nav = ({ authToken, minimal, setShowModal, showModal, setIsSignUp }) => {

  const handleClick = () => {
    setShowModal(true)
    setIsSignUp(false)
  }

  return (
    <div className={styles.nav}>
        <div className={styles.logoContainer}>
            <img src={minimal ? logo_color : logo_white} className={styles.logo} alt="" />
        </div>
        {!authToken && !minimal && 
          <button onClick={handleClick} disabled={showModal}  className='nav-button'>Log in</button>
        }
    </div>
  )
}

export default Nav