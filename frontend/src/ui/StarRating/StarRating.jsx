import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Star from './Star';

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
};

const starContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

////////////////////////////////
const StarRating = function ({
  maxRating = 10,
  color = '#fcc419',
  size = 48,
  messages = [],
  defaultRating = 0,
  onSetRating,
  fixedRating = false,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  ////////////////////////////////
  const textStyle = {
    lineHeight: '1',
    margin: '0',
    color,
    fontSize: `${size / 1.5}px`,
    fontWeight: 'bold',
  };

  ////////////////////////////////
  const handleRating = (i) => {
    setRating((c) => (c === tempRating ? 0 : i + 1));
    onSetRating(i + 1);
  };
  const handleHoverIn = (i) => setTempRating(i + 1);
  const handleHoverOut = () => setTempRating(0);

  ////////////////////////////////

  return (
    <div style={containerStyle} className="star">
      <div style={starContainerStyle}>
        {Array.from({ length: +maxRating }, (_, i) =>
          fixedRating ? (
            <Star
              key={i}
              size={size}
              color={color}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            />
          ) : (
            <Star
              key={i}
              size={size}
              color={color}
              full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onRating={() => handleRating(i)}
              onHoverIn={() => handleHoverIn(i)}
              onHoverOut={handleHoverOut}
            />
          )
        )}
      </div>

      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ''}
      </p>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messagess: PropTypes.array,
  //className: PropTypes.string,
  onSetRating: PropTypes.func,
};

export default StarRating;
