import React from "react";
// import { HomeHeader } from "../../components/HomeHeader";
import videoLists from '../../video.json'
import './index.css'

export class Home extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      videoLists: [],
      currPage: 1,
      pageSize: 5,

      currVideoIndex: 0,
      currVideoHeight: 0,

      touchStartY: 0,
      touchMoveY: 0
    }

    this.homeRef = React.createRef()
  }

  pushVideoList() {
    const list = []

    const currStartIndex = (this.state.currPage - 1) * this.state.pageSize

    for (let i = 0; i < this.state.pageSize; i++) {
      list.push(`https://www.youtube.com/embed/${videoLists[i + currStartIndex]}`)
    }

    this.setState({
      videoLists: this.state.videoLists.concat(list)
    })
  }

  componentDidMount() {
    this.pushVideoList()
  }

  /**
   * 手指触碰
   * @param {import("react").TouchEvent} t 
   */
  touchStart(t) {
    console.log(t.touches[0].clientY)

    // 记录手指触碰位置
    this.setState({
      touchStartY: t.touches[0].clientY
    })
  }

  /**
   * 手指移动
   * @param {import("react").TouchEvent} t 
   */
  touchMove(t) {
    const cY = t.touches[0].clientY

    const move = ((cY - this.state.touchStartY) * -1) + this.state.currVideoHeight

    this.setState(state => {
      this.setScroll(move)

      return { 
        touchMoveY: move
      }
    })


  }

  touchEnd(t) {
    const docHeight = document.documentElement.clientHeight

    const currVideoHeight = this.state.currVideoIndex * docHeight + docHeight

    if (this.state.touchMoveY > currVideoHeight / 2) {
      this.setState({
        currVideoIndex: this.state.currVideoIndex + 1,
        currVideoHeight,
        touchMoveY: currVideoHeight
      })
      
      this.setScroll(currVideoHeight)
    }
    

  }

  setScroll(n) {
    this.homeRef.current.scrollTop = n
  }

  render() {

    return (
      <div ref={this.homeRef} className="home">
        <div
          className="home-scroll"
          onTouchStart={t => this.touchStart(t)}
          onTouchMove={t => this.touchMove(t)}
          onTouchEnd={t => this.touchEnd(t)}
        >
          <div className="home-video-list">
            {
              this.state.videoLists.map(ele => (
                <div key={ele} className="home-video">
                  <iframe
                    width="100%"
                    height="auto"
                    src={ele}
                    frameBorder="0"
                    // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

