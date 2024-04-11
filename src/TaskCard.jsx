import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";

const TaskInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 15px;
  min-height: 106px;
  font-size: 18px;
  border-radius: 5px;
  background: #181923;
  color: #fff;
  margin-top: 15px;

  .secondary-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 14px;
    font-weight: 400px;
    color: #fff;
  }
`;

const TaskCard = ({ item, index, moveTask }) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskInformation>
            <p>{item.Task}</p>
            <div className="secondary-details">
              <p>
                <i class="fa fa-clock-o"></i>
                <span>
                  {new Date(item.Due_Date).toLocaleDateString("en-us", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </p>
            </div>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
