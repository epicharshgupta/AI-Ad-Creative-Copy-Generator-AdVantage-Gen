function CampaignCard({ campaign }) {

  return (
    <div className="mt-8 bg-gray-800 p-5 rounded-xl shadow-lg max-w-md">

      <img
        src={campaign.imageURL}
        alt="campaign"
        className="rounded-lg mb-4"
      />

      <p className="text-gray-300">{campaign.caption}</p>

    </div>
  )
}

export default CampaignCard