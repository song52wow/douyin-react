import './App.css';
import { Menu } from './components/Menu';
import { Home } from './views/Home';

function App() {
  return (
    <div className="App">
      <div className="main">
        <Home />
      </div>
      <Menu lists={["首页", "朋友", "消息", "我"]} active={0} />
    </div>
  );
}

export default App;
