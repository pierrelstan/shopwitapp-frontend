import React from "react";
// import { Button, Typography } from "@material-ui";
// import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
// import styled, { keyframes, css } from "styled-components";
import image from "../utils/images/logo1.png";
import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
// import { styled } from "@material-ui/styles";

// const RigthToLeftAnimations = keyframes`
//   0%{
//     opacity:1;
//  transform : translateX(40px)
//   }
// 100% {
//     opacity: 1
//     transform : translateX(0px)
//   }
// `;

// const BottomToptAnimations = keyframes`
//   0%{
//     opacity:1;
//  transform : translateY(40px)
//   }
// 100% {
//     opacity: 1
//     transform : translateY(0px)
//   }
// `;
// const LeftToRightAnimations = keyframes`
// 0%{
//   opacity:1;
// transform : translateX(-40px)
// }
// 100% {
//   opacity: 1
//   transform : translateX(0px)
// }
// `;
// const ContenText = styled.div`
//   opacity: 0px;
//   position: relative;
//   /* width: 100vw; */

//   animation: ${(props) =>
//     props.ScrollNumber <= 8
//       ? css`
//           ${BottomToptAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
//         `
//       : ""};
//   @media (max-width: 320px) {
//     animation: ${(props) =>
//       props.ScrollNumber <= 8
//         ? css`
//             ${LeftToRightAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
//           `
//         : ""};
//   }
// `;

// const ImageContainer = styled.div`
//   position: relative;
//   animation: ${(props) =>
//     props.ScrollNumber <= 8
//       ? css`
//           ${RigthToLeftAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
//         `
//       : ""};
//   /* @media (max-width: 320px) {
//     animation: ${(props) =>
//     props.ScrollNumber <= 8
//       ? css`
//           ${LeftToRightAnimations} 3s forwards cubic-bezier(0.2, 0.8, 0.2, 1)
//         `
//       : ""};
//   } */
// `;

// const useStyles = makeStyles((theme) => ({
//   container: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr ",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     gap: "40px",
//     marginBottom: "40px",
//     height: "100vh",
//     [theme.breakpoints.down("xs")]: {
//       // gridTemplateColumns: '130px 180px ',
//       gridTemplateColumns: "109px 180px ",
//       height: "auto",
//       gap: "0px",
//     },
//   },

//   imageHero: {
//     width: "100%",
//     maxWidth: "405px",
//     height: "auto",
//     objectFit: "cover",
//     [theme.breakpoints.down("xs")]: {
//       width: "227px",
//       marginTop: "127px",
//     },
//   },

//   textContainer: {
//     lineHeight: "27.2px",
//     alignSelf: "center",
//     color: "#454754",
//     textAlign: "center",
//     [theme.breakpoints.down("md")]: {
//       marginTop: theme.spacing(4),
//     },
//   },
//   h4: {
//     fontSize: "61px",
//     fontWeight: "bold",
//     color: "#333",
//     [theme.breakpoints.down("xs")]: {
//       fontSize: "32px",
//       textAlign: "left",
//     },
//     [theme.breakpoints.down("md")]: {
//       fontSize: "44px",
//     },
//   },

//   h1: {
//     fontSize: "18px",
//     letterSpacing: "8px",
//     color: "#333",
//     margin: 0,
//     [theme.breakpoints.down("xs")]: {
//       display: "none",
//     },
//     [theme.breakpoints.down("md")]: {
//       fontSize: "16px",
//     },
//   },

//   paperContainer: {
//     backgroundImage: `/images/logo1.png`,
//   },
//   containerText: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   button: {
//     color: "#fff",
//     border: "none",
//     padding: "10px 40px",
//     backgroundColor: "#cb436b",
//     "&:hover": {
//       backgroundColor: "#cb436b",
//       color: "#fff",
//       boxShadow:
//         "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
//     },
//     [theme.breakpoints.down("xs")]: {
//       padding: "0px 6px",
//     },
//   },
//   left: {
//     textAlign: "center",
//     [theme.breakpoints.down("xs")]: {
//       textAlign: "left",
//     },
//   },
//   center: {
//     display: "flex",
//     alignSelf: "center",
//     marginBottom: "30px",
//     [theme.breakpoints.down("xs")]: {
//       alignSelf: "flex-start",
//     },
//   },
// }));

// const ColorButton = styled(Button)<ButtonProps>(() => ({
//   border: "none",
//   color: "#fff",
//   backgroundColor: "#cb436b",
// }));

const ColorButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#a67a4b",
  borderColor: "#a67a4b",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#eee",
    borderColor: "#eee",
    boxShadow: "none",
    color: "#333",
  },
});

function Hero() {
  return (
    <Grid
      container
      rowSpacing={5}
      columnSpacing={{ xs: 1, md: 20 }}
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h1"
          fontSize={35}
          fontWeight="bold"
          width={"330px"}
          color="#a67a4b"
          sx={{
            fontFamily: "Shrikhand",
            fontWeight: 100,
            fontStyle: "normal",
          }}
        >
          A cozy place for all your shopping needs
        </Typography>

        <Box mt={4}>
          <ColorButton
            variant="contained"
            sx={{
              fontFamily: "Oswald, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            SHOW NOW
          </ColorButton>
        </Box>
      </Box>

      <Box>
        <Card sx={{ maxWidth: 605 }} raised={false}>
          <CardMedia
            component="img"
            alt="shop now"
            height="640"
            image={image}
          />
        </Card>
      </Box>
    </Grid>
  );
}
export default Hero;
