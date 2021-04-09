import React from 'react'
import './index.css'

export class Menu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lists: ["首页", "朋友", "消息", "我"],
      active: 0
    }
  }

  render() {
    return (
      <ul className="menu">
        {
          this.state.lists.map((ele, index) => (
            <li key={ele} className={index === this.state.active ? 'active' : ''}>
              <span>{ele}</span>
            </li>
          ))
        }
      </ul>
    )
  }
}