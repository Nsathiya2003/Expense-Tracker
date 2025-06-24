export default function CustomInput({
  label,
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
  className = "",
  error,
  ...rest
  
}) {
    

  return (
    <>
      <div className="custom-input">
        {/* {label && (
          <label htmlFor={id} className="custom-label">
            {label}
          </label>
        )} */}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className}`}
        />
      </div>
    </>
  );
}
