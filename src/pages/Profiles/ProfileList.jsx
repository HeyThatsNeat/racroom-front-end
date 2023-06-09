// npm modules
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// services
import * as profileService from "../../services/profileService"

// components
import { ProfileSearchForm } from "../../components/SearchForm/SearchForm"

// css
import styles from "./Profiles.module.css"

import raccoonIcon from "../../assets/icons/raccoon.svg"

const ProfileList = () => {
  const [profileList, setProfileList] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileListData = await profileService.getAllProfiles()
      setProfileList(profileListData)
      setSearchResults(profileListData)
    }
    fetchProfiles()
  }, [])

  if (!profileList.length) {
    return (
      <main className={styles.container}>
        <h1>Loading...</h1>
      </main>
    )
  }

  const handleProfileSearch = (query) => {
    const filteredProfileResults = profileList.filter((profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase())
    )
    setSearchResults(filteredProfileResults)
  }

  return (
    <main className={styles.container}>
      <div className={`${styles.searchBarContainer} ${styles.center}`}>
        <h1>Hello. This is a list of all the profiles.</h1>
        <ProfileSearchForm handleProfileSearch={handleProfileSearch} />
        {<h2>{searchResults.length} results found</h2>}
      </div>
      <div className={styles.profilesContainer}>
        {searchResults.map((profile) => (
          <div className={styles.profileWrapper} key={profile._id}>
            <Link
              to={`/profiles/${profile._id}`}
              className={styles.profileItem}
            >
              <img
                src={profile.photo || raccoonIcon}
                alt="Profile"
                className={styles.profileImage}
              />
              <span className={styles.profileName}>{profile.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}

export default ProfileList
