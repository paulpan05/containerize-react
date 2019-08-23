import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const forgotPasswordPageStyles = makeStyles((theme: Theme) =>
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