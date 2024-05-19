import ErrorMessage from './ErrorMessage';

function FormRow({ label, error, children, radio }) {
  return (
    <div className={`formRow ${radio ? 'formRow--radio' : ''}`}>
      {label && (
        <label htmlFor={children.props.id} className="formRow__label">
          {label}
        </label>
      )}

      {children}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
}

export default FormRow;
