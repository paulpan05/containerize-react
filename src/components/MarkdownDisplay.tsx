import React from 'react';
import { MarkdownDisplayProps } from '../types/components';
import { markdownDisplayStyles } from '../constants/styles-component';
import clsx from 'clsx';
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
    <div className={clsx(classes.resultHTML, 'markdown-body')}>
      <ReactMarkdown source={props.innerText} />
    </div>
  );
}

export default MarkdownDisplay;