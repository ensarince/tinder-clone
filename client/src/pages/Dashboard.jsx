import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.scss"
import ChatContainer from '../components/ChatContainer'
import TinderCard from 'react-tinder-card'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Dashboard = () => {

  const [user, setUser] = useState(null)
  const [genderedUsers, setGenderedUsers] = useState([])
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const userId = cookies.UserId


  const getUser = async () => {
      try {
          const response = await axios.get('http://localhost:8080/user', {
              params: {userId}
          })
          setUser(response.data)
      } catch (error) {
          console.log(error)
      }
  }

  const getGenderedUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/gendered-users', {
            params: {gender: user?.gender_interest}
        })
        setGenderedUsers(response.data)
    } catch (error) {
        console.log(error)
    }
}

  const updateMatches = async(matchedUserId) => {
    try {
      const response = await axios.put('http://localhost:8080/addmatch', {
        userId,
        matchedUserId
    })

    getUser()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUser()

  }, [])

  useEffect(() => {
    if (user) {
        getGenderedUsers()
    }
  }, [user])


  const [lastDirection, setLastDirection] = useState()

  const swiped = (direction, swipedUserId) => {
    if(direction === 'right'){
      updateMatches(swipedUserId)
    }
    setLastDirection(direction)
  }

  const outOfFrame = () => {
    console.log(user.first_name + ' left the screen!')
  }

  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)
  const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds.includes(genderedUser.user_id))

  return (
    <>
    {user && 
      <div className={styles.dashboard}>
        <ChatContainer user={user}/>
        <div className={styles.swipeContainer}>
          <div className={styles.cardContainer}>
            {filteredGenderedUsers?.map((character) =>
              <TinderCard className={styles.swipe} key={character.user_id} onSwipe={(dir) => swiped(dir, character.user_id)} 
                onCardLeftScreen={() => outOfFrame(character.first_name)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className={styles.card}>
                  <h3>{character.first_name}</h3>
                </div>
              </TinderCard>
            )}
            <div className={styles.swipeInfo}>
              {lastDirection && <p>You swiped {lastDirection}</p>}
            </div>
          </div>
        </div>
      </div>
    }
  </>
  )
}

export default Dashboard