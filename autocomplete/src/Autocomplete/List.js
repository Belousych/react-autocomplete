import React from 'react'

const List = ({ list, className, handleClick }) => {
  const items = list.map(item => (
    <li
      key={item.Id}
      className="autocomplete__item"
      onClick={(e) => handleClick(item.City)}
    >
      {item.City}
    </li>
  ))
  return (
    <ul className={className}>
      {items}
    </ul>
  )
}

List.defaultProps = {
  list: []
}

export default List
