import React, { Suspense } from 'react';
import './App.css';
import { Menu } from './components/Menu';
// import { Home } from './views/Home';

const Home = React.lazy(() => import('./views/Home'))

function App() {
  return (
    <div className="App">
      <div className="main">
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      </div>
      <Menu lists={["首页", "朋友", "消息", "我"]} active={0} />
    </div>
  );
}

export default App;
