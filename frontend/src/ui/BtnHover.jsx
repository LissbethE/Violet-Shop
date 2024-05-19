import { Link } from 'react-router-dom';

function BtnHover({ children, onClick, active, disabled, to, modal }) {
  let twoElements = '';

  if (children.length > 1) twoElements = 'twoElements';

  const sameClass = `btnHover btnHover--${twoElements} ${
    modal ? 'btnHover--modal' : ''
  } ${active ? 'btnHover--active' : ''}`;

  ////////////////////////////

  if (to)
    return (
      <Link to={to} disabled={disabled} className={sameClass}>
        {children}
      </Link>
    );

  ////////////////////////////
  return (
    <button disabled={disabled} className={sameClass} onClick={onClick}>
      {children}
    </button>
  );
}

export default BtnHover;
