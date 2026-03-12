const axios = require("axios")

const generateImage = async (prompt) => {

  try {

    console.log("Prompt:", prompt)

    const response = await axios({
      method: "POST",
      url: "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "image/png"
      },
      data: {
        inputs: prompt
      },
      responseType: "arraybuffer"
    })

    console.log("Image generated")

    return response.data

  } catch (error) {

    if (error.response) {
      console.log(error.response.status)
      console.log(error.response.data.toString())
    } else {
      console.log(error.message)
    }

    throw error
  }

}

module.exports = { generateImage }