import { useState } from 'react'

type Response = {
  text: string
}

type Input = {
  text: string
}

export default function Home() {
  const [input, setInput] = useState<Input>({ text: "" })
  const [response, setResponse] = useState<Response>({ text: "" })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ text: event.target.value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    const data = await response.json()
    setResponse({ text: data.text })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter text:
          <input type="text" value={input.text} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{response.text}</p>
    </div>
  )
}
