import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditStudent = (props) => {
  let { id } = useParams()
  const [student, setStudent] = useState({});

  useEffect(() => {
    axios.get("http://localhost:4000/students/edit-student/" + id)
      .then((res) => {
        setStudent(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: student.name,
      email: student.email,
      rollno: student.rollno
    },
    enableReinitialize: true,
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
      axios.put("http://localhost:4000/students/update-student/" + id, studentObject)
        .then(res => {
          if (res.data) {
            Swal.fire(
              'Student Record Successfully Updated!',
              '',
              'success'
            )
          }
          if (res.data.message) {
            Swal.fire({
              icon: 'error',
              title: res.data.message,
            })
          }
        })
        .catch((error) => {
          console.log(error.response.data)
        })
      actions.resetForm({
        values: {
          name: "",
          email: "",
          rollno: ""
        },
      });
      props.history.push('/student-list')
    }
  });
  return (
    <div className="form-wrapper card">
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rollno}
            placeholder="Enter Student Roll No."
          />
          {formik.touched.rollno && formik.errors.rollno ? (
            <div className="error">{formik.errors.rollno}</div>
          ) : null}
        </Form.Group>

        <Button className="btn btn-large btn-success btn-block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>
  );
};

export default EditStudent;