import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function Authentication() {
  const [isAccount, setAccount] = useState(true);

  return (
    <div className="authentication">
      {isAccount && (
        <>
          <Login />

          <p className="paragraph paragraph--account">
            Don&rsquo;t have an account?
            <span onClick={() => setAccount(false)}>Sign up for free.</span>
          </p>
        </>
      )}

      {!isAccount && (
        <>
          <Signup />

          <p className="paragraph paragraph--account">
            Do you already have an account?
            <span onClick={() => setAccount(true)}>Enter</span>
          </p>
        </>
      )}
    </div>
  );
}

export default Authentication;
