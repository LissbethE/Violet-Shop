import BtnHover from './BtnHover';
import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <BtnHover type="button" className="btnHover" onClick={toggleDarkMode}>
      {isDarkMode ? (
        <svg className="btnHover__icon">
          <use xlinkHref={`/img/sprite.svg#icon-light-up`}></use>
        </svg>
      ) : (
        <svg className="btnHover__icon">
          <use xlinkHref={`/img/sprite.svg#icon-moon`}></use>
        </svg>
      )}
    </BtnHover>
  );
}

export default DarkModeToggle;
