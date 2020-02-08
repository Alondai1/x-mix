import React from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import Logo from '../assets/logo.png'
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import Fab from '@material-ui/core/Fab';
import EqualizerIcon from '@material-ui/icons/Equalizer';



const UserPage = ({ loggedInUser, logout }) => {

    const wins = loggedInUser.wins
    return (

        <div className='user-page'>
            <img className="logo" src={Logo} alt="logo" />

            <IconButton className="logout-btn" aria-label="delete" onClick={logout}>
                <ExitToAppIcon />
            </IconButton>

            <div>
                <h1>Hello {loggedInUser.username}</h1>
                {wins.length &&
                    <p>
                        Last Win   :
                    <Moment fromNow>{wins[wins.length-1]}</Moment>
                    </p>
                }

                <h2>wins: {loggedInUser.wins.length}</h2>
            </div>

            <div className="play-icons flex">
                <div>
                    <h1 className="play-icons-text">Multi-Player</h1>
                    <Link to="/multi">
                        <GroupIcon style={{ fontSize: 80 }}></GroupIcon>
                    </Link>
                </div>
                <div>
                    <h1 className="play-icons-text">Single-Player</h1>
                    <Link to="/game">
                        <PersonIcon style={{ fontSize: 80 }}></PersonIcon>
                    </Link>

                </div>

            </div>
            <div className="stats-btn">
                <Link to="/stats">
                    <Fab size="small" color="secondary" aria-label="add" >
                        <EqualizerIcon />
                    </Fab>
                </Link>
            </div>

        </div>

    )
}

export default UserPage
