import './index.css'

const EmploymentType = props => {
  const {
    employmentType,
    addEmploymentTypeFilter,
    removeEmploymentTypeFilter,
  } = props

  const {label, employmentTypeId} = employmentType

  const onChangeCheckbox = event => {
    if (event.target.checked) {
      addEmploymentTypeFilter(employmentTypeId)
    } else {
      removeEmploymentTypeFilter(employmentTypeId)
    }
  }

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className="checkbox"
        id={employmentTypeId}
        onChange={onChangeCheckbox}
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </div>
  )
}

export default EmploymentType
