import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadUsers } from '../actions/UserActions'
import Logo from '../assets/logo.png'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from 'react-moment';





const Stats = ({ loggedInUser, loadUsers, isLoading, topUsers }) => {


    useEffect(() => {
        loadUsers({ top: 3 })
    }, [])

    return (
        <div className="stats-page">
            <Link to="/">
            <img className="logo" src={Logo} alt="logo" />
            </Link>

            {
                isLoading ? <div className="loading">
                    Loading...
                </div> : <React.Fragment>


                <div className="top-players">
                <h1>Top Players</h1>
                {
                   <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>User Name</TableCell>
                                    <TableCell align="right">Wins</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {topUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell component="th" scope="row">
                                            {user.username}
                                        </TableCell>
                                        <TableCell align="right">{user.wins.length}</TableCell>
                                        <TableCell align="right">{user.email}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
            <div className="user-stats">
                <h1>{loggedInUser.username}</h1>
                {
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Last Login</TableCell>
                                    <TableCell >Wins</TableCell>
                                    <TableCell >Loses</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow >
                                    <TableCell component="th" scope="row">
                                        <Moment fromNow>{loggedInUser.lastLogin[1]}</Moment>
                                    </TableCell>
                                    <TableCell >{loggedInUser.wins.length}</TableCell>
                                    <TableCell >{loggedInUser.loses.length}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </div>
                </React.Fragment>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser,
        isLoading: state.system.isLoading,
        topUsers: state.user.users
    };
};
const mapDispatchToProps = {

    loadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
