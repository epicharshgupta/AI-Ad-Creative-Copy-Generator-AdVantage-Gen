import { useEffect, useState } from "react"
import axios from "axios"

function History() {

  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/campaign/history")
      setCampaigns(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/campaign/${id}`)
      setCampaigns(prev => prev.filter(c => c._id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  // ⭐ FAVORITE
  const toggleFavorite = async (id) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/campaign/${id}/favorite`)

      setCampaigns(prev =>
        prev.map(c => c._id === id ? res.data : c)
      )
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen px-6 py-10">

      <h1 className="text-4xl mb-8 text-center font-bold">
        📜 Campaign History
      </h1>

      {campaigns.length === 0 ? (
        <p className="text-center text-gray-400">No campaigns yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {campaigns.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg relative hover:scale-105 transition"
            >

              {/* ⭐ Favorite */}
              <button
                onClick={() => toggleFavorite(item._id)}
                className="absolute top-2 left-2 text-xl"
              >
                {item.isFavorite ? "⭐" : "☆"}
              </button>

              {/* ❌ Delete */}
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded text-xs"
              >
                ❌
              </button>

              {/* 🖼 Image */}
              <img
                src={item.imageURL}
                alt="campaign"
                className="rounded-xl mb-3 w-full h-48 object-cover"
              />

              {/* 📝 Caption */}
              <p className="text-sm text-gray-200 line-clamp-3">
                {item.caption}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default History