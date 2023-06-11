import React, { useState } from 'react'
import Nav from '../components/Nav';
import styles from "./Home.module.scss"
import AuthModal from '../components/AuthModal';
import { useCookies } from 'react-cookie';

const Home = () => {

  const [showModal, setShowModal] = useState(true)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken;
  const minimal = false;

  const handleClick = () => {
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload()
      return
  }
    setShowModal(true)
    setIsSignUp(true)
  }

  return (
    <div className={styles.overlay}>
      <Nav minimal={minimal} authToken={authToken} 
        setShowModal={setShowModal} showModal={showModal}
        setIsSignUp={setIsSignUp}
        />
        <div className={styles.home}>
          <h1 className='primary-title'>Swipe Right</h1>
          <button className='primary-button' onClick={handleClick}>
            {authToken ? 'Signout' : 'Create Account'}
          </button>
  
          {showModal && 
            <AuthModal isSignUp={isSignUp} setIsSignUp={setIsSignUp} setShowModal={setShowModal} />
          }
      </div>
    </div>
  )
}

export default Home