import LoginForm from './LoginForm';

function Login() {
  return (
    <div className="login">
      <h1 className="heading-1 heading-1--auth">Welcome back.</h1>
      <p className="paragraph paragraph--auth u-margin-bottom-medium">
        It&rsquo;s nice to see you again :)
      </p>

      <LoginForm />
    </div>
  );
}

//  <h1>Log in to your account</h1>

export default Login;
