const CheckRadioButton = ({ name, type, label, value, isChecked, handleChange, wrapperClasses }) => {
  return (
    <div className={wrapperClasses}>
      <input type={type} className='custom-radio' name={name} id={name} checked={isChecked} onChange={handleChange} />
      <label htmlFor={name}>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default CheckRadioButton;
