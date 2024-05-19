import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="logo">
      <span>💜</span>
      <span>Violet&apos;s Shop</span>
    </Link>
  );
}

export default Logo;
