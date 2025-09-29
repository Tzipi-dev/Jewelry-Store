import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ConectUse from './Components/ConectUse';
import Cart from './Components/Cart';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/contact" element={<ConectUse />} />
        {/* <Route path="/user" element={<UserPage />} /> */}
        <Route path="/cart" element={<Cart />} />
     
        {/* ברירת מחדל ל־Home אם משתמש מכניס URL לא קיים */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
