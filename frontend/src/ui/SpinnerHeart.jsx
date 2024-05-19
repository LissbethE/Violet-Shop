import { createPortal } from 'react-dom';
import { useDarkMode } from '../context/DarkModeContext';

function SpinnerHeart() {
  const { isDarkMode } = useDarkMode();

  return createPortal(
    <div className="spinnerHeart">
      {isDarkMode ? (
        <img src="/gif/dark-heart.gif" className="spinnerHeart__img" />
      ) : (
        <img src="/gif/light-heart.gif" className="spinnerHeart__img" />
      )}
    </div>,
    document.body
  );
}

export default SpinnerHeart;
