import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home.tsx';
import Search from "@/pages/Search/Search.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
