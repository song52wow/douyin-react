import React from 'react'
import './index.css'

export class Menu extends React.Component {
  constructor(props) {
    super(props)
  }

  navLists() {
    return this.props.lists.map((ele, index) => (
      <li
        key={ele}
        className={index === this.props.active ? 'active' : ''}>
        <span>{ele}</span>
      </li>
    ))
  }

  render() {
    const ulClass = `${this.props.className || "main-menu"} menu`

    return (
      <ul className={ulClass}>
        {this.navLists()}
      </ul>
    )
  }
}