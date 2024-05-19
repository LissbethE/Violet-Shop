import { useState } from 'react';

function ToggleButton({ noShow }) {
  const [isOpen, setIOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIOpen((isOpen) => !isOpen)}
        className={`btnIcon hover-link ${noShow}`}
      >
        {isOpen ? (
          <svg className="btnIcon__icon">
            <use xlinkHref={`/img/sprite.svg#icon-cross`}></use>
          </svg>
        ) : (
          <svg className="btnIcon__icon">
            <use xlinkHref={`/img/sprite.svg#icon-menu`}></use>
          </svg>
        )}
      </button>
    </>
  );
}

export default ToggleButton;
