import { useState } from "react";

export default function GptFast(): JSX.Element {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    setResponse(data.response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Text:
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
      {response && <p>{response}</p>}
    </form>
  );
}