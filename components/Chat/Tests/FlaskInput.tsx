import { useState, ChangeEvent } from "react";

const QuestionInput = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async () => {
    const flaskUrl = "http://127.0.0.1:5000/answer"; // Replace with your Flask API URL

    try {
      const response = await fetch(flaskUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: question,
        }),
      });

      const data = await response.json();
      const answer = data.answer;

      setAnswer(answer); // Set the answer in the component state
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div>
      <input type="text" value={question} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{answer}</p> {/* Display the answer */}
    </div>
  );
};

export default QuestionInput;