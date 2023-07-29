import React from 'react'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE } from '../state/action-types'
import {useSelector, useDispatch } from 'react-redux'


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
        <div className="cog active" style={{ "--i": wheelState }}>
          B
        </div>
        <div className="cog" style={{ "--i": (wheelState + 1) % 6 }}></div>
        <div className="cog" style={{ "--i": (wheelState + 2) % 6 }}></div>
        <div className="cog" style={{ "--i": (wheelState + 3) % 6 }}></div>
        <div className="cog" style={{ "--i": (wheelState + 4) % 6 }}></div>
        <div className="cog" style={{ "--i": (wheelState + 5) % 6 }}></div>
      </div>
      <div id="keypad">
        <button type="button" onClick={handleMoveCounterClockwise} id="counterClockwiseBtn">
          Counter clockwise
        </button>
        <button type="button" onClick={handleMoveClockwise} id="clockwiseBtn">
          Clockwise
        </button>
      </div>
    </div>
  );
}