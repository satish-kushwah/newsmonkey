import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
function App() {
  let pageSize = 9;
  // apiKey = process.env.REACT_APP_NEWS_API;
  let apiKey = "f02319e73a294795ab492d73bacfb14c";
  const [progress, setProgress] = useState(0)
  // state = {
  //   progress: 0
  // }
  // setProgress = (progress) => {
  //   setState({ progress: progress })
  // }
  return (
    <>
      <BrowserRouter>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <Routes>
          {/* <News setProgress={setProgress} akiKey={apiKey} pageSize={pageSize} category="technology" /> */}
          <Route exact path="/" element={<News setProgress={setProgress} akiKey={apiKey} key="general" pageSize={pageSize} category="general" />} />
          <Route exact path="/home" element={<News setProgress={setProgress} akiKey={apiKey} key="general" pageSize={pageSize} category="general" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} akiKey={apiKey} key="business" pageSize={pageSize} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} akiKey={apiKey} key="entertainment" pageSize={pageSize} category="entertainment" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} akiKey={apiKey} key="health" pageSize={pageSize} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} akiKey={apiKey} key="science" pageSize={pageSize} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} akiKey={apiKey} key="sports" pageSize={pageSize} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} akiKey={apiKey} key="technology" pageSize={pageSize} category="technology" />} />

        </Routes>
      </BrowserRouter>
    </>
  )

}
export default App;