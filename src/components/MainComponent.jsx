import React, { useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskCard from "../TaskCard";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
`;

const TaskColumnStyles = styled.div`
  display: flex;
  width: 100%;
  min-height: 78vh;
`;

const Title = styled.span`
  color: #996bd7;
  background: #1e1e2b;
  padding: 10px 10px;
  border-radius: 5px;
  align-self: flex-start;
  span {
    margin-right: 341px;
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;
const AddCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  color: #fff;
  font-size: 14px;
  background: #181923;
  margin: 10px;
  border-radius: 5px;
`;

const AddCardButton = styled.button`
  width: 341px;
  color: #fff;
  padding: 10px;
  font-size: 14px;
  background: #181923;
  border: none;
  cursor: pointer;
`;

const MainComponent = () => {
  const [columns, setColumns] = useState({
    todo: {
      title: "To Do",
      items: [],
    },
    inProgress: {
      title: "Doing",
      items: [],
    },
    completed: {
      title: "Done",
      items: [],
    },
  });
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [targetColumn, setTargetColumn] = useState("");

  const moveTask = (taskId, destinationColumn) => {
    const updatedColumns = { ...columns };
    const sourceColumn = Object.values(updatedColumns).find((column) =>
      column.items.find((item) => item.id === taskId)
    );

    const destinationColumnId = Object.keys(updatedColumns).find(
      (columnId) => updatedColumns[columnId].title === destinationColumn
    );

    const taskIndex = sourceColumn.items.findIndex(
      (task) => task.id === taskId
    );
    const [task] = sourceColumn.items.splice(taskIndex, 1);

    updatedColumns[destinationColumnId].items.push(task);

    setColumns(updatedColumns);
  };

  const addTaskToColumn = () => {
    if (!newTaskName.trim() || !newTaskDueDate.trim() || !targetColumn) {
      return; // Prevent adding empty task or if targetColumn is not set
    }

    const newTask = {
      id: uuidv4(),
      Task: newTaskName,
      Due_Date: newTaskDueDate,
    };

    const updatedColumns = { ...columns };
    const columnId = Object.keys(updatedColumns).find(
      (columnId) => updatedColumns[columnId].title === targetColumn
    );

    updatedColumns[columnId].items.push(newTask);

    setColumns(updatedColumns);
    setNewTaskName("");
    setNewTaskDueDate("");
    setTargetColumn(""); // Reset targetColumn after adding the task
    setShowDialog(false); // Close the dialog after adding the task
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If there is no destination, or if the task was dropped back into its original position, do nothing
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const newSourceItems = [...sourceColumn.items];
    const newDestItems = [...destColumn.items];

    // Remove the task from the source column
    const [movedTask] = newSourceItems.splice(source.index, 1);

    // Add the task to the destination column
    newDestItems.splice(destination.index, 0, movedTask);

    // Update the state with the new column data
    setColumns({
      ...columns,
      [source.droppableId]: { ...sourceColumn, items: newSourceItems },
      [destination.droppableId]: { ...destColumn, items: newDestItems },
    });
  };

  const handleAddTaskClick = (columnTitle) => {
    setShowDialog(true);
    setTargetColumn(columnTitle); // Set the target column when adding a task
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setTargetColumn(""); // Reset targetColumn when closing the dialog
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div key={columnId}>
              <TaskColumnStyles>
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <TaskList
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <Title>
                        <span>{column.title}</span>
                        <i className="fa fa-ellipsis-v"></i>
                      </Title>
                      {column.items.map((item, index) => (
                        <TaskCard
                          key={item.id}
                          item={item}
                          index={index}
                          moveTask={moveTask}
                        />
                      ))}
                      {provided.placeholder}
                    </TaskList>
                  )}
                </Droppable>
              </TaskColumnStyles>
              <AddCardContainer className="add-card">
                <AddCardButton onClick={() => handleAddTaskClick(column.title)}>
                  + Add Another Card
                </AddCardButton>
              </AddCardContainer>
            </div>
          );
        })}
      </Container>
      {showDialog && (
        <Dialog>
          <input
            type="text"
            value={newTaskName}
            placeholder="Task Name"
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <input
            type="text"
            value={newTaskDueDate}
            placeholder="Date"
            onChange={(e) => setNewTaskDueDate(e.target.value)}
          />
          <button onClick={addTaskToColumn}>Add Task</button>
          <button onClick={handleDialogClose}>Cancel</button>
        </Dialog>
      )}
    </DragDropContext>
  );
};

export default MainComponent;
