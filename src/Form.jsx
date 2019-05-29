import { Button, CircularProgress, Container, Grid } from '@material-ui/core';
import React from 'react';

import API from './API';
import Notice from './Notice'
import TextField from './form/_TextField';

const validateName = (name = '') => {
  if (name === '') {
    return 'Please enter a name to continue.'
  }
};

const validateTitle = (title = '') => {
  if (title === '') {
    return 'Please enter a title to continue.'
  }
};

const initialValues = {
  name: '',
  title: '',
};

const initialState = {
  values: { ...initialValues },
  errors: { },
  touched: { },
  isSubmitting: false,
  status: { serverError: undefined, success: undefined },
  isValid: false,
};

export default class MyForm extends React.Component {
  state = initialState;

  onSubmit = async (e) => {
    e.preventDefault();

    this.setState({ isSubmitting: true });

    try {
      /** If you want to see an error, provide a string value to API.request(`Oh no!`) */
      await API.request();
      this.setState({ ...initialState, status: { success: 'You did it!' } })
    } catch (serverError) {
      this.setState({ isSubmitting: false, status: { serverError } });
    }
  };

  onReset = e => {
    e.preventDefault();
    this.setState({ ...initialState });
  };

  validate = () => {
    const { values, errors } = this.state;
    const name = validateName(values.name);
    const title = validateTitle(values.title);

    if (name !== errors.name || title !== errors.title) {
      return this.setState({
        errors: { ...this.state.errors, name, title, },
        isValid: name === undefined && title === undefined
      });
    }
  };

  setValue = (key, value) =>
    this.setState({
      values: { ...this.state.values, [key]: value },
      touched: { ...this.state.touched, [key]: true },
    }, this.validate)

  setBlur = (key) =>
    this.setState({ touched: { ...this.state.touched, [key]: true } }, this.validate);

  handleChange = e =>
    this.setValue(e.target.name, e.target.value);

  handleBlur = e =>
    this.setBlur(e.target.name);

  render() {
    const { values, errors, touched, isValid, isSubmitting, status: { success, serverError } } = this.state;

    return (
      <Container>
        <form onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="false">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Notice success message={success} />
              <Notice error message={serverError} />
            </Grid>

            <Grid item xs={3}>
              <TextField
                autoComplete="off"
                label="name"
                name="name"
                value={values.name}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                error={errors.name}
                touched={touched.name}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                autoComplete="off"
                label="title"
                name="title"
                value={values.title}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                error={errors.title}
                touched={touched.title}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                onClick={this.onSubmit}
                variant="contained"
                color="primary"
              >
                {isSubmitting ? <CircularProgress size={22} /> : 'Submit'}
              </Button>
              <Button
                type="reset"
                onClick={this.onReset}
                variant="text"
                color="primary"
              >
                Reset
            </Button>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'left' }}>
              <pre>{JSON.stringify(this.state, null, 3)}</pre>
            </Grid>
          </Grid>
        </form>
      </Container>
    );
  }
}
