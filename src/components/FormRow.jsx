const FormRow = ({type, name, value, handleChange, labelText}) => {
    return (
      <div className="gap-3 flex flex-col">
        <label htmlFor={name} className="text-lg capitalize">
          {labelText || name}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-gray-700 p-1 px-2 min-w-0"
        />
      </div>
    );
}

export default FormRow