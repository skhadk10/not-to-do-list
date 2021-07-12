import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { taskSwitch } from "./taskAction";
import { setItemToDelete } from "./taskSlice";
import {
  Card,
  Button,
  Table,
  InputGroup,
  Alert,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";

export const NoToDoList = () => {
  const dispatch = useDispatch();
  const { noToDoList, itemToDelete } = useSelector((state) => state.task);
  const totalSavedTime = noToDoList.reduce((subTtl, row) => subTtl + row.hr, 0);
  return (
    <>
      <h2>
        Not To Do list{" "}
        <i
          style={{ backgroundColor: "yellow", borderRadius: "5px" }}
          class="fas fa-info-circle"
          data-toggle="tooltip"
          data-placement="top"
          title="it move to TO DO List"
        ></i>
      </h2>
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>Task</th>
            <th>Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {noToDoList?.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={row._id}
                  onChange={(e) => dispatch(setItemToDelete(e.target))}
                  checked={itemToDelete?.includes(row._id)}
                />
                {""}
                <label>{row?.title}</label>
              </td>

              <td>{row?.hr}</td>
              <td>
                <button
                  data-toggle="tooltip"
                  data-placement="top"
                  title="it move to TO DO List"
                  onClick={() =>
                    dispatch(taskSwitch({ _id: row._id, todo: true }))
                  }
                >
                  Mark As TO DO
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Alert variant="success">
        <Alert.Heading>Hey, nice to see you</Alert.Heading>
        <p>your saved= {totalSavedTime} hours</p>
        <hr />
      </Alert>
    </>
  );
};
