// import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import axios from '../../utility/api/apiWithoutToken';
// import axiosWithToken from '../../utility/api/api';
import { useDispatch } from 'react-redux';
import loginAction from '../../store/actions/loginAction';
import uiAction from '../../store/actions/uiAction';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {/* {'.'} */}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setformData] = useState({ email: '', password: '', showPassword: false });
  const [video, SetVideo] = useState('images/gifs/excalidraw.gif');
  useEffect(() => {
    // SetVideo('images/gifs/excalidraw_2.gif')
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = { login: true, userName: '', pathname: '/', userCategory: '' }
    let bodyFormData = new FormData();
    bodyFormData.append('email_id', formData.email);
    bodyFormData.append('password', formData.password);
    localStorage.setItem('draw_anything_app', JSON.stringify({userName:'Avinash Patel',email:formData.email,isLogin:true}));

    axios({
      method: 'post',
      url: process.env.REACT_APP_BASE_URL + "user-login",
      data: bodyFormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // data: {
      //   username: formData.email,
      //   password: formData.password
      // }
    }).then(async res => {
      if (!res.data.status) {
        dispatch(uiAction.showSnackbar({ type: 'error', message: res.data.message }));
        return;
      }

      const data = res.data.user_data;
      obj.userName = data.user_name;

      // dispatch(loginAction.logIn());
      dispatch(uiAction.showSnackbar({ type: 'success', message: res.data.message || 'User logged in successfully' }));
      let store = localStorage.getItem('draw_anything_app');
      if (!store) {
        localStorage.setItem('draw_anything_app', '{}');
        store = localStorage.getItem('draw_anything_app');
      }
      let parsedStore = JSON.parse(store);
      parsedStore.userName = data.user_name;
      parsedStore.isLogin = true;
      parsedStore.userCategory = data.user_group;
      parsedStore.user_id = data.user_id;
      parsedStore.email = data.email_id;
      parsedStore.token = data.token;
      // parsedStore.user_org_name = data.user_org_name;
      // parsedStore.user_org_logo_url = data.user_org_logo_url;
      // parsedStore.user_org_video_url = data.user_org_video_url;
      // await getProjectColorData(parsedStore);
      dispatch(loginAction.setUser(parsedStore));
      localStorage.setItem('draw_anything_app', JSON.stringify(parsedStore));
      // await getOrgData(parsedStore);
      // await getProjectColorData(parsedStore);
      localStorage.setItem('draw_anything_app', JSON.stringify(parsedStore));
      dispatch(loginAction.setUser(parsedStore));
      console.error(parsedStore);
      // switch (parsedStore.userCategory) {
      //   case 'super_admin': {
      //     obj.pathname = '/organizations';
      //     break;
      //   }
      //   case 'admin': {
      //     obj.pathname = '/projects';
      //     break;
      //   }
      //   case 'g2':
      //     {
      //       obj.pathname = '/g2-user';
      //       break;
      //     }
      //   case 'g2b':
      //     {
      //       obj.pathname = '/g2b-user';
      //       break;
      //     }
      //   case 'g3': {
      //     obj.pathname = '/g3-user';
      //     break;
      //   }
      //   case 'g4': {
      //     obj.pathname = '/g4-user';
      //     break;
      //   }
      //   default: {
      //     obj.pathname = '/'
      //   }
      // }
      obj.userCategory = parsedStore.userCategory;
      // navigate('/draw')
      navigate({
        pathname: '/draw',
        state: obj
      })
    }).catch(err => {
      console.log(err);
      dispatch(uiAction.showSnackbar({ type: 'error', message: 'Something went wrong.Please try after some time' }));
    });


  };

  // async function getOrgData(store) {
  //   try {
  //     const orgDataRes = await axios({
  //       method: 'post',
  //       headers:{Authorization : `Bearer ${store.token}`},
  //       url: process.env.REACT_APP_BASE_URL + `/api/get-org-data`,
  //       data: { user_id: store.user_id }
  //     })
  //     store.header = orgDataRes.data.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function getProjectColorData(store) {
  //   try {
  //     const orgDataRes = await axios({
  //       method: 'post',
  //       headers:{Authorization : `Bearer ${store.token}`},
  //       url: process.env.REACT_APP_BASE_URL + `/api/get-org-project-table-color`,
  //       data: { user_id: store.user_id }
  //     })
  //     store.project_color = orgDataRes.data.project_table_color;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleChange = (prop) => (event) => {
    setformData({ ...formData, [prop]: event.target.value });
  };

  const handleClickShowPassword = (prop) => () => {
    setformData({
      ...formData,
      [prop]: !formData[prop],
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        item
        xs={false}
        sm={4}
        md={4}
        sx={{
          display: { xs: 'none', sm: 'block' },
          m: 0,
          p: 0,
          height: "calc(100vh)",
          position: 'absolute'
        }}
      >
        <img src={video} style={{
          height: "100%",
        }} id="background-video"></img>
      </Grid>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            height: "100%",
          }}
        >
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} sx={{ zIndex: 2 }} elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              px: 8,
              py: 2,
              minHeight: 'calc(100vh - 52px)'
              // boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange('email')}
              />
              <FormControl sx={{ mt: 2 }} variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={formData.showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange('password')}

                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword('showPassword')}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'end', px: 2 }}>
            <Copyright sx={{ mt: 'auto', mr: 'auto', mb: 0 }} />
            <Link href="/#/sign-up" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}