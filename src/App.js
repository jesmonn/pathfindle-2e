import './App.css';
import { Daily } from './Daily';
import { Unlimited } from './Unlimited';
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import { titleTextStyleBold } from './styles';

function App() {

  return <div className='App'>
    <Router style={{overflowY: 'hidden'}}>
      <div style={{
        backgroundColor: 'darkred',
        boxShadow: '0px 0px 15px #8B0000',
      }}>
        <Link to={"/"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '20vw', marginRight: '2vw'}}>Daily</Link>
        <Link to={"/unlimited"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '2vw', marginRight: '20vw'}}>Unlimited</Link>
      </div>
      <Routes>
        <Route path="/" element={<Daily />} />
        <Route path="/unlimited" element={<Unlimited />} />
        <Route path="*" element={<h1 style={{...titleTextStyleBold, color: 'black', alignSelf: 'center'}}> That's Odd. There's nothing here. </h1>} />
      </Routes>
    </Router>
      
    </div>
}

export default App;