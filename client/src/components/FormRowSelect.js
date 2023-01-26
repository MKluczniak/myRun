const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        id={name} //just a reminder, needs to match the lable htmlFor so that the label is clickable
        name={name}
        value={value}
        onChange={handleChange}
        className="form-select"
      >
        {/* <option disabled>Choose an option</option> */}
        {list.map((itemValue, index) => {
          return (
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelect
