import { Button, CircularProgress } from '@material-ui/core';
import { connect } from 'formik';
import React from 'react';

const SubmitButton = ({ formik, children, ...props }) => {
  const { isValid, isSubmitting, handleSubmit, } = formik;
  return (
    <Button
      disabled={!isValid || isSubmitting}
      type="submit"
      onClick={e => handleSubmit()}
      variant="contained"
      color="primary"
      {...props}
    >
      {isSubmitting ? <CircularProgress size={22} /> : children}
    </Button>
  );
}

export default connect(SubmitButton);
