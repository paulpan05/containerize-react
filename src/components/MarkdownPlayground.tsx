import React from 'react';
import TextField from '@material-ui/core/TextField';
import { markdownPlaygroundStyles } from '../constants/styles-component';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import hljs from 'highlight.js';

const MarkdownPlayground: React.FC = () => {
  const classes = markdownPlaygroundStyles();
  const [innerText, setInnerText] = React.useState();
  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };
  React.useEffect(() => {
    updateCodeSyntaxHighlighting();
  })
  return (
    <React.Fragment>
      <Typography variant='h4'>
        Markdown Text
      </Typography>
      <TextField
        multiline
        margin='normal'
        variant='outlined'
        className={classes.textfield}
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
      <div className={clsx(classes.resultHTML, 'markdown-body')}>
        <ReactMarkdown source={innerText} />
      </div>
    </React.Fragment>
  );
}

export default MarkdownPlayground;