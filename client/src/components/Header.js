import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="sm">
            <Navbar.Brand>
                <Link to={"/create-student"} className="nav-link navbar-brand">
                    Student App
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav text-center">
                <Nav className="ms-auto">
                    <Nav>
                        <Link to={"/create-student"} className="nav-link" >
                            Create Student
                    </Link>
                    </Nav>

                    <Nav>
                        <Link to={"/student-list"} className="nav-link">
                            Student List
                    </Link>
                    </Nav>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
export default Header;