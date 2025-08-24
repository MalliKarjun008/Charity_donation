function Input({ id, label, className, error, ...props }) {
  return (
    <div className={`${className ? className : ""} flex flex-col`}>
      <div className={`border border-gray-300 rounded-lg px-5 py-3`}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} {...props} className="outline-none" />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
}

export default Input;
