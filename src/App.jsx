import {useState} from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./components/Home.jsx";
import CreateRecord from "./components/CreateRecord.jsx";
import Records from "./components/Records.jsx";
import Layout from "./components/Layout.jsx";
import EditRecord from "./components/EditRecord.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/records/create" element={<CreateRecord/>}/>
                <Route path="/records/edit/:id" element={<EditRecord/>}/>
                <Route path="/records" element={<Records/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/" replace/>}
                />
            </Routes>
        </Layout>
    )
}

export default App
