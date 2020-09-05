import React, {useState} from 'react';
import { useStyles } from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import PeopleIcon from '@material-ui/icons/People';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, FormControlLabel, Switch, Fade } from '@material-ui/core';
import {db, auth} from '../../firebase'
import firebase from 'firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';

export default function NavBar({isUser, setOpenList, openList}) {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState({open: false, sign: ''})
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorPassword, setErrorPassword] = useState({error: false, text: ''})
  const [errorEmail, setErrorEmail] = useState({error: false, text: ''})
  const [loading, setLoading] = useState(false)
  const [checkboxHandle, setCheckboxHandle] = useState(true)


  const handleAuth = () => {
    setLoading(true)
    if(dialogOpen.sign === 'up'){
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        db.collection('users').doc(user.user.uid).set({email: email})
        setLoading(false)
        setEmail('')
        setPassword('')
        setDialogOpen(false)
      })
      .catch(e => {
        setLoading(false)
            switch(e.code){
              case "auth/weak-password":
                setErrorPassword({error: true, text: 'Password must have at least 6 characteres'})
                break;
              case "auth/email-already-in-use":
                setErrorEmail({error: true, text: 'Email already in use'})
                break;
              default:
                alert(e.message)
            }
      })
    } else {
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => {
            setEmail('')
            setPassword('')
            setLoading(false)
            setDialogOpen(false)
          }).catch((e) => {
            setLoading(false)
            switch(e.code){
              case "auth/wrong-password":
                setErrorPassword({error: true, text: 'Incorrect password'})
                break;
              case ("auth/user-not-found"):
                setErrorEmail({error: true, text: 'User not found'})
                break;
              case 'auth/invalid-email':
                setErrorEmail({error: true, text: 'User not found'})
                break;
              default:
                alert(e.message)
              }
          })
    }
  }

  const handleLogout = (e) => {
    auth.signOut()
    setCheckboxHandle(!checkboxHandle)
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEmail(''); 
    setPassword('')
    setErrorPassword({error: false})
    setErrorEmail({error: false})
    setLoading(false)
  }


  return (
    <div className={classes.root}>
      <AppBar className={classes.header} position="static">
        <Toolbar>
          {isUser && (
          <IconButton onClick={() => setOpenList(!openList)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            NALA
          </Typography>
          {
            !isUser
            ? (
              <>
                <Button color="inherit" onClick={() => setDialogOpen({open: true, sign: 'in'})}>Login</Button>
                <Button color="inherit" onClick={() => setDialogOpen({open: true, sign: 'up'})}>Signup</Button>
              </>
            )
            : (
              <>
                <Link to="/">
                  <IconButton>
                      <HomeIcon style={{color: 'white'}} />
                  </IconButton>
                </Link>
                <Link to="/organigram">
                  <IconButton>
                      <PeopleIcon style={{color: 'white'}} />
                  </IconButton>
                </Link>
                <FormControlLabel checked={checkboxHandle} control={<Switch onChange={handleLogout} name="checkedA" />} label="Logout"  />
              </>
            )
            
          }
        </Toolbar>
      </AppBar>



      <Dialog open={dialogOpen.open} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign {dialogOpen.sign === 'up' ? 'Up' : 'In'} to can see your excels!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label='Email adress'
            onChange={(e) => {setEmail(e.target.value); setErrorEmail({error: false})}}
            value={email}
            type="email"
            fullWidth
            error={errorEmail.error}
            helperText={errorEmail.error ? errorEmail.text : ''}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={(e) => {setPassword(e.target.value); setErrorPassword(false)}}
            value={password}
            error={errorPassword.error}
            helperText={errorPassword.error ? errorPassword.text : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          {
            loading 
            ? <CircularProgress />
            : <Button onClick={handleAuth} disabled={!(email && password)} color="primary">
              {
                dialogOpen.sign === 'up' ? 'Sign Up' : 'Sign In'
              }
            </Button>

          }
        </DialogActions>
      </Dialog>
          
    </div>
  );
}
