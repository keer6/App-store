import React, { Component } from 'react'

import './index.sass'
export default class Loading extends Component {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     display_name:'none'
  //   }
  // }

  render() {
    return (
      <div className="loading" style={{
        display:this.props.display_name || 'none'
      }}>
        <div>
          {/* <span className="iconfont">&#xe69a;</span> */}
          <img src={require("./../../assets/loading.png")} alt="" />
          <p>拼命加载中，请稍后~</p>
        </div>
      </div >
    )
  }
}
