import { useMemo } from 'react';
import './App.css';
import { Nav } from './Nav';
import { MemoHello } from './components/Hello';
import { Home } from './components/Home';
import Login from './components/Login';
import My from './components/My';
import { NotFound } from './components/NotFound';
import { useCounter } from './hooks/counter-context';
import { SessionContextProvider } from './hooks/session-context';

import { Route, Routes } from 'react-router-dom';
import { ItemLayout } from './components/ItemLayout';

function App() {
  const { count } = useCounter();
  //   const fn = useCallback(() => 'FN!', []);
  // 이부분 어떻게?
  const age = useMemo(() => count + 1, []);
  return (
    <SessionContextProvider>
      <Nav />
      <Routes>
        {/* <Route path='/ttt' element={<h1>TTT</h1>}></Route> */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my' element={<My />} />
        <Route path='/items' element={<ItemLayout />} />
        {/* <Route path='/items/:id' element={<Item />} /> */}
        <Route path='/hello' element={<MemoHello age={0} />} />
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>
    </SessionContextProvider>
  );
}

export default App;
