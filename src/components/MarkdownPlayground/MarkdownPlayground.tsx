import React from 'react';
import { markdownPlaygroundStyles } from './constants';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MarkdownDisplay from '../MarkdownDisplay';
import TextField from '@material-ui/core/TextField';

const MarkdownPlayground: React.FC = () => {
  const classes = markdownPlaygroundStyles();
  const [innerText, setInnerText] = React.useState();
  return (
    <React.Fragment>
      <Typography variant='h4'>
        Markdown Text
      </Typography>
      <TextField
        multiline
        fullWidth
        margin='normal'
        variant='outlined'
        onChange={(event) => {
          setInnerText(event.target.value);
        }}
      />
      <div className={classes.bottomSpacing} />
      <Divider />
      <div className={classes.topSpacing} />
      <Typography variant='h4' gutterBottom>
        Processed Result
      </Typography>
      <MarkdownDisplay innerText={innerText} />
    </React.Fragment>
  );
}

export default MarkdownPlayground;