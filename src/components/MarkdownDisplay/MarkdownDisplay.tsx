import React from 'react';
import { MarkdownDisplayProps } from './types';
import { markdownDisplayStyles } from './constants';
import hljs from 'highlight.js';
import ReactMarkdown from 'react-markdown';

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = (props) => {
  const classes = markdownDisplayStyles();
  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll("pre code").forEach(block => {
      hljs.highlightBlock(block);
    });
  };
  React.useEffect(() => {
    updateCodeSyntaxHighlighting();
  })
  return (
    <div className='markdown-body'>
      <ReactMarkdown source={props.innerText} className={classes.resultHTML} />
    </div>
  );
}

export default MarkdownDisplay;