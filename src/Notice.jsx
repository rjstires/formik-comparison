import React from 'react'
import { Paper, withStyles } from "@material-ui/core";
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import classnames from 'classnames'
import PropTypes from 'prop-types';

const styled = withStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
  },
  success: {
    backgroundColor: green[200],
  },
  error: {
    backgroundColor: red[200]
  },
}));

const Success = ({ message, classes, success, error }) => message
  ? (<Paper className={classnames(classes.root, { [classes.success]: success, [classes.error]: error })}>{message}</Paper>)
  : null;

Success.propTypes = {
  message: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.bool,
}

export default styled(Success);
