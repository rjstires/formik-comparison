import { TextField as MUITextField } from '@material-ui/core';
import React from 'react';

const TextField = ({ error, touched, ...props}) => {
  const e = error && touched
      ? { error: true, helperText: error }
      : {};

  const updatedProps = {
    ...props,
    ...e,
  };

  return <MUITextField {...updatedProps} />
}

export default TextField;
