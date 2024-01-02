import './App.css';
import { Nav } from './Nav';
import { Home } from './components/Home';
import Login from './components/Login';
import My from './components/My';
import { NotFound } from './components/NotFound';
import { SessionContextProvider } from './hooks/session-context';

import { Route, Routes } from 'react-router-dom';
import { Item } from './components/Item';
import { ItemLayout } from './components/ItemLayout';

function App() {
  return (
    <SessionContextProvider>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/test' element={<h1>Test Page!</h1>}></Route>
        <Route path='/login' element={<Login />} />
        <Route path='/my' element={<My />} />
        <Route path='/items' element={<ItemLayout />}>
          <Route index element={<Item />} />
        </Route>
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
    </SessionContextProvider>
  );
}

export default App;
