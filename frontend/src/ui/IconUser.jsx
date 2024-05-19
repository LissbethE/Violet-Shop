import BtnHover from './BtnHover';

function IconUser({ noShow }) {
  return (
    <BtnHover type="button" className={`btnHover ${noShow}`}>
      <svg className="btnHover__icon">
        <use xlinkHref="/img/sprite.svg#icon-user"></use>
      </svg>
    </BtnHover>
  );
}

export default IconUser;
