import { TextField as MUITextField } from '@material-ui/core';
import { connect, getIn } from 'formik';
import React from 'react';

const TextField = ({ formik, ...props }) => {
  const err = getIn(formik.errors, props.name);
  const touched = getIn(formik.touched, props.name);

  const error = err && touched
    ? { error: true, helperText: err }
    : {};

  const updatedProps = {
    value: getIn(formik.values, props.name),
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    ...error,
    ...props,
  };

  return <MUITextField {...updatedProps} />
};

export default connect(TextField);
