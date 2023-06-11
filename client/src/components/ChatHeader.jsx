import React from 'react'
import styles from "./ChatHeader.module.scss"
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const ChatHeader = ({ user }) => {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const navigate = useNavigate()

  const logOut = () => {
    removeCookie('UserId', cookies.UserId)
    removeCookie('AuthToken', cookies.AuthToken)
    navigate('/')
  }

  return (
    <div className={styles.chatHeader}>
        <div className={styles.profile}>
            <div className={styles.imgContainer}>
                <img src={user?.url} alt="user" />
            </div>
            <h3>{user?.first_name}</h3>
        </div>
        <button onClick={logOut} className="secondary-button">
          Logout
        </button>
    </div>
  )
}

export default ChatHeader