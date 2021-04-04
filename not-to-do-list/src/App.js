import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import "./App.css";
import { AddForm } from "./component/AddForm";
import { TaskLists } from "./component/ToDoList";
import { NoToDoList } from "./component/NotToDoList";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createTask,
  deletTaskLists,
  getTaskLists,
  switchTask,
} from "./taskApi.js";
// from actions
import { deleteTasks, fetchTaskLists } from "./component/taskAction.js";

const App = () => {
  const dispatch = useDispatch();

  const { isPending, status, message, totalHrs, itemToDelete } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    dispatch(fetchTaskLists());
  }, []);

  return (
    <div className="main">
      <Container variant="primary">
        <Row>
          <Col>
            <div className="text-center pt-5">
              <h1>Not To Do List</h1>
            </div>
          </Col>
        </Row>
        <hr></hr>
        {/* success and error massage */}
        {message && (
          <Alert varient={status === "success" ? "primary" : "denger"}>
            {message}
          </Alert>
        )}

        {isPending && <Spinner animation="border" variant="primary" />}
        <AddForm />
        <hr></hr>
        <Row>
          <Col>
            <TaskLists />
          </Col>
          <Col>
            <NoToDoList />
          </Col>
        </Row>

        <Row>
          {" "}
          <Alert variant="primary">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>your allocated Time={totalHrs}/168 hours</p>
            <hr />
          </Alert>
        </Row>
        {/* list items */}
      </Container>
      <Button
        onClick={() => dispatch(deleteTasks(itemToDelete))}
        variant="primary"
      >
        Delete
      </Button>
    </div>
  );
};

export default App;
