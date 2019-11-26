import React, { Component } from 'react'
import store from '../../store';

import './index.sass'
export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }
    render() {
        return (
            <div className="header">
                <div className="h_box">
                    <p className="h_font iconfont" style={{
                        display: this.state.search === "" ? 'block' : 'none'
                    }}>&#xe647; 搜索</p>
                    <input type="text" value={this.state.search} onChange={this.inputChange} />
                </div>
            </div>
        )
    }
    // input 监听方法
    inputChange = (e) => {
        this.setState({
            search: e.target.value
        })
        const action = {
            type: 'SEARCH_QUERY',
            value: e.target.value
        }
        store.dispatch(action)
        window.scrollTo(0, 0)
    }
}
