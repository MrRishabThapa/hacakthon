import { useState } from "react";
import {
  BotMessageSquare,
  X,
  Send,
  Rocket,
  MapPin,
  Star,
  Mountain,
  TreePine,
  Building,
  Camera,
} from "lucide-react";

type Message = { type: "user" | "bot"; content: string };

// 25+ travel destinations
const places = [
  { name: "Gosaikunda", type: "Adventure" },
  { name: "Rupse Chhahara", type: "Nature" },
  { name: "Khaptad Dham", type: "Cultural" },
  { name: "Rara Lake Viewpoints", type: "Nature" },
  { name: "Chisapani Gadhi", type: "Traditional" },
  { name: "Tinjure-Milke-Jaljale", type: "Nature" },
  { name: "Rangbhang Valley", type: "Adventure" },
  { name: "Barun Valley", type: "Adventure" },
  { name: "Ghandruk Village", type: "Traditional" },
  { name: "Bandipur", type: "Cultural" },
  { name: "Lumbini", type: "Cultural" },
  { name: "Poon Hill", type: "Adventure" },
  { name: "Annapurna Base Camp", type: "Adventure" },
  { name: "Sagarmatha National Park", type: "Nature" },
  { name: "Patan Durbar Square", type: "Cultural" },
  { name: "Bhaktapur Durbar Square", type: "Cultural" },
  { name: "Ilaka Village", type: "Traditional" },
  { name: "Pokhara Lakeside", type: "Nature" },
  { name: "Dhulikhel", type: "Traditional" },
  { name: "Nagarkot", type: "Nature" },
  { name: "Shey Gompa", type: "Cultural" },
  { name: "Phoksundo Lake", type: "Nature" },
  { name: "Manaslu Circuit", type: "Adventure" },
  { name: "Rasuwa Valley", type: "Adventure" },
  { name: "Chitwan National Park", type: "Nature" },
];

// Keywords for categories
const interestsKeywords: Record<string, string[]> = {
  Adventure: [
    "adventure",
    "trekking",
    "hiking",
    "climbing",
    "rafting",
    "mountain",
    "explore",
  ],
  Cultural: [
    "cultural",
    "temple",
    "heritage",
    "historical",
    "monument",
    "museum",
    "festival",
  ],
  Traditional: [
    "traditional",
    "village",
    "local life",
    "customs",
    "tea",
    "cooking",
  ],
  Nature: [
    "nature",
    "lake",
    "forest",
    "wildlife",
    "waterfall",
    "valley",
    "scenery",
    "hiking",
  ],
};

// Travel tips
const travelTips: Record<string, string[]> = {
  Adventure: [
    "Pack layers — mountain weather can prank you! 🏔️",
    "Always carry a small first-aid kit — blisters are real.",
    "Check local guides for secret trekking paths.",
    "Sunblock is your best friend at high altitudes.",
    "Bring snacks — energy bars are lifesavers on long treks.",
  ],
  Cultural: [
    "Respect temple customs — shoes off, quiet voice.",
    "Try local festivals — the food alone is worth it! 🍲",
    "Learn a few words in Nepali — people love it.",
    "Carry a camera for those epic heritage shots.",
    "Ask locals for hidden stories; they know the secrets.",
  ],
  Traditional: [
    "Visit villages early morning — best for sunrise & tea.",
    "Interact with locals — their stories are gold.",
    "Try cooking a local dish — fun and tasty! 🍛",
    "Keep cash handy; small shops may not take cards.",
    "Take a notebook — jot down traditional recipes or crafts.",
  ],
  Nature: [
    "Binoculars are perfect for spotting wildlife 🦅.",
    "Go early to lakes and waterfalls for calm & photos.",
    "Pack reusable water bottles — nature-friendly!",
    "Check the weather; fog can hide mountain views.",
    "Carry a light rain jacket; weather changes fast in Nepal.",
  ],
};

export default function RocketChat() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [lastCategory, setLastCategory] = useState<string | null>(null);

  const detectCategory = (msg: string) => {
    for (const [cat, kws] of Object.entries(interestsKeywords)) {
      if (kws.some((kw) => msg.toLowerCase().includes(kw))) return cat;
    }
    return null;
  };

  const getRandomOffTopicReply = () => {
    const replies = [
      "Haha, wild thought! 😎 Let’s bring it back to travel vibes. Mountains, temples, villages, or lakes?",
      "Oh wow 😲, interesting! But let’s focus on exploring Nepal — Adventure, Cultural, Traditional, or Nature?",
      "Haha love your energy! But can we stick to travel? I have epic tips waiting for you!",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg: Message = { type: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setChatLoading(true);

    setTimeout(() => {
      const matchedCategory = detectCategory(userMsg.content);
      let botReply = "";

      if (matchedCategory) {
        setLastCategory(matchedCategory);
        const recommended = places
          .filter((p) => p.type === matchedCategory)
          .sort(() => 0.5 - Math.random())
          .slice(0, 8)
          .map((p) => p.name)
          .join(", ");

        botReply = `Awesome! 🚀 Since you love <strong>${matchedCategory}</strong> travel, check out: ${recommended}.<br/><br/>Wanna hear some cool travel tips for <strong>${matchedCategory}</strong>?`;
      } else if (
        userMsg.content.toLowerCase().includes("yes") &&
        lastCategory
      ) {
        const tips = travelTips[lastCategory]
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((tip, i) => `${i + 1}. ${tip}`)
          .join("<br/>");

        botReply = `Here’s some pro travel advice for your <strong>${lastCategory}</strong> journey:<br/><br/>${tips}<br/><br/>Feeling pumped yet? 😎`;
      } else if (
        ["hi", "hello"].some((w) => userMsg.content.toLowerCase().includes(w))
      ) {
        botReply =
          "Hey hey! I’m Rocket 🚀, your witty travel buddy. Which type of travel excites you the most: Adventure, Cultural, Traditional, or Nature?";
      } else if (userMsg.content.toLowerCase().includes("thank")) {
        botReply =
          "Aww, you’re welcome! 😎💫 Do you want more travel tips or secret spots in Nepal?";
      } else {
        botReply = getRandomOffTopicReply();
      }

      const botMsg: Message = { type: "bot", content: botReply };
      setMessages((prev) => [...prev, botMsg]);
      setChatLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(true)}
          className="rounded-full w-20 h-20 bg-orange-600 hover:bg-orange-700 text-white shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
        >
          <BotMessageSquare className="h-10 w-10" />
        </button>
      </div>

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md h-[500px] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-t-lg">
              <h3 className="font-semibold flex items-center">
                <Rocket className="mr-2 h-5 w-5" /> Rocket
              </h3>
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.type === "user"
                        ? "bg-orange-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                </div>
              ))}

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

              {messages.length === 0 && !chatLoading && (
                <div className="text-center text-gray-500 text-sm space-y-2">
                  <div>Hi! I’m Rocket, your witty travel buddy 🚀</div>
                  <div>
                    Which type of travel excites you most: Adventure, Cultural,
                    Traditional, or Nature?
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-50 rounded-b-lg flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your travel vibe..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                className="px-3 py-2 rounded-lg text-white text-sm bg-orange-600 hover:bg-orange-700"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 text-xs text-gray-500 text-center flex justify-center items-center space-x-1">
              <span>Powered by Rocket</span> <Rocket className="h-3 w-3" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
