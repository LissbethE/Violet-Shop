import { useSearchParams } from 'react-router-dom';

function PageNotFound() {
  const [searchParams] = useSearchParams();

  if (searchParams.get('error')) {
    if (searchParams.get('error') === 'NoEresAdmin')
      return (
        <section className="section-padding pageError">
          <h1>Error</h1>
          <p>💥 You are not an administrator</p>
        </section>
      );
    else {
      return (
        <section className="section-padding  pageError">
          <h1>Error</h1>
          <p>💥 You are not logged in! Please login to get access.</p>
        </section>
      );
    }
  }

  return (
    <section className="section-padding pageError">
      <h1>Error</h1>
      <p>💥Page not found</p>
    </section>
  );
}

export default PageNotFound;
