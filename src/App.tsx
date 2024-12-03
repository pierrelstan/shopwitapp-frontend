import React from "react";
import {
  Routes,
  Route,
  Outlet,
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  MemoryRouter,
} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "@mui/material/Link";
import Home from "./pages/Home";
import {
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="about" element={<About />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
function Layout() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}

      <Box
        component="nav"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "50px",
          borderBottom: "1px solid #a67a4b",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Faster One, system-ui",
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: 32,
            color: "#a67a4b",
            mx: 4,
          }}
        >
          BuyNest
        </Typography>
        <Box>
          <Box
            component="ul"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              listStyle: "none",
              textDecoration: "none",
            }}
          >
            {["Home", "Men", "Women", "Sneakers"].map((item, idx) => (
              <Box
                component="li"
                sx={{
                  padding: "14px 18px",
                }}
              >
                <Link
                  component={RouterLink}
                  to={`${item === "Home" ? "/" : `/${item.toLowerCase()}`}`}
                  sx={{
                    textDecoration: "none",
                    listStyle: "none",
                    fontFamily: "Oswald, sans-serif",
                    color: "#a67a4b",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  {item}
                </Link>
              </Box>
            ))}
            <>
              <IconButton
                id="basic-button"
                onClick={handleClick}
                sx={{
                  m: 4,
                  cursor: "pointer",
                }}
              >
                <AccountCircleIcon
                  sx={{
                    color: "#a67a4b",
                  }}
                />
              </IconButton>

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </>
          </Box>
        </Box>
      </Box>

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link component={RouterLink} to="/">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
