import React from 'react'
import { withRouter, Redirect, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { register } from '../redux/actions/auth'
import { setAlert } from '../redux/actions/alert'
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.secondaryColor.danger,
    textAlign: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  centered: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const SignUp = ({ register, isAuthenticated, setAlert, active }) => {
  const [User, setUser] = React.useState({
    firstname: 'Stanley',
    lastname: 'Pierre-Louis',
    email: 'stanley01@gmail.com',
    password: '123456',
    confirmPassword: '123456',
  })
  let history = useHistory()
  const classes = useStyles()
  //   fix error binding
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    if (active) {
      setOpen(!open)
    } else {
      setOpen(!open)
    }
  }
  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })
  }
  React.useEffect(() => {
    if (active) {
      history.push('/')
      setUser({})
    }
    if (alert.length === 1) {
      setOpen(false)
    }
  }, [active, history])

  const handleSubmit = (e) => {
    const { email, password, confirmPassword, firstname, lastname } = User

    e.preventDefault()
    if (password !== confirmPassword) {
      setAlert('Password do not match', 'danger')
    } else {
      register({
        email,
        password,
        confirmPassword,
        firstname,
        lastname,
      })
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }
  const { email, password, confirmPassword, firstname, lastname } = User
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            fullWidth
            // error={Errors}
            variant="outlined"
            margin="normal"
            type="text"
            label="First Name"
            name="firstname"
            value={firstname}
            onChange={handleChange}
            placeholder=" Enter your firstname"
          />

          <TextField
            fullWidth
            // error={Errors}
            label="Last Name"
            variant="outlined"
            margin="normal"
            type="text"
            name="lastname"
            value={lastname}
            onChange={handleChange}
            placeholder=" Enter your lastname"
          />

          <TextField
            fullWidth
            // error={Errors}
            label="Email"
            variant="outlined"
            margin="normal"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder=" Enter the email"
          />

          <TextField
            fullWidth
            // error={Errors}
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter the password"
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="Enter the password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            value="Submit"
            className={classes.submit}
            onClick={handleToggle}
          >
            {' '}
            {!open ? (
              'SignUp'
            ) : (
              <CircularProgress color="inherit" thickness={2.3} size={30} />
            )}
          </Button>
        </form>
      </div>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  register: state.register,
  isAuthenticated: state.auth.isAuthenticated,
  active: state.auth.user.active,
})

export default withRouter(
  connect(mapStateToProps, { register, setAlert })(SignUp)
)
