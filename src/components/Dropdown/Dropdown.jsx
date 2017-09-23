import React from 'react'
import classes from './Dropdown.scss'

const Dropdown = (props) => {
  const options = props.optionList.map(data => (
    <option value={data.value} key={data.value}>
      {data.label}
    </option>
  ))
  return (
    <select className={classes.selected} onChange={props.onChange}>
      {options}
    </select>
  )
}

Dropdown.propTypes = {
  optionList: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func
}

export default Dropdown
