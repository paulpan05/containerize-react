import React from 'react';
import { mainPageStyles } from '../constants/styles-component';
import { RootState } from '../redux/types/root';
import { connect } from 'react-redux';
import { MainPageProps } from '../types/components';
import { Redirect, Route, Switch } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dashboard from './Dashboard';
import SignedOut from './SignedOut';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu'
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import useTheme from '@material-ui/core/styles/useTheme';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import drawerLogo from '../img/drawer.png';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import MarkdownPlayground from './MarkdownPlayground';
import PageNotFound from './PageNotFound';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { resetSignoutFailure, signOut } from '../redux/actions/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

const mapsStateToProps = (state: RootState) => {
  return {
    loggedIn: state.auth.loggedIn,
    signoutWarn: state.auth.signoutWarn,
    username: state.auth.username,
    signingOut: state.auth.signingOut,
    signoutFailed: state.auth.signoutFailed,
    signoutFailedReason: state.auth.signoutFailedReason
  }
}

const MainPage = connect(mapsStateToProps)((props: MainPageProps) => {
  const classes = mainPageStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [redirectMode, setRedirectMode] = React.useState();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const handleDrawerToggle = () => {
    setMobileOpen(drawerOpened => !drawerOpened);
  }
  const handleUserMenuToggle = () => {
    setUserMenuOpen(prevOpen => !prevOpen);
  }
  const handleUserMenuClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setUserMenuOpen(false);
  }
  const drawer = (
    <div>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='center'
        className={clsx(classes.toolbar, classes.drawerTopContent)}>
        <img src={drawerLogo} alt='logo' className={clsx(classes.drawerTop, classes.toolbar)} />
      </Grid>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => {
            setRedirectMode('dashboard');
            setMobileOpen(false);
          }}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            setRedirectMode('markdown-playground')
            setMobileOpen(false);
          }}
        >
          <ListItemIcon><LiveTvIcon /></ListItemIcon>
          <ListItemText primary='Markdown Playground' />
        </ListItem>
      </List>
      <Divider />
      <List></List>
    </div>
  );
  return (
    <React.Fragment>
      <Dialog aria-labelledby='signoutfailed-title' open={props.signoutFailed}>
        <DialogTitle id='signoutfailed-title'>
          Sign out failed
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography gutterBottom>
            {props.signoutFailedReason}
          </Typography>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button color='primary' onClick={(event) => {
            event.preventDefault();
            props.dispatch(resetSignoutFailure());
          }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {props.signoutWarn && (
        <SignedOut />
      )}
      {!props.loggedIn && (
        <Redirect to='/' />
      )}
      {redirectMode && (
        <Redirect to={`${props.match.url}/${redirectMode}`} />
      )}
      {props.signingOut && (
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          className={classes.loadingGrid}
        >
          <Grid item>
            <Typography align='center' variant='h4'>
              Signing out
            </Typography>
          </Grid>
          <Grid item>
            <CircularProgress size='10em' className={classes.loadProgress} />
          </Grid>
        </Grid>
      )}
      {props.loggedIn && !props.signoutWarn && !props.signingOut && (
        <div className={classes.mainDiv}>
          <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.grow} />
              <Button
                ref={anchorRef}
                aria-label='account of current user'
                aria-controls='user-menu-grow'
                aria-haspopup={true}
                color='inherit'
                onClick={handleUserMenuToggle}
              >
                <Typography>
                  {props.username}&nbsp;
                </Typography>
                <AccountCircle />
              </Button>
              <Popper open={userMenuOpen} anchorEl={anchorRef.current} transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                  >
                    <Paper id='user-menu-grow'>
                      <ClickAwayListener onClickAway={handleUserMenuClose}>
                        <MenuList>
                          <MenuItem
                            onClick={(event) => {
                              handleUserMenuClose(event);
                              props.dispatch(signOut());
                            }}>Sign out</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label='containerize menu'>
            <Hidden smUp implementation='css'>
              <Drawer
                variant='temporary'
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation='css'>
              <Drawer
                classes={{
                  paper: classes.drawerPaper
                }}
                variant='permanent'
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch location={props.location}>
              <Route path={`${props.match.url}/dashboard`} component={Dashboard} />
              <Route path={`${props.match.url}/markdown-playground`} component={MarkdownPlayground} />
              <Route path={`${props.match.url}/*`} component={PageNotFound} />
            </Switch>
          </main>
        </div>
      )}
    </React.Fragment>
  );
})

export default MainPage;