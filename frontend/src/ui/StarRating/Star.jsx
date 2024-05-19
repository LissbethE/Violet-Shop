import React from "react";
import FullStar from "./FullStar";
import EmptyStar from "./EmptyStar";

const Star = function ({ onRating, onHoverIn, onHoverOut, full, size, color }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  ////////////////////////////////
  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRating}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? <FullStar color={color} /> : <EmptyStar color={color} />}
    </span>
  );
};

export default Star;
