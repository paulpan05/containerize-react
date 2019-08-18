import React from 'react';
import { markdownTextFieldStyles } from '../constants/styles-component';
import { MarkdownTextFieldProps } from '../types/components';
import TextField from '@material-ui/core/TextField';

const MarkdownTextField: React.FC<MarkdownTextFieldProps> = (props) => {
  const classes = markdownTextFieldStyles();
  return (
    <TextField
      multiline
      margin='normal'
      variant='outlined'
      className={classes.textfield}
      onChange={props.onChange}
    />
  );
}

export default MarkdownTextField;