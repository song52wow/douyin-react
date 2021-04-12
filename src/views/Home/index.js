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

      docHalfScreenSize: document.documentElement.clientHeight / 2,

      touchStartY: 0,
      touchMoveY: 0,
      scrollSwitch: false
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
    console.log('Touch Start', t.touches[0].clientY)

    // 记录手指触碰位置
    this.setState({
      touchStartY: t.touches[0].clientY,
      scrollSwitch: false
    })
  }

  /**
   * 手指移动
   * @param {import("react").TouchEvent} t 
   */
  touchMove(t) {
    const cY = t.touches[0].clientY

    const move = ((cY - this.state.touchStartY) * -1) + this.state.currVideoHeight

    console.log('Touch move', cY, move)

    this.setScroll(move).setState({
      touchMoveY: move,
      scrollSwitch: true
    })


  }

  /**
   * 手指松开
   * @param {import("react").TouchEvent} t 
   */
  touchEnd(t) {
    if(!this.state.scrollSwitch) return

    const docHeight = document.documentElement.clientHeight

    const currVideoScroll = this.state.currVideoIndex * docHeight
    const nextVideoHeight = currVideoScroll + docHeight

    console.log('Touch End', this.state.touchMoveY, nextVideoHeight - this.state.docHalfScreenSize)

    if (this.state.touchMoveY > nextVideoHeight - this.state.docHalfScreenSize) {
      this.setScroll(nextVideoHeight).setState({
        currVideoIndex: this.state.currVideoIndex + 1,
        currVideoHeight: nextVideoHeight,
        touchMoveY: nextVideoHeight
      })
    }
    // else if (this.state.touchMoveY < nextVideoHeight + this.state.docHalfScreenSize) {
    //   this.setScroll(nextVideoHeight).setState({
    //     currVideoIndex: this.state.currVideoIndex - 1,
    //     currVideoHeight: currVideoScroll,
    //     touchMoveY: currVideoScroll
    //   })
    // }
    else {
      this.setScroll(currVideoScroll)
    }
    

  }

  setScroll(n) {
    this.homeRef.current.scrollTop = n

    return this
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

