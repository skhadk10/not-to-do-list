import React from "react";
import { Card, Button, Table, InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { taskSwitch } from "./taskAction";
import { setItemToDelete } from "./taskSlice";
export const TaskLists = () => {
  const dispatch = useDispatch();
  const { taskLists, itemToDelete } = useSelector((state) => state.task);

  return (
    <>
      <h2>
        Task Lists <i class="fas fa-info-circle"></i>
      </h2>
      <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>check</th>
            <th>Task</th>
            <th>Hours</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taskLists?.map((row, i) => (
            <tr key={i}>
              <td>
                <input
                  type="checkbox"
                  defaultValue={row._id}
                  onChange={(e) => dispatch(setItemToDelete(e.target))}
                  checked={itemToDelete?.includes(row._id)}
                />
                {""}
              </td>
              <td>{row?.title}</td>
              <td>{row?.hr}</td>
              <td>
                <button
                  data-toggle="tooltip"
                  data-placement="top"
                  title="it move to Not TO DO List"
                  onClick={() =>
                    dispatch(
                      taskSwitch({
                        _id: row._id,
                        todo: false,
                      })
                    )
                  }
                >
                  Mark as not to
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
