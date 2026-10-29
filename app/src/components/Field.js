export default function Field({ label, name, error, ...inputProps }) {
  const id = `f-${name}`;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...inputProps} />
      {error && <p className="error" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}
