import React, { Component } from 'react'


import Header from './components/header'
import Recommend from './components/recommend'
import AppList from './components/appList'
import Loading from './components/loading'



export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Recommend />
                <AppList />
                <Loading />
            </div>
        )
    }
}
