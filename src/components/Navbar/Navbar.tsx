import React, { FunctionComponent, useState, Dispatch, SetStateAction } from 'react'
import { FaBookReader, FaBars } from 'react-icons/fa'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../Button/Button'
import classes from './Navbar.module.css'

type HomeProps = {
  setToggleSignupModal: Dispatch<SetStateAction<boolean>>
  setToggleLoginModal: Dispatch<SetStateAction<boolean>>
}

const Navbar: FunctionComponent<HomeProps> = ({ setToggleSignupModal, setToggleLoginModal }) => {
  const [openBurger, setOpenBurger] = useState<boolean>(false)

  const openSignupModal = () => {
    setToggleSignupModal((toggle) => !toggle)
    setOpenBurger(false)
  }

  const openLoginModal = () => {
    setToggleLoginModal((toggle) => !toggle)
    setOpenBurger(false)
  }

  const handleToggle = () => {
    setOpenBurger(!openBurger)
  }

  return (
    <nav className={classes.Navbar}>
      <FaBookReader size={30} color={'orange'} />
      <SearchBar />
      {!openBurger ? (
        <div className={classes.AuthLink}>
          <Button
            btnTypes="AuthBtn"
            disabled={undefined}
            sizes={''}
            type="button"
            dataTestId="open-signup-modal-btn"
            onClick={() => {
              openSignupModal()
            }}
          >
            Signup
          </Button>
          <Button
            btnTypes="AuthBtn"
            disabled={undefined}
            sizes={''}
            type="button"
            dataTestId="open-login-modal-btn"
            onClick={() => {
              openLoginModal()
            }}
          >
            Login
          </Button>
        </div>
      ) : (
        <div className={`${classes.AuthLink} ${classes.Active}`}>
          <Button btnTypes="AuthBtn" disabled={undefined} sizes={''} type="button" onClick={openSignupModal}>
            Signup
          </Button>
          <Button btnTypes="AuthBtn" disabled={undefined} sizes={''} type="button" onClick={openLoginModal}>
            Login
          </Button>
        </div>
      )}

      <button className={classes.Burger} onClick={handleToggle}>
        <FaBars size={20} color={'orange'} />
      </button>
    </nav>
  )
}
export default Navbar
