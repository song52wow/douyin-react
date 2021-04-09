import React from "react";
import { Menu } from "../Menu";

export class HomeHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lists: ["地区", "关注", "推荐"],
      active: 2
    }
  }

  render() {
    return (
      <div className="home-header">
        <span>直播</span>

        <Menu
          className="home-header-nav"
          lists={this.state.lists}
          active={this.state.active}
        />

        <span>查询</span>
      </div>
    )
  }
}