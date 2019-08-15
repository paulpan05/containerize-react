import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

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
      display: 'flex',
      flexFlow: 'column',
      minHeight: '100vh'
    }
  })
);

const dashboardStyles = makeStyles((theme: Theme) => 
  createStyles({
    pageGrid: {
      verticalAlign: 'middle',
      flexGrow: 1
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

export {
  loginPageStyles,
  signupPageStyles,
  forgotPasswordPageStyles,
  alertSnackbarStyles,
  mainPageStyles,
  dashboardStyles,
  signedOutStyles
};