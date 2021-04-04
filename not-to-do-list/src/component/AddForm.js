import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { addTask } from "./taskAction.js";
const initialFormData = {
  title: "",
  hr: 0,
};
export const AddForm = () => {
  const dispatch = useDispatch();
  const { totalHrs } = useSelector((state) => state.task);

  const [task, setTask] = useState(initialFormData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: name === "hr" ? +value : value });
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (totalHrs + +task.hr > 168) {
      return alert("you have exceed the total allocated time for the week");
    }
    dispatch(addTask(task));
  };
  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col>
          <Form.Control
            data-toggle="tooltip"
            data-placement="top"
            title="AddTask Please"
            placeholder="Task Name"
            onChange={handleOnChange}
            value={task.title}
            name="title"
            required
          />
        </Col>
        <Col>
          <Form.Control
            data-toggle="tooltip"
            data-placement="top"
            title="Add HOur Only"
            placeholder="Number of hours"
            value={task.hr}
            required
            onChange={handleOnChange}
            name="hr"
          />
        </Col>
        <Col>
          {" "}
          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
