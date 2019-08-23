import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const markdownDisplayStyles = makeStyles((theme: Theme) =>
  createStyles({
    resultHTML: {
      borderStyle: 'solid',
      borderWidth: '1px',
      borderRadius: '4px',
      minHeight: '1em',
      padding: '18.5px 14px'
    }
  })
);