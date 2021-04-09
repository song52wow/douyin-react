import React from "react";
import { HomeHeader } from "../../components/HomeHeader";
import videoLists from '../../video.json'
import './index.css'

export class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      videoLists: [],
      currPage: 1,
      pageSize: 10
    }
  }

  componentDidMount() {
    this.renderVideoLists()
  }

  renderVideoLists() {
    const list = []

    for (let i = 0;i < this.state.pageSize; i++) {
      list.push(videoLists[(this.state.currPage - 1) * this.state.pageSize + i].video.playAddr)
    }

    this.setState({
      videoLists: this.state.videoLists.concat(list)
    })
  }

  render() {
    return (
      <div className="home">
        {/* <HomeHeader /> */}

        {
          this.state.videoLists.map((ele, index) => (
            // <video key={ele} width="100%" height="100%">
            //   <source src={ele} type="video/mp4"></source>
            // </video>
            <iframe key={ele} width="100%" height="100%" src={ele} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          ))
        }
      </div>
    )
  }
}

