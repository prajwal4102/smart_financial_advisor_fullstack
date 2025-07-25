// src/components/ChatbotWidget.jsx

import React, { useState } from 'react';
import { IoMdChatboxes } from 'react-icons/io';

const exampleQuestions = [
  "What’s the best investment plan for me?",
  "How much will I earn in 5 years?",
  "Can I invest more in stocks?",
  "Is mutual fund better than gold for me?",
];

const ChatbotWidget = ({ profile }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: message }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, message }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { sender: 'bot', text: '⚠️ Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (question) => {
    sendMessage(question);
  };

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <IoMdChatboxes size={24} />
      </div>

      {open && (
        <div className="fixed bottom-20 right-4 w-80 h-[500px] bg-white rounded-lg shadow-xl p-4 flex flex-col z-50">
          <div className="font-bold text-lg mb-2 text-center">Ask your Financial Assistant</div>

          {/* Suggestions */}
          <div className="mb-2 flex flex-wrap gap-2">
            {exampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleExampleClick(q)}
                className="bg-gray-100 text-sm px-3 py-1 rounded hover:bg-gray-200"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto mb-2 border p-2 rounded bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block px-3 py-1 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-gray-200 text-gray-800'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="text-sm text-gray-400">Typing...</div>}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(userInput);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              className="flex-1 border rounded px-2 py-1"
              placeholder="Ask something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
