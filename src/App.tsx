import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { useTelegram } from './hooks';
import HomeScreen from './screen/Home';

function App() {
  const { userRawData, userIOnitData, initDataRaw } = useTelegram();
  console.log('🚀 ~ App ~ userRawData:', userRawData);
  console.log('🚀 ~ App ~ initDataRaw:', initDataRaw);
  console.log('🚀 ~ App ~ userIOnitData:', userIOnitData);
  useEffect(() => {
    const token =
      'user=%7B%22id%22%3A1664542997%2C%22first_name%22%3A%22Windy%22%2C%22last_name%22%3A%22%28Anh%20Minh%29%22%2C%22username%22%3A%22wind_711%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photourl%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FSJt39NnWMPOm5F1tf676eR5Jp-cg3FypHhSQBZj04w.svg%22%7D&chat_instance=3972153514630715060&chat_type=private&auth_date=1748406579&signature=uTZvlJ0uT-dhuLt7Ol-Hol561fQ8IJ7IjCGXl9bylh79tBDS3Rz_T9WilieCtB6E7jlwJ_eV6Uc4CPgcj-BRCA&hash=86947423821d2355b535918b0f384192b6b48c6e58e710c7d8899c2345da0dcd';
    if (initDataRaw) {
      localStorage.setItem('token', initDataRaw);
      return;
    }
    localStorage.setItem('token', token);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
