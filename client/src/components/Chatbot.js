import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import './Chatbot.css';

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios({
        url: `${process.env.REACT_APP_SERVER_URL}/api/chatbot/sendMessage`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          message: question,
        },
      });

      setAnswer(response.data.reply);
    } catch (error) {
      console.error(error);
      setAnswer("Sorry, something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className="chatbot bg-gradient-to-r from-blue-50 to-blue-100 h-screen p-3 flex flex-col justify-center items-center">
      <div className="chatbot-container">
        <form
          onSubmit={generateAnswer}
          className="text-center rounded-lg shadow-lg py-6 px-4 transition-all duration-500 transform hover:scale-105"
        >
          <h1 className="text-4xl font-bold text-blue-500 mb-4 animate-bounce">
            Fitness Chatbot
          </h1>
          <textarea
            required
            className="border border-gray-300 rounded w-full my-2 min-h-fit p-3 transition-all duration-300 focus:border-blue-400 focus:shadow-lg"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className={`bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={generatingAnswer}
          >
            Generate answer
          </button>
        </form>
        <div className="chatbot-answer my-4 rounded-lg bg-white shadow-lg p-4 transition-all duration-500 transform hover:scale-105">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
