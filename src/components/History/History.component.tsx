import React from "react";
import "./History.style.scss";
const History: React.FunctionComponent = (props) => {
  return (
    <div className="overflowWrapper">
      <div className="historyWrapper">{props.children}</div>
    </div>
  );
};

export default History;
