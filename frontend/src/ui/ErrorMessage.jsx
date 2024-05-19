function ErrorMessage({ children }) {
  return (
    <div className="error">
      <p> {children} </p>
    </div>
  );
}

export default ErrorMessage;
