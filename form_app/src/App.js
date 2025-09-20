import Form from "./pages/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, Routes, Route } from 'react-router'
import Table from "./pages/Table";
import { Provider } from 'react-redux'
import { store } from "./redux/store";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
