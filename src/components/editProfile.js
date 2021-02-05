import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
// import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { connect } from 'react-redux'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import PhotoCameraRoundedIcon from '@material-ui/icons/PhotoCameraRounded'
import { loadUser, updateProfile } from '../redux/actions/auth'
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
  },
  avatar: {
    display: 'inline-block',
    position: 'relative',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '5px solid #eee',
  },
  avatarOpacity: {
    display: 'inline-block',
    position: 'relative',
    width: '150px',
    height: '150px',
    overflow: 'hidden',
    borderRadius: '50%',
    objectFit: 'cover',
    opacity: 0.4,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  buttonEdit: {
    position: 'relative',
    marginRight: '30px',
  },
  colorButtonEdit: {
    color: 'blue',
  },
  colorButtonEditFalse: {
    color: '#333',
  },
  submit: {
    position: 'absolute',
    borderRadius: '10%',
    left: '190px',
  },
  containerProfile: {
    display: 'flex',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    top: '127px',
    left: '66px',
  },
  container_Profile: {
    display: 'grid',
    gridTemplateColumns: '150px 300px ',
  },
  containerCameraIcon: {
    position: 'absolute',
    top: '180px',
    left: '80px',
    color: '#333',
  },
}))

const EditProfile = ({ updateProfile, auth, loadUser }) => {
  const [User, setUser] = React.useState({
    firstname: '',
    lastname: '',
    avatar: '',
    location: '',
    disabled: false,
  })
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()
  let uploadedImage = React.useRef(null)
  let imageUploader = React.useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleImageUpload = (e) => {
    const [file] = e.target.files
    if (file) {
      const reader = new FileReader()
      const { current } = uploadedImage
      current.file = file
      reader.onload = (e) => {
        current.src = e.target.result

        setUser({ ...User, avatar: e.target.result })
      }

      reader.readAsDataURL(file)
    }
  }
  const handleChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    const { avatar, userId, firstname, lastname, location } = User
    e.preventDefault()
    try {
      await updateProfile(userId, avatar, firstname, lastname, location)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    setUser((prev) => ({
      ...prev,
      firstname: auth.user.firstname,
      lastname: auth.user.lastname,
      email: auth.user.email,
      avatar: auth.user.avatar,
      userId: auth.user._id,
    }))
  }, [
    auth.user._id,
    auth.user.avatar,
    auth.user.email,
    auth.user.firstname,
    auth.user.lastname,
    loadUser,
  ])
  const { avatar, firstname, lastname } = User
  return (
    <div>
      <Button
        variant="outlined"
        disableRipple
        color="primary"
        onClick={handleClickOpen}
        evalation={3}
      >
        EDIT PROFILE
      </Button>
      <Dialog
        open={open}
        keepMounted
        // scroll={scroll}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <div
          style={{
            margin: '20px',
          }}
        >
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '46px',
              }}
            >
              <div>
                <Button
                  onClick={handleClose}
                  color="primary"
                  style={{ marginRight: '10px' }}
                >
                  <CloseIcon />
                </Button>
                Edit Profile
              </div>

              <Button onClick={handleClose} color="primary" type="submit">
                Save
              </Button>
            </div>
            <div>
              {!auth ? (
                ''
              ) : (
                <div>
                  <div className={classes.container_Profile}>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple="false"
                        onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                          display: 'none',
                        }}
                      />

                      <div onClick={() => imageUploader.current.click()}>
                        <img
                          className={classes.avatarOpacity}
                          ref={uploadedImage}
                          alt="profile_image"
                          src={avatar}
                        />
                        <div className={classes.containerCameraIcon}>
                          <PhotoCameraRoundedIcon fontSize="large" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              type="text"
              onChange={handleChange}
              defaultValue={firstname}
            />
            <TextField
              type="text"
              margin="normal"
              name="lastName"
              label="LastName"
              id="lastName"
              fullWidth
              onChange={handleChange}
              defaultValue={lastname}
            />

            <TextField
              margin="normal"
              name="location"
              label="location"
              id="location"
              fullWidth
              onChange={handleChange}
            />
          </form>
        </div>
      </Dialog>
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  update: state.auth.update,
})

export default connect(mapStateToProps, { loadUser, updateProfile })(
  React.memo(EditProfile, (prev, next) => {
    if (prev.user !== next.user) {
      return true
    }
  })
)
