import { useEffect, useState } from "react"
import axios from "axios"

function Favorites() {

  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/campaign/favorites")
      setCampaigns(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen px-6 py-10">

      <h1 className="text-4xl mb-8 text-center font-bold">
        ⭐ Favorite Campaigns
      </h1>

      {campaigns.length === 0 ? (
        <p className="text-center text-gray-400">No favorites yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {campaigns.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg"
            >

              <img
                src={item.imageURL}
                alt="campaign"
                className="rounded-xl mb-3 w-full h-48 object-cover"
              />

              <p className="text-sm text-gray-200">
                {item.caption}
              </p>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default Favorites