import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
export default class App extends Component {
  pageSize = 9;
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            {/* <News setProgress={this.setProgress} akiKey={this.apiKey} pageSize={this.pageSize} category="technology" /> */}
            <Route exact path="/" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="general" pageSize={this.pageSize} category="general" />} />
            <Route exact path="/home" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="general" pageSize={this.pageSize} category="general" />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="business" pageSize={this.pageSize} category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="health" pageSize={this.pageSize} category="health" />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="science" pageSize={this.pageSize} category="science" />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="sports" pageSize={this.pageSize} category="sports" />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} akiKey={this.apiKey} key="technology" pageSize={this.pageSize} category="technology" />} />

          </Routes>
        </BrowserRouter>
      </>
    )
  }
}
