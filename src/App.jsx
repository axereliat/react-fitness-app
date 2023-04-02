import { useState } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import CreateRecord from "./components/CreateRecord.jsx";
import Records from "./components/Records.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/records/create" element={<CreateRecord/>}/>
          <Route path="/records" element={<Records/>}/>
          <Route
              path="*"
              element={<Navigate to="/" replace/>}
          />
      </Routes>
  )
}

export default App
