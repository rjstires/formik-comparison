import { Container, Grid } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import API from './API';
import Notice from './Notice';

/** Our Formik connected components! Ohhh ahhh! */
import ResetButton from './form/ResetButton';
import SubmitButton from './form/SubmitButton';
import TextField from './form/TextField';

const validationSchema = Yup.object({
  name: Yup.string().required('Please enter a name to continue.'),
  title: Yup.string().required('Please enter a title to continue.'),
});

const initialValues = {
  name: '',
  title: '',
};

const initialStatus = {
  serverError: undefined,
  success: undefined,
};

const onSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
  setSubmitting(true);

  try {
    /** If you want to see an error, provide a string value to API.request(`Oh no!`) */
    await API.request(`Er mer gerd!`);
    resetForm();
    setStatus({ success: 'You did it!' });
  } catch (serverError) {
    setSubmitting(false);
    setStatus({ serverError });
  }
};

export default class MyForm extends React.Component {
  render() {
    return (
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={initialValues}
        initialStatus={initialStatus}
        render={(formik) => {
          const { status: { success, serverError } } = formik;

          return (
            <Container>
              <Form autoComplete="false">
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
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      autoComplete="off"
                      label="title"
                      name="title"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton>Submit</SubmitButton>
                    <ResetButton>Reset</ResetButton>
                  </Grid>
                  <Grid item xs={12} style={{ textAlign: 'left' }}>
                    <pre>{JSON.stringify(formik, null, 3)}</pre>
                  </Grid>
                </Grid>
              </Form>
            </Container>
          )
        }}
      >
      </Formik>
    );
  }
}
