import React from 'react';
import { connect } from 'react-redux';
import { Container, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditProfile from '../components/editProfile';

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
        opacity: 0.2,
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
        gridTemplateColumns: '150px 1fr ',
        gridGap: '20px',
    },
}));
const Profile = (props) => {
    const [User, setUser] = React.useState({
        greetingTheName: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        userId: '',
        error: null,
        disabled: true,
        avatar: '',
        update: false,
        edit: false,
        carts: [],
        user: null,
        transarant: '',
        successful: false,
    });

    const classes = useStyles();

    React.useEffect(() => {
        setUser((prev) => ({
            ...prev,
            greetingTheName: props.auth.user.firstname,
            firstname: props.auth.user.firstname,
            lastname: props.auth.user.lastname,
            email: props.auth.user.email,
            avatar: props.auth.user.avatar,
        }));
    }, [props.auth.avatar, props.auth.user]);

    const { lastname, firstname, avatar } = User;

    return (
        <Container maxWidth="lg">
            <div
                style={{
                    width: '100%',
                    height: '939px',
                }}
            >
                <div>
                    <div>
                        <div>
                            <div>
                                <div className={classes.container_Profile}>
                                    <div>
                                        <img
                                            className={`${classes.avatar}`}
                                            alt="profile_image"
                                            src={avatar}
                                        />
                                    </div>

                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            marginLeft: '20px',
                                        }}
                                    >
                                        <EditProfile
                                            avatar={avatar}
                                            firstname={firstname}
                                            lastname={lastname}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Typography
                            variant="h4"
                            style={{
                                margin: '20px',
                            }}
                        >
                            {firstname}
                        </Typography>
                    </div>
                </div>
                <div>
                    {menu.map((menu) => (
                        <Button
                            key={menu.key}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: '10px',
                            }}
                        >
                            {menu.name}
                        </Button>
                    ))}
                </div>

                <div>
                    {menu2.map((menu) => (
                        <Button
                            key={menu.key}
                            variant="outlined"
                            color="primary"
                            style={{
                                margin: '10px',
                            }}
                        >
                            {menu.name}
                        </Button>
                    ))}
                </div>
            </div>
        </Container>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    update: state.auth.update,
    success: state.auth.message,
});
export default connect(mapStateToProps, {})(Profile);

const menu = [
    {
        key: 0,
        name: 'Shipping Address',
    },
    {
        key: 1,
        name: 'Payment Method',
    },
    {
        key: 2,
        name: 'Order History',
    },
    {
        key: 3,
        name: 'Delivery Status',
    },
    {
        key: 4,
        name: 'Language',
    },
];

const menu2 = [
    {
        key: 0,
        name: 'Notification Settings',
    },
    {
        key: 1,
        name: 'Privacy Policy',
    },
    {
        key: 2,
        name: 'Frequently Asked Quetions',
    },
    {
        key: 3,
        name: 'Legal Information',
    },
    {
        key: 4,
        name: 'Rate Our Information',
    },
];
