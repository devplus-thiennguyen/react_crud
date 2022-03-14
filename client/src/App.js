import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  Header,
  CreateStudent,
  EditStudent,
  StudentList,
} from './components/Route';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={StudentList} />
        <Route path="/create-student" component={CreateStudent} />
        <Route path="/edit-student/:id" component={EditStudent} />
        <Route path="/student-list" component={StudentList} />
      </Switch>
    </Router>
  );
}

export default App;