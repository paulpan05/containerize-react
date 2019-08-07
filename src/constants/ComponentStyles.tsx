import { makeStyles, createStyles } from "@material-ui/core/styles";

const authPageStyles = makeStyles(
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
    }
  })
);

export { authPageStyles };