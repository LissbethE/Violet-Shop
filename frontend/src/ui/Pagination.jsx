import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../features/product/useProducts';
import BtnHover from './BtnHover';

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { limit, countProducts } = useProducts();

  const currentPage = !searchParams.get('page')
    ? 1
    : Number(searchParams.get('page'));

  const pageCount = Math.ceil(countProducts / limit);

  //////////////////////////

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  //////////////////////////

  return (
    <div className="pagination">
      <p className="pagination__paragraph">
        Showing <span>{(currentPage - 1) * limit + 1}</span> to{' '}
        <span>
          {currentPage === pageCount ? countProducts : currentPage * limit}
        </span>{' '}
        of <span>{countProducts}</span> results
      </p>

      <div className="pagination__btns">
        <BtnHover onClick={prevPage} disabled={currentPage === 1}>
          <span>&larr; Previous</span>
        </BtnHover>

        <BtnHover onClick={nextPage} disabled={currentPage === pageCount}>
          <span>Next &rarr;</span>
        </BtnHover>
      </div>
    </div>
  );
}

export default Pagination;
