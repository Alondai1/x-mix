import UserService from '../services/UserService';
import { loading, doneLoading } from './SystemActions';


export function login(userCreds) {
  return async dispatch => {
    try{
      const user = await UserService.login(userCreds);
      dispatch(setUser(user));
    }

    catch(err){
      // history.push('/login');
    }
  };
}
export function signup(userCreds) {
  return async dispatch => {
    const user = await UserService.signup(userCreds);
    dispatch(setUser(user));
  };
}
export function updateUser(newUser) {
  return async dispatch => {
    UserService.update(newUser);
    dispatch(setUser(newUser));
  };
}
export function logout() {
  return async dispatch => {
    await UserService.logout();
    dispatch(setUser(null));
  };
}

export function setUser(user) {
  return {
    type: 'SET_USER',
    user
  };
}



// function _removeUser(userId) {
//   return {
//     type: 'USER_REMOVE',
//     userId
//   };
// }



// export function removeUser(userId) {
//     return async dispatch => {
//       try {
//         await UserService.remove(userId);
//         dispatch(_removeUser(userId));
//       } catch (err) {
//         console.log('UserActions: err in removeUser', err);
//       }
//     };
//   }



  export function loadUsers(filterBy = {}) {
    
    return async dispatch => {
      try {
        dispatch(loading());
        
        const users = await UserService.getUsers(filterBy);
        
        dispatch(setUsers(users));
      } catch (err) {
        console.log('UserActions: err in loadUsers', err);
        // example for rerouting - after changing the store
      } finally {
        dispatch(doneLoading());
      }
    };
  }


  function setUsers(users) {
    return {
      type: 'SET_USERS',
      users
    };
  }