import { useState } from "react";
import { BotMessageSquare, Mountain, X, Rocket, Send } from "lucide-react";

export default function Hunt() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: string; content: string }[]>(
    []
  );
  const [inputMessage, setInputMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: inputMessage }]);
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputMessage }),
      });
      const data = await res.json();

      setMessages((prev) => [...prev, { type: "bot", content: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Something went wrong. Please try again." },
      ]);
    }

    setInputMessage("");
    setChatLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(true)}
          className="rounded-full w-20 h-20 bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
        >
          <BotMessageSquare className="h-15 w-15" />
        </button>
      </div>

      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md h-96 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-600 to-purple-600 text-white rounded-t-lg">
              <h3 className="font-semibold">Rocket Chat</h3>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {/* make a chatbot in react typescript and tailwind in orange theme which reply on basis of what if the intrestet of person  */}
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 text-sm space-y-2">
                  <div className="text-2xl">
                    <Mountain className="m-auto" />
                  </div>
                  <div>Welcome to your Nepal travel companion!</div>
                  <div>
                    Ask me about places to visit, local culture, or travel tips.
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.type === "user"
                          ? "bg-orange-600 text-white rounded-br-none"
                          : "bg-gray-200 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: message.content
                            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                            .replace(/\n/g, "<br>"),
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 max-w-xs px-3 py-2 rounded-lg text-sm rounded-bl-none">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Nepal travel..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  disabled={chatLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim() || chatLoading}
                  className={`px-3 py-2 rounded-lg text-white text-sm transition-colors ${
                    !inputMessage.trim() || chatLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                Powered by Team Rocket <Rocket />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
