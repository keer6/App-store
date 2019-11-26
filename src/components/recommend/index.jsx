import React, { Component } from 'react'
import store from '../../store'
import Lazyimg from 'react-lazyimg-component';

import { getRecomendList } from './../../api/apiApp'

import './index.sass'

export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recomendList: [],
            pageIndex: 1,
            displayName: 'none', // loading组件是否隐藏
            searchText: store.getState().searchText || '',
        }
        store.subscribe(
            this.handleStoreChange
        )
    }

    componentDidMount() {
        this.getData()
    }
    render() {
        // 定义一张占位符图片
        let baseUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAANSURBVAiZY7h79+5/AAjJA5eNquzvAAAAAElFTkSuQmCC'

        return (
            <div className="recommend">
                <div className="rec_title">
                    <h3>推荐</h3>
                </div>
                <div className="rec_list">
                    <ul>
                        {
                            this.state.recomendList.length > 0 ?
                                this.state.recomendList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <picture>
                                                <source media="(min-width: 414px)" srcSet={item['im:image'][2].label} />
                                                <source media="(max-width: 375px)" srcSet={item['im:image'][1].label} />
                                                <Lazyimg
                                                    className="lazy"
                                                    placeholder={baseUrl}
                                                    src={item['im:image'][0].label}
                                                />
                                            </picture>
                                            <p>
                                                {item.title.label}
                                            </p>
                                            <span>
                                                {item.category.attributes.label}
                                            </span>
                                        </li>
                                    )
                                }) :
                                <p className="not_data">暂无数据</p>
                        }
                    </ul>
                </div>
            </div>
        )
    }
    handleStoreChange = () => {
        this.setState({
            pageIndex: 1,
            recomendList: [],
            searchText: store.getState().searchText || ''
        }, () => {
            this.getData()
        })

    }
    getData = () => {
        const params = {
            q: this.state.searchText,
            _page: this.state.pageIndex
        }
        getRecomendList(params).then(res => {
            if (!res.length) {
                return this.setState({
                    displayName: 'none'
                })
            }
            let list = this.state.recomendList.concat(res)
            this.setState({
                recomendList: [...list]
            })
        }).catch(rej => {
            console.log(rej);

        })
    }
}
