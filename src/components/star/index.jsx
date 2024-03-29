import React, { Component } from 'react';


export default class Star extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //接到页面传过来的值    
      //因为当前页面显示五颗星，而分数是十分所以要去平均值，
      num: this.props.name / 2,
      //根据页面当中的星星的数量来设置默认值
      arr: [1, 2, 3, 4, 5]
    }
  }
  render() {
    return (
      <span>
        {
          this.state.arr.map((ele, index) => {
            return (
              <span key={index}>
                {ele >= this.state.num ? <span style={{ color: "#FFAC2D", fontSize: "16px" }}>☆</span> : <span style={{ color: "#FFAC2D", fontSize: "16px" }}>★</span>}
              </span>
            )
          })
        }
      </span>
    )
  }
}