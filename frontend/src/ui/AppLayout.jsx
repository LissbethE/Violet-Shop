import { Outlet } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

function AppLayout() {
  return (
    <>
      <Nav />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;
