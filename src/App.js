import './App.css';
import { Home } from './views/Home';
import { Create } from './views/Create';
import { Edit } from './views/Edit';

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
