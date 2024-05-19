import { useSearchParams } from 'react-router-dom';
import BtnHover from './BtnHover';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(options, searchParams, setSearchParams);
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    // if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }

  return (
    <>
      {options?.map((option) => (
        <BtnHover
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          <p>{option.label}</p>

          <svg className="btnHover__icon btnHover__icon--rotate90">
            <use xlinkHref="/img/sprite.svg#icon-chevron-small-down"></use>
          </svg>
        </BtnHover>
      ))}
    </>
  );
}

export default Filter;
