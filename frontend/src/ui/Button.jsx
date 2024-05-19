import { Link } from 'react-router-dom';

function Button({ children, onClick, disabled, type, to }) {
  const styles = {
    round: 'button button--round',
    primary: 'button button--primary',
    primarySmall: 'button button--primary button--primary--small',
    dark: 'button button--primary button--primary--dark',
    white: 'button button--primary button--primary--white',
    transparent: 'button button--primary button--primary--transparent',
    secondary: 'button button--secondary',
    btnHover: 'button button--btnHover',
  };

  if (to)
    return (
      <Link to={to} disabled={disabled} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
