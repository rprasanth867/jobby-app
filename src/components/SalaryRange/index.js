import './index.css'

const SalaryRange = props => {
  const {salaryRange, changeSalaryRange} = props
  const {salaryRangeId, label} = salaryRange
  const onChangeRadio = event => {
    changeSalaryRange(event.target.value)
  }
  return (
    <div className="checkbox-container">
      <input
        type="radio"
        className="checkbox"
        id={salaryRangeId}
        name="salary_range"
        onChange={onChangeRadio}
        value={salaryRangeId}
      />
      <label htmlFor={salaryRangeId} className="checkbox-label">
        {label}
      </label>
    </div>
  )
}

export default SalaryRange
