import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
// import { useTelegram } from './hooks';
import HomeScreen from './screen/Home';

function App() {
  // const { userRawData, userIOnitData, initDataRaw } = useTelegram();
  // console.log('🚀 ~ App ~ userRawData:', userRawData);
  // console.log('🚀 ~ App ~ initDataRaw:', initDataRaw);
  // console.log('🚀 ~ App ~ userIOnitData:', userIOnitData);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
