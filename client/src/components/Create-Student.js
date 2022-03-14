import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const CreateStudent = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      rollno: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be min of 3 characters or more")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      rollno: Yup.string().required("Required")
    }),
    onSubmit: (values, actions) => {
      const studentObject = {
        name: values.name,
        email: values.email,
        rollno: values.rollno
      };
      axios.post('http://localhost:4000/students/create-student', studentObject)
        .then(data => {
          console.log(data)
          Swal.fire(
            'Student Record Successfully Created!',
            '',
            'success'
          )
        })
        .catch((error) => {
          if (error.response) {

            console.log(error.response.data)

            Swal.fire({
              icon: 'error',
              title: error.response.data.message,
            })
          }

        })
      actions.resetForm({
        values: {
          name: "",
          email: "",
          rollno: ""
        }
      });
    }
  });

  return (
    <div className="form-wrapper">
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="Name">
          <Form.Label className="label">Name:</Form.Label>
          <Form.Control
            type="string"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            placeholder="Enter Student Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label className="label">Email:</Form.Label>
          <Form.Control
            type="string"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Enter Student Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label className="label">Roll No:</Form.Label>
          <Form.Control
            type="number"
            name="rollno"
            min="1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rollno}
            placeholder="Enter Student Roll No."
          />
          {formik.touched.rollno && formik.errors.rollno ? (
            <div className="error">{formik.errors.rollno}</div>
          ) : null}
        </Form.Group>

        <Button className="btn btn-large btn-primary btn-block" type="submit">
          Create Student
        </Button>
      </Form>
    </div>
  );
};

export default CreateStudent;