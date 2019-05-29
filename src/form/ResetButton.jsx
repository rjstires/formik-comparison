import { Button } from '@material-ui/core';
import { connect } from 'formik';
import React from 'react';

const ResetButton = ({ formik, ...props }) => {
  const { handleReset } = formik;

  return (
    <Button type="reset" onClick={handleReset} variant="text" color="primary">
      Reset
    </Button>
  );
};

export default connect(ResetButton);
