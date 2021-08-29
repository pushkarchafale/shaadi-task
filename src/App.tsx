import { Button, Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { Dispatch, SetStateAction } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import ValidateUser from './components/ValidateUser';
import useLoginState from './hooks/useLoginState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      height: '100%',
      padding: '0 30px',
    },
    loginBtn: {
      margin: '18px 0px',
      flexGrow: 1
    },
    navBar: {
      textAlign: 'right'
    }
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  let [isLoggedIn, setIsLoggedIn] = useLoginState(false);

  let handleLogout = () => {
    (setIsLoggedIn as Dispatch<SetStateAction<boolean>>)(false);
  }

  return (
    <Router>
      <Container className={classes.root} maxWidth="md">
        <div>
        <nav className={classes.navBar}>
          { isLoggedIn ? <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogout}>Logout</Button> : '' }
        </nav>
        <Switch>
          <Route path={'/*'}>
              <ValidateUser isLoggedIn={isLoggedIn as boolean} setIsLoggedIn={setIsLoggedIn as Dispatch<SetStateAction<boolean>>}></ValidateUser>
          </Route>
        </Switch>
      </div>
      </Container>
    </Router>
    
  );
}

export default App;
