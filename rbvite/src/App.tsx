import './App.css';

function App() {
  console.log('Render App!');

  return (
    <>
      <Hello>안녕하세요.</Hello>
      {/* LoginUser ? <Login /> : <Profile /> */}
      <Login />
      <Profile />
      <My />
    </>
  );
}

export default App;
