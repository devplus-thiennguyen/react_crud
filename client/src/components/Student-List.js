import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Swal from "sweetalert2";

const StudentTableRow = props => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/students/get-students")
      .then(res => {
        setStudents(res.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = id => {
    axios.delete("http://localhost:4000/students/delete-student/" + id)
      .then((data) => {
        if (data) {
          setStudents(students.filter(item => item._id !== id))
          Swal.fire(
            'Student Record Deleted successfully!',
            '',
            'success'
          )
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  };
  return (
    <div class="table-scrollable">
      <Table className="table table-dark table-striped table-hover border table-bordered col-12 col-sm-12 col-lg-12 table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{students.map((list, i) => {
          return (
            <tr key={i}>
              <td>{list.name}</td>
              <td>{list.email}</td>
              <td>{list.rollno}</td>

              <td>
                <Link to={"/edit-student/" + list._id}>
                  <Button className="edit-link">Edit</Button>
                </Link>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(list._id)}
                >
                  Delete
        </Button>
              </td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </div>
  );
};

export default StudentTableRow;