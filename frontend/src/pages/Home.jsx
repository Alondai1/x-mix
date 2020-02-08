import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/UserActions';
import Login from '../cmps/Login'
import UserPage from '../cmps/UserPage'

// import { loadReviews, addReview } from '../actions/ReviewActions.js';
// import { loadUsers } from '../actions/UserActions.js';
// import { Link } from 'react-router-dom';

const Home = ({ loggedInUser, logout }) => {


  useEffect(() => {
  }, [])


  return (
    <div className="home-page flex direction-column align-center">
      {
        loggedInUser ? (<UserPage loggedInUser={loggedInUser} logout={logout}></UserPage>
        ) : (<Login></Login>)
      }

    </div>
  )

}

const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  logout

};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
