import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const drawerWidth = 260;

const loginPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageGrid: {
      minHeight: '100vh',
      verticalAlign: 'middle'
    },
    innerGrid: {
      width: '600px',
      maxWidth: '80vw'
    },
    loginGrid: {
      marginTop: '0.25em'
    },
    signupGrid: {
      marginTop: '2em',
      marginBottom: '2em'
    },
    logo: {
      width: '500px',
      maxWidth: '80vw',
      height: 'auto'
    },
    loadProgress: {
      margin: theme.spacing(3)
    },
    snackbarMargin: {
      margin: theme.spacing(1),
      width: '100%'
    }
  })
);

const signupPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageGrid: {
      minHeight: '100vh',
      verticalAlign: 'middle'
    },
    innerGrid: {
      width: '600px',
      maxWidth: '80vw'
    },
    createUserGrid: {
      marginTop: '0.25em'
    },
    loadProgress: {
      margin: theme.spacing(3)
    },
    logo: {
      width: '500px',
      maxWidth: '80vw',
      height: 'auto'
    },
    snackbarMargin: {
      margin: theme.spacing(1),
      width: '100%'
    },
    confirmGoBackGrid: {
      marginTop: '2em',
      marginBottom: '2em'
    },
    confirmGrid: {
      marginTop: '0.25em'
    }
  })
);

const forgotPasswordPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageGrid: {
      minHeight: '100vh',
      verticalAlign: 'middle'
    },
    innerGrid: {
      width: '600px',
      maxWidth: '80vw'
    },
    forgotPasswordGrid: {
      marginTop: '0.25em'
    },
    snackbarMargin: {
      margin: theme.spacing(1),
      width: '100%'
    },
    loadProgress: {
      margin: theme.spacing(3)
    },
    logo: {
      width: '500px',
      maxWidth: '80vw',
      height: 'auto'
    }
  })
);

const alertSnackbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: 'flex',
      alignItems: 'center'
    }
  })
);

const mainPageStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainDiv: {
      display: 'flex'
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none'
      }
    },
    toolbar: theme.mixins.toolbar,
    drawer : {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    grow: {
      flexGrow: 1
    },
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    drawerTop: {
      height: '1em',
      width: 'auto',
      paddingTop: '0.25em'
    },
    drawerTopContent: {
      verticalAlign: 'middle'
    }
  })
);

const dashboardStyles = makeStyles((theme: Theme) => 
  createStyles({
    titleText: {
      textAlign: 'center'
    }
  })
);

const signedOutStyles = makeStyles((theme: Theme) => 
  createStyles({
    pageGrid: {
      minHeight: '100vh',
      verticalAlign: 'middle'
    },
    signedOutButton: {
      marginTop: '1em'
    }
  })
);

const markdownPlaygroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    textfield: {
      width: '100%'
    },
    bottomSpacing: {
      height: '1em'
    },
    topSpacing: {
      height: '0.5em'
    },
    resultHTML: {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '4px',
      minHeight: '1em',
      padding: '18.5px 14px'
    }
  })
);

export {
  loginPageStyles,
  signupPageStyles,
  forgotPasswordPageStyles,
  alertSnackbarStyles,
  mainPageStyles,
  dashboardStyles,
  signedOutStyles,
  markdownPlaygroundStyles
};