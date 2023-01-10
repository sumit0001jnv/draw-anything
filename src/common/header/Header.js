import { useState, useEffect, useMemo } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { deepOrange } from "@mui/material/colors";
import theme from "../../theme/customTheme";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import Divider from '@mui/material/Divider';

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));




export default function Header(props) {
  const navigate = useNavigate();
  const [login, setlogin] = useState(false);
  const [userName, setUserName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  ////
  const [notificationColor, setNotificationColor] = useState('#f44336');//
  const notificationTheme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: notificationColor,
          },
        }
      }),
    [notificationColor],
  );

  ////
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [logo, setLogo] = useState("images/company-logo.jpeg");
  const [headerBgColor, setHeaderBgColor] = useState("#546e7a");
  const [orgName, setOrgName] = useState("Draw Anything");
  const open = Boolean(anchorEl);
  const openNotification = Boolean(notificationAnchorEl);
  const [userCategory, setUserCategory] = useState("");
  const abbreviateWord = (word = "") => {
    let abbrWord = "";
    word
      .split(" ")
      .forEach((w) => (abbrWord = abbrWord + (w[0] || "").toUpperCase()));
    return abbrWord;
  };

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("draw_anything_app") || "{}");
    setlogin(userData.isLogin);
    setUserName(userData.userName);
    setUserCategory(userData.userCategory);
    setOrgName(userData.user_org_name);
    setLogo(userData.user_org_logo_url);
    setHeaderBgColor(userData?.header?.app_main_navbar_color || "#546e7a");
    setNotificationColor(userData?.project_color?.table_filter_notification_color || "#f44336")
  }, []);

  const handleClick = (event, type) => {
    if (type === 'notification-menu') {
      setNotificationAnchorEl(event.currentTarget);

    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = (type) => (eventType) => {
    setAnchorEl(null);
    setNotificationAnchorEl(null);
    switch (type) {
      case "login": {
        navigate("/sign-in");
        break;
      }
      case "logout": {
        navigate("/");
        setlogin(false);
        setUserName("");
        setUserCategory("");
        break;
      }
      case "profile": {
        navigate("/profile");
        break;
      }
      case "notification": {
        break;
      }
      default: {
        // navigate("/");
      }
    }
  };

  const onSignIn = () => {
    navigate("/sign-in");
  };

  const handleSetting = () => {
    navigate("/setting");
  };

  const handleUnderwriterDash = () => {
    navigate("/underwriter-dashboard");
  }

  const handleg2bhome = () => {
    navigate("/g2b-user");
  }

  const handleUserList = () => {
    navigate("/userListing");
  };

  const handleProjects = () => {
    navigate("/projects");
  };

  const onNotificationClick = (row) => {
    navigate({
      pathname: '/quote-detail',
      search: `?project_id=${row[0]}&isInitialQuote=true&status=Pending&projectName=${row[1]}`,
    })
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <HideOnScroll {...props}>
          <AppBar sx={{ background: headerBgColor }}>
            <Toolbar>
              <img
                src={logo || "images/company-logo.jpeg"}
                width="60"
                alt="company-logo"
              ></img>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  pl: 2,
                  color: "rgb(26 33 77)",
                  textAlign:'initial',
                  textTransform: "capitalize",
                }}
              >
                {orgName || "Draw Anything"}
              </Typography>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
              ></Typography>
              {"admin" === userCategory ? (
                <div>
                  <IconButton
                    size="large"
                    edge="start"
                    color="grey"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleProjects}
                  >
                    <GroupIcon />
                  </IconButton>

                  <IconButton
                    size="large"
                    edge="start"
                    color="grey"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleUserList}
                  >
                    <DynamicFeedIcon />
                  </IconButton>

                  <IconButton
                    size="large"
                    edge="start"
                    color="grey"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={handleSetting}
                  >
                    <SettingsIcon />
                  </IconButton>
                </div>
              ) : (
                ""
              )}
          
              {login ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      onClick={(event) => handleClick(event, 'login')}
                    >
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>
                        {abbreviateWord(userName)}
                      </Avatar>
                    </StyledBadge>
                  </Box>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="orange"
                    sx={{
                      mr: 2,
                      ":hover": {
                        color: "#000",
                        backgroundColor: "#ffb74d",
                      },
                      textTransform: "capitalize",
                    }}
                    onClick={onSignIn}
                  >
                    Login
                  </Button>
                </>
              )}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose()}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {login ? (
                  <>
                    <MenuItem onClick={handleClose("profile")}>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose("logout")}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={handleClose("login")}>Login</MenuItem>
                  </>
                )}
              </Menu>
              <Menu
                id="notification-menu"
                anchorEl={notificationAnchorEl}
                open={openNotification}
                onClose={handleClose()}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    maxHeight: 390,
                    minWidth: 300,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem sx={{ fontWeight: 400 }}>
                  Notifications ({props?.notificationArr?.length || 0})
                </MenuItem>
                <Divider></Divider>
                {props.notificationArr && <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {props.notificationArr.map((notification, index) => {
                    return <MenuItem key={'notification' + index} sx={{ fontWeight: 400 }} onClick={() => onNotificationClick(notification)}>{notification[1]}</MenuItem>
                  })}
                </Box>}
              </Menu>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar />
        <Container>
          <Box sx={{ my: 2 }}></Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
