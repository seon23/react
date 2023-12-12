import './App.css';
import Box from './components/Box';
import Title from './components/TItle';

function App() {
  return (
    <>
      <Box
        borderWidth='2px'
        borderColor='blue'
        borderStyle='solid'
        padding='4px'
        margin='2px'
      >
        <Title title='React Tutorial' color='red'>
          sub title: react basic
        </Title>
      </Box>
    </>
  );
}

export default App;
