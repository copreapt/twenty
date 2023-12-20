const FormRow = ({type, name, value, handleChange, labelText}) => {
    return (
      <div className="gap-3 flex flex-col">
        <label htmlFor={name} className="text-lg">
          {labelText || name}
        </label>
        <input
          placeholder={value}
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-gray-700 p-1 px-2 placeholder:text-black"
        />
      </div>
    );
}

export default FormRow