import React from 'react';
import './App.css';
import Form from './Form';
import FormikForm from './FormikForm';
import { Divider } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Form />
      <FormikForm />
      <Divider />
    </div>
  );
}

export default App;
