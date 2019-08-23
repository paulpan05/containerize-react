import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const signupPageStyles = makeStyles((theme: Theme) =>
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