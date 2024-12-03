// import React from "react";
// import { useSelector } from "react-redux";
// import { makeStyles } from "@material-ui/core/styles";
// import ButtonBase from "@material-ui/core/ButtonBase";
// import Typography from "@material-ui/core/Typography";
// import { Link as RouterLink } from "react-router-dom";
// import Link from "@material-ui/core/Link";
// import Titles from "./Titles";
// import image1 from "../utils/images/image1.jpg";
// import image2 from "../utils/images/image2.jpg";
// import image3 from "../utils/images/image3.jpg";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
//   image: {
//     position: "relative",
//     height: "300px",
//     [theme.breakpoints.down("xs")]: {
//       width: "100% !important", // Overrides inline-style
//       height: " 253px !important",
//       margin: "0px !important",
//     },
//     [theme.breakpoints.up("sm")]: {
//       width: "30% !important", // Overrides inline-style
//       height: "400px",
//     },
//     [theme.breakpoints.down("600px")]: {
//       width: "30% !important", // Overrides inline-style
//       height: "400px",
//       margin: "0px !important",
//     },

//     "&:hover, &$focusVisible": {
//       zIndex: 1,
//       "& $imageBackdrop": {
//         opacity: 0.15,
//       },
//       "& $imageMarked": {
//         opacity: 0,
//       },
//       "& $imageTitle": {
//         border: "4px solid #fff",
//       },
//     },
//   },
//   focusVisible: {},
//   imageButton: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: theme.palette.common.white,
//     backgroundImage: "linear-gradient(#a67a4b66,rgba(0, 0, 0, 0.87))",
//   },
//   imageSrc: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundSize: "cover",
//     backgroundPosition: "center 40%",
//   },
//   imageBackdrop: {
//     position: "absolute",
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     backgroundColor: theme.palette.common.black,
//     opacity: 0.4,
//     transition: theme.transitions.create("opacity"),
//   },
//   imageTitle: {
//     position: "relative",
//     padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
//       theme.spacing(1) + 6
//     }px`,
//   },
//   imageMarked: {
//     height: 3,
//     width: 18,
//     backgroundColor: theme.palette.common.white,
//     position: "absolute",
//     bottom: -2,
//     left: "calc(50% - 9px)",
//     transition: theme.transitions.create("opacity"),
//   },
//   imageWidth: {},
// }));
// function MenuNavigation() {
//   const classes = useStyles();
//   const { countsItems } = useSelector((state) => ({
//     countsItems: state.countsItems.countsItems,
//   }));

//   const STATE = [
//     {
//       url: image1,
//       title: "Men",
//       width: "40%",
//       height: "550px",
//       margin: "0px",
//       count: countsItems[0] || 0,
//       link: "men",
//     },

//     {
//       url: image3,
//       title: "Sneakers",
//       width: "30%",
//       height: "550px",
//       margin: "40px",
//       count: countsItems[1] || 0,
//       link: "sneakers",
//     },
//     {
//       url: image2,
//       title: "Woman",
//       width: "30%",
//       height: "550px",
//       margin: "0px",
//       count: countsItems[2] || 0,
//       link: "women",
//     },
//   ];

//   return (
//     <div>
//       <Titles>DISCOVER THE COLLECTIONS</Titles>
//       <div className={classes.root}>
//         {STATE.map((image) => (
//           <ButtonBase
//             focusRipple
//             key={image.title}
//             className={classes.image}
//             focusVisibleClassName={classes.focusVisible}
//             style={{
//               width: image.width,
//               height: image.height,
//               margin: image.margin,
//             }}
//           >
//             <span
//               className={classes.imageSrc}
//               style={{
//                 backgroundImage: `url(${image.url})`,
//               }}
//             />
//             <span className={classes.imageBackdrop} />
//             <Link
//               component={RouterLink}
//               to={`/${image.link}`}
//               color="inherit"
//               className={classes.menuTextSize}
//             >
//               <span className={classes.imageButton}>
//                 <Typography
//                   component="span"
//                   variant="subtitle1"
//                   color="inherit"
//                   className={classes.imageTitle}
//                 >
//                   {image.title} {image.count}
//                   <span className={classes.imageMarked} />
//                 </Typography>
//               </span>
//             </Link>
//           </ButtonBase>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default MenuNavigation;
