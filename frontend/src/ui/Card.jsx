function Card({ data }) {
  return (
    <div className={`card`}>
      <div className="card__content">
        <div className="square u-margin-bottom-small">
          <p className="square__text">{data.trending}</p>
        </div>

        <h1 className="heading-1 heading-1--hero">{data.title}</h1>

        {data.offer && (
          <small className="small small--hero">
            Starting at
            <span className="small__price">{data.offer}</span>
          </small>
        )}
      </div>

      <img
        src={`/img/promotional/${data.img}`}
        alt="img"
        className={`card__img ${
          data.img === 'hero--2.jpg' ? 'card__img--2' : ''
        }`}
      />
    </div>
  );
}

export default Card;
