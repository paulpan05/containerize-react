import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const loginPageStyles = makeStyles((theme: Theme) =>
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