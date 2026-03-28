import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import History from "./pages/History"
import Favorites from "./pages/Favorites"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App