import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const signedOutStyles = makeStyles((theme: Theme) => 
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
