import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const markdownPlaygroundStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottomSpacing: {
      height: '1em'
    },
    topSpacing: {
      height: '0.5em'
    }
  })
);