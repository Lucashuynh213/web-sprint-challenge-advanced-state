import React from "react";
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from "../state/action-types";
import { useSelector, useDispatch } from "react-redux";

export default function Wheel() {
  const wheelState = useSelector((state) => state.wheel);
  const dispatch = useDispatch();

  const handleMoveCounterClockwise = () => {
    dispatch({ type: MOVE_COUNTERCLOCKWISE });
  };

  const handleMoveClockwise = () => {
    dispatch({ type: MOVE_CLOCKWISE });
  };

  return (
    <div id="wrapper">
      <div id="wheel">
      <div
          className={`cog ${wheelState === 0 ? "active" : ""}`}
          style={{ "--i": 0 }}
        >
          {`${wheelState === 0 ? "B" : ""}`}
        </div>
        <div
          className={`cog ${wheelState === 1 ? "active" : ""}`}
          style={{ "--i": 1 }}
        >{`${wheelState === 1 ? "B" : ""}`}</div>
        <div
          className={`cog ${wheelState === 2 ? "active" : ""}`}
          style={{ "--i": 2 }}
        >{`${wheelState === 2 ? "B" : ""}`}</div>
        <div
          className={`cog ${wheelState === 3 ? "active" : ""}`}
          style={{ "--i": 3 }}
        >{`${wheelState === 3 ? "B" : ""}`}</div>
        <div
          className={`cog ${wheelState === 4 ? "active" : ""}`}
          style={{ "--i": 4 }}
        >{`${wheelState === 4 ? "B" : ""}`}</div>
        <div
          className={`cog ${wheelState === 5 ? "active" : ""}`}
          style={{ "--i": 5 }}
        >{`${wheelState === 5 ? "B" : ""}`}</div>
      </div>
      <div id="keypad">
        <button
          id="counterClockwiseBtn"
          className="counterClockwiseBtn"
          type="button"
          onClick={handleMoveCounterClockwise}
        >
          Counter clockwise
        </button>
        <button id="clockwiseBtn" type="button" onClick={handleMoveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}
