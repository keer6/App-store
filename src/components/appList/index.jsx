import React, { Component } from 'react'
import Lazyimg from 'react-lazyimg-component';
import store from '../../store'

import { getAppList } from './../../api/apiApp'
import Loading from './../loading'
import Star from './../star'

import './index.sass'


export default class AppList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            appList: [], // 存储数据-app列表
            hasMore: true,// 判断接口是否还有数据，通过接口设置
            pageIndex: 1, // 翻页页码
            displayName: 'none', // loading组件是否隐藏
            searchText: store.getState().searchText || '',
        }
        store.subscribe(
            this.handleStoreChange
        )
    }
    componentDidMount() {
        this.getData();
        this.addScrollEvent()
    }

    render() {
        // 定义一张占位符图片
        let baseUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAEXRFWHRTb2Z0d2FyZQBTbmlwYXN0ZV0Xzt0AAAANSURBVAiZY7h79+5/AAjJA5eNquzvAAAAAElFTkSuQmCC'

        return (
            <div className="app_content" ref='wrapper'>
                {this.state.appList.length > 0 ?
                    this.state.appList.map((item, index) => {
                        return (
                            <div className="app_list" key={index}>
                                <div className="count">{index + 1}</div>
                                <div className="img" style={{
                                    display: this.state.searchText === '' ? 'block' : 'none'
                                }}>
                                    <picture>
                                        <source media="(min-width: 414px)" srcSet={item['im:image'][2].label} />
                                        <source media="(max-width: 375px)" srcSet={item['im:image'][1].label} />
                                        <Lazyimg
                                            className="lazy"
                                            placeholder={baseUrl}
                                            src={item['im:image'][0].label}
                                        />
                                    </picture>
                                </div>
                                <div className="content">
                                    <p className="title">
                                        {item.title.label}
                                    </p>
                                    <p className="describe">
                                        {item.category.attributes.label}
                                    </p>
                                    <p>
                                        <Star name={
                                            Math.ceil(Math.random() * 10)
                                        } />
                                        &nbsp;
                                        <span className="score">({Math.ceil(Math.random() * 100)})</span>
                                    </p>
                                </div>
                            </div>
                        )
                    }) :
                    <p className="not_data">暂无数据</p>}
                <Loading display_name={this.state.displayName} />
            </div >
        )
    }
    // 加载更多数据方法
    loadMoreFn = (wrapper) => {
        // 当 wrapper 已经被滚动到页面可视范围之内触发
        var wScrollY = window.scrollY; // 当前滚动条位置
        var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
        var bScrollH = document.body.scrollHeight; // 滚动条总高度
        if (wScrollY + wInnerH >= bScrollH) {
            this.setState({
                pageIndex: this.state.pageIndex + 1
            }, () => {
                this.getData()
            })
        }
    }
    // 监听store 方法
    handleStoreChange = () => {
        this.setState({
            page: 1,
            appList: [],
            hasMore: true,
            searchText: store.getState().searchText || ''
        }, () => {
            this.getData()
        })

    }
    // 添加监听屏幕滚动事件
    addScrollEvent() {
        let timeCount = null
        window.addEventListener('scroll', () => {
            if (!this.state.hasMore) {
                return false
            }
            if (timeCount) {
                clearTimeout(timeCount);
            }
            timeCount = setTimeout(() => {
                this.loadMoreFn()
                timeCount = null;
            }, 100);
        }, false)
    }
    // 获取数据的方法
    getData = () => {
        const params = {
            q: this.state.searchText,
            _page: this.state.pageIndex
        }
        this.setState({
            displayName: 'block'
        })
        getAppList(params).then(res => {
            if (!res.length) {
                return this.setState({
                    hasMore: false,
                    displayName: 'none'
                })
            }
            let list = this.state.appList.concat(res)
            this.setState({
                appList: [...list],
            })
            // 模拟数据延迟效果
            setTimeout(() => {
                this.setState({
                    displayName: 'none'
                })
            }, 30)
        }).catch(rej => {
            console.log(rej);

        })
    }
}
