import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import '../../App.css';
import { Register } from '../../Components';

const App = () => {
  return (
    <div className="container">
      <div className="brand-box">
        <h1>Rota Form</h1>
      </div>

      <div className="rota-form">
        <Formik
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordAgain: '',
            isHost: false
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            email: Yup.string().email().required('Emailis required'),
            isHost: Yup.bool().oneOf([true], 'You must accept the Terms and Conditions.')
          })}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values);
            setTimeout(() => {
              setSubmitting(false);
              resetForm();
            }, 2000);
          }}>
          {({
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleSubmit,
            handleReset,
            handleChange
          }) => (
            <form className="rota-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <div className="input-group-item">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    id="firstname"
                    type="text"
                    placeholder="Ayşegül"
                    className="input"
                    value={values.firstname}
                    onChange={handleChange}
                  />
                  {errors.firstname && touched.firstname && (
                    <div className="input-feedback">{errors.firstname}</div>
                  )}

                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    placeholder="GENÇEL"
                    className="input"
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="input-feedback">{errors.lastName}</div>
                  )}
                </div>
              </div>

              <div className="input-group">
                <div className="input-group-item">
                  <label htmlFor="email" className="topMargin">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="aysegulgencel0@gmail.com"
                    className="input"
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group-item">
                  <label htmlFor="password" className="topMargin">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="*****"
                    className="input"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <label htmlFor="passwordAgain" className="topMargin">
                    Password Again
                  </label>
                  <input
                    id="passwordAgain"
                    type="password"
                    placeholder="*****"
                    className="input"
                    value={values.passwordAgain}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="checkbox topMargin">
                <input id="isHost" type="checkbox" value={values.isHost} onChange={handleChange} />
                <label htmlFor="isHost" className="checkbox-label">
                  I Agree.
                </label>
              </div>
              {errors.isHost && <div className="input-feedback">{errors.isHost}</div>}

              <button
                type="submit"
                disabled={!dirty || isSubmitting}
                style={{ backgroundColor: '#0000FF', color: 'white' }}>
                Sing Up
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
