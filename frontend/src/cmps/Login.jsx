import React, { useState } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { login, signup } from '../actions/UserActions';
import Logo from '../assets/logo.png'


const Login = (props) => {

  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState('')
  const [loginCred, setLoginCred] = useState({ email: '', password: '' })
  const [signupCred, setSignupCred] = useState({ email: '', password: '', username:'' })


  const handleModal = (action) => {
    setOpen(action);
  };


  const loginHandleChange = ev => {
    console.log(ev.target.value);

    const { name, value } = ev.target;
    setLoginCred({ ...loginCred, [name]: value }
    );
  };

  const signupHandleChange = ev => {
    const { name, value } = ev.target;
    setSignupCred({ ...signupCred, [name]: value }
    );
  };

  const doLogin = async (ev) => {
    ev.preventDefault();
    const { email, password } = loginCred;
    if (!email || !password) {
      return setMsg('Please enter user/password');
    }
    const userCreds = { email, password };
    await props.login(userCreds);
    if (!props.loggedInUser) {
      setLoginCred({ email: '', password: '' })
      setMsg('Wrong Password Or Username');
    }

  };

  const doSignup = async (ev) => {
    ev.preventDefault();
    const { email, password, username } = signupCred;
    if (!email || !password || !username) {
      return setMsg('All inputs are required!');
    }
    const signupCreds = { email, password, username };
    props.signup(signupCreds);
    handleModal(false)
    setSignupCred({ email: '', password: '', username: '' });
  };


  let loginSection = (
    
    <form className="flex direction-column align-center" onSubmit={doLogin}>
      <div className="form-input">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField
              name="email"
              value={loginCred.email}
              onChange={loginHandleChange}

              id="input-with-icon-grid"
              label="Username"
              helperText={msg}
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <div className="form-input">
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <LockOpenIcon />
          </Grid>
          <Grid item>
            <TextField
              name="password"
              value={loginCred.password}
              onChange={loginHandleChange}

              id="input-with-icon-grid"
              label="Password"
              helperText={msg}
            />
          </Grid>
        </Grid>
      </div>
      <br />
      <Button variant="outlined" color="primary" onClick={doLogin}>
        Login
  </Button>
    </form>
  );

  let signupSection = (
    <React.Fragment>

      <Button variant="outlined" color="primary" onClick={() => handleModal(true)}>
        Signup
  </Button>



      <Dialog open={open} onClose={() => handleModal(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
        <DialogContent className="sign-up-section">
          <DialogContentText>
           Please enter A valid Username and Password.
          </DialogContentText>
        <form className="signup-form" onSubmit={doSignup}>
          <div className="form-input">
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item>
              </Grid>
              <Grid item>
                <TextField
                  name="email"
                  value={signupCred.email}
                  onChange={signupHandleChange}

                  id="input-with-icon-grid"
                  label="Email"
                  helperText={msg}
                />
              </Grid>
            </Grid>
          </div>
          <br />
          <div className="form-input">
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item>
              </Grid>
              <Grid item>
                <TextField
                  name="password"
                  value={signupCred.password}
                  onChange={signupHandleChange}

                  id="input-with-icon-grid"
                  label="Password"
                  helperText={msg}
                />
              </Grid>
            </Grid>
          </div>
          <div className="form-input">
            <Grid container spacing={3} alignItems="flex-end">
              <Grid item>
              </Grid>
              <Grid item>
                <TextField
                  name="username"
                  value={signupCred.username}
                  onChange={signupHandleChange}

                  id="input-with-icon-grid"
                  label="Username"
                  helperText={msg}
                />
              </Grid>
            </Grid>
          </div>
        
          <button>Signup</button>
        </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>

  );



  const { loggedInUser } = props;
  return (
    <div className="login flex align-center direction-column">
          <img className="logo" src={Logo} alt="logo"/>

      <h2>{loggedInUser && loggedInUser.username}</h2>
      {!loggedInUser && loginSection}
      {!loggedInUser && signupSection}
    </div>
  );

}

const mapStateToProps = state => {
  return {
    users: state.user.users,
    loggedInUser: state.user.loggedInUser,
    isLoading: state.system.isLoading
  };
};
const mapDispatchToProps = {
  login,
  signup
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
