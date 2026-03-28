import { useState } from "react"

function PromptForm({ onGenerate }) {

  const [prompt, setPrompt] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onGenerate(prompt)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">

      <input
        type="text"
        placeholder="Enter marketing idea..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="px-4 py-2 rounded-lg text-black w-80"
      />

      <button
        type="submit"
        className="bg-blue-500 px-5 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Generate
      </button>

    </form>
  )
}

export default PromptForm