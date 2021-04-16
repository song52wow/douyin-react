import React, { useEffect, useState } from "react";
// import { HomeHeader } from "../../components/HomeHeader";
import videoLists from '../../video.json'
import './index.css'

export default function () {
  
  const [videoLists, setVideoLists] =  useState([])
  const [currPage, setCurrPage] =  useState(1)
  const [pageSize, setPageSize] =  useState(5)

  const [currVideoIndex, setCurrVideoIndex] = useState(0)
  const [currVideoHeight, setCurrVideoHeight] = useState(0)

  const [docHalfScreenSize, setDocHalfScreenSize] = useState(document.documentElement.clientHeight / 2)

  const [touchStartY, setTouchStartY] = useState(0)
  const [touchMoveY, setTouchMoveY] = useState(0)
  // 拖动开关
  const [scrollSwitch, setScrollSwitch] = useState(true)
  // 动画延迟开关
  const [transition, setTransition] = useState(false)

  const homeScrollRef = React.createRef()



  const pushVideoList = () => {
    const list = []

    const currStartIndex = (currPage - 1) * pageSize

    for (let i = 0; i < pageSize; i++) {
      list.push(`https://www.youtube.com/embed/${videoLists[i + currStartIndex]}`)
    }

    // setVideoLists([...videoLists, ...list])
  }

  /**
   * 手指触碰
   * @param {import("react").TouchEvent} t 
   */
  const touchStart = (t) => {
    if (!scrollSwitch) return
    
    // 记录手指触碰位置
    setTouchStartY(t.touches[0].clientY)
    setTransition(false)
  }

  /**
   * 手指移动
   * @param {import("react").TouchEvent} t 
   */
  const touchMove = (t) => {
    if(transition) return

    const cY = t.touches[0].clientY

    const move = ((cY - touchStartY) * -1) + currVideoHeight

    setTouchMoveY(move)
  }

  /**
   * 手指松开
   * @param {import("react").TouchEvent} t 
   */
  const touchEnd = (t) => {
    if(transition) return

    const docHeight = document.documentElement.clientHeight

    const currVideoScroll = currVideoIndex * docHeight
    const prevVideo = currVideoScroll - docHeight
    const nextVideo = currVideoScroll + docHeight

    setTransition(true)
    setScrollSwitch(false)

    if (touchMoveY > nextVideo - docHalfScreenSize) {
      setCurrVideoIndex(currVideoIndex++)
      setCurrVideoHeight(nextVideo)
      setTouchMoveY(nextVideo)
    } else if (touchMoveY < currVideoScroll - docHalfScreenSize) {
      setCurrVideoIndex(currVideoIndex--)
      setCurrVideoHeight(prevVideo)
      setTouchMoveY(prevVideo)
    } else {
      setTouchMoveY(currVideoScroll)
    }

  }

  /**
   * 动画结束
   */
  const transitionEnd = ()  =>{
    setScrollSwitch(true)
  }

  useEffect(() => {
    pushVideoList()
  }, [JSON.stringify(videoLists)])

  let homeScrollClass = 'home-scroll'

  if (transition) {
    homeScrollClass += ' transition'
  }

  return (
    <div className="home">
      <div
        ref={homeScrollRef}
        className={homeScrollClass}
        onTouchStart={t => touchStart(t)}
        onTouchMove={t => touchMove(t)}
        onTouchEnd={t => touchEnd(t)}
        onTransitionEnd={() => transitionEnd()}
        style={{
          transform: `translateY(-${touchMoveY}px)`
        }}
      >
        <div className="home-video-list">
          {
            // videoLists.map((ele, index) => (
            //   <div key={ele} className="home-video">
            //     <iframe
            //       width="100%"
            //       height="auto"
            //       src={ele}
            //       frameBorder="0"
            //       allow={`accelerometer; ${index === currVideoIndex && 'autoplay'}; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
            //       allowFullScreen></iframe>
            //   </div>
            // ))
          }
        </div>
      </div>
    </div>
  )
}

// export default class extends React.Component {

// // export class Home extends React.Component {

//   constructor(props) {
//     super(props)

//     this.state = {
//       videoLists: [],
//       currPage: 1,
//       pageSize: 5,

//       currVideoIndex: 0,
//       currVideoHeight: 0,

//       docHalfScreenSize: document.documentElement.clientHeight / 2,

//       touchStartY: 0,
//       touchMoveY: 0,
//       // 拖动开关
//       scrollSwitch: true,
//       // 动画延迟开关
//       transition: false,
//     }

//     this.homeScrollRef = React.createRef()
//   }

//   pushVideoList() {
//     const list = []

//     const currStartIndex = (this.state.currPage - 1) * this.state.pageSize

//     for (let i = 0; i < this.state.pageSize; i++) {
//       list.push(`https://www.youtube.com/embed/${videoLists[i + currStartIndex]}`)
//     }

//     this.setState({
//       videoLists: [...this.state.videoLists, ...list]
//     })
//   }

//   componentDidMount() {
//     this.pushVideoList()
//   }

//   /**
//    * 手指触碰
//    * @param {import("react").TouchEvent} t 
//    */
//   touchStart(t) {
//     if(!this.state.scrollSwitch) return

//     // 记录手指触碰位置
//     this.setState({
//       touchStartY: t.touches[0].clientY,
//       transition: false
//     })
//   }

//   /**
//    * 手指移动
//    * @param {import("react").TouchEvent} t 
//    */
//   touchMove(t) {
//     if(this.state.transition) return

//     const cY = t.touches[0].clientY

//     const move = ((cY - this.state.touchStartY) * -1) + this.state.currVideoHeight

//     this.setState({
//       touchMoveY: move,
//     })

//     setTimeout(() => {
//       document.querySelector("input[clstag='pageclick|keycount|Shopcart_CheckProd|0_100009398625']").click()

//       document.getElementsByClassName('common-submit-btn')[0].click()
//     })
//   }

//   /**
//    * 手指松开
//    * @param {import("react").TouchEvent} t 
//    */
//   touchEnd(t) {
//     if(this.state.transition) return

//     const docHeight = document.documentElement.clientHeight

//     const currVideoScroll = this.state.currVideoIndex * docHeight
//     const prevVideo = currVideoScroll - docHeight
//     const nextVideo = currVideoScroll + docHeight

//     this.setState({
//       transition: true,
//       scrollSwitch: false
//     })

//     if (this.state.touchMoveY > nextVideo - this.state.docHalfScreenSize) {
//       this.setState({
//         currVideoIndex: this.state.currVideoIndex + 1,
//         currVideoHeight: nextVideo,
//         touchMoveY: nextVideo
//       })
//     } else if (this.state.touchMoveY < currVideoScroll - this.state.docHalfScreenSize) {
//       this.setState({
//         currVideoIndex: this.state.currVideoIndex - 1,
//         currVideoHeight: prevVideo,
//         touchMoveY: prevVideo
//       })
//     } else {
//       this.setState({
//         touchMoveY: currVideoScroll
//       })
//     }

//   }

//   /**
//    * 动画结束
//    */
//   transitionEnd() {
//     this.setState({
//       scrollSwitch: true
//     })
//   }

//   render() {
//     let homeScrollClass = 'home-scroll'

//     if (this.state.transition) {
//       homeScrollClass += ' transition'
//     }

//     return (
//       <div className="home">
//         <div
//           ref={this.homeScrollRef}
//           className={homeScrollClass}
//           onTouchStart={t => this.touchStart(t)}
//           onTouchMove={t => this.touchMove(t)}
//           onTouchEnd={t => this.touchEnd(t)}
//           onTransitionEnd={() => this.transitionEnd()}
//           style={{
//             transform: `translateY(-${this.state.touchMoveY}px)`
//           }}
//         >
//           <div className="home-video-list">
//             {
//               this.state.videoLists.map((ele, index) => (
//                 <div key={ele} className="home-video">
//                   <iframe
//                     width="100%"
//                     height="auto"
//                     src={ele}
//                     frameBorder="0"
//                     allow={`accelerometer; ${index === this.state.currVideoIndex && 'autoplay'}; clipboard-write; encrypted-media; gyroscope; picture-in-picture`}
//                     allowFullScreen></iframe>
//                 </div>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

