import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputEl = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (query) {
      navigate(`/search/${query}/product`);
      setQuery('');
    } else {
      navigate('/');
    }
  };

  return (
    <form action="#" className="search" onSubmit={submitHandler}>
      <input
        type="text"
        className="search__input"
        placeholder="Search product..."
        value={query}
        onChange={(e) => {
          e.preventDefault();
          setQuery(e.target.value.toLowerCase());
        }}
        ref={inputEl}
      />

      <button type="button" className="search__btn">
        <svg className="search__icon">
          <use xlinkHref="/img/sprite.svg#icon-magnifying-glass"></use>
        </svg>
      </button>
    </form>
  );
}

export default Search;
