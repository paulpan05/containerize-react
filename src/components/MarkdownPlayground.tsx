import React from 'react';
import { markdownPlaygroundStyles } from '../constants/styles-component';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import MarkdownDisplay from './MarkdownDisplay';
import MarkdownTextField from './MarkdownTextField';

const MarkdownPlayground: React.FC = () => {
  const classes = markdownPlaygroundStyles();
  const [innerText, setInnerText] = React.useState();
  return (
    <React.Fragment>
      <Typography variant='h4'>
        Markdown Text
      </Typography>
      <MarkdownTextField
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