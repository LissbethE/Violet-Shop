import BtnHover from './BtnHover';
import Logo from './Logo';

function Footer() {
  return (
    <footer className="footer u-margin-top-medium">
      <section className="footer__content u-margin-bottom-small ">
        <Logo />

        <div className="footer__icons">
          <BtnHover type="button" className="btnHover">
            <svg className="btnHover__icon btnHover__icon--white-footer">
              <use xlinkHref={`/img/sprite.svg#icon-facebook2`}></use>
            </svg>
          </BtnHover>

          <BtnHover type="button" className="btnHover">
            <svg className="btnHover__icon btnHover__icon--white-footer">
              <use xlinkHref={`/img/sprite.svg#icon-instagram`}></use>
            </svg>
          </BtnHover>

          <BtnHover type="button" className="btnHover">
            <svg className="btnHover__icon btnHover__icon--white-footer">
              <use xlinkHref={`/img/sprite.svg#icon-twitter`}></use>
            </svg>
          </BtnHover>
        </div>
      </section>

      <p className="footer__copyright">
        &copy; by Lissbeth Escobar Cisneros | May 2024. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
