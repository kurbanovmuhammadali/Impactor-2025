import { useState, useRef, useEffect } from "react";
import { Bot, User, Send, Rocket, Shield, Zap, Atom, Database, Satellite } from "lucide-react";
import '../bot.css'

type MessageRole = "ai" | "user";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  buttons?: string[];
}

interface DefenseMethod {
  name: string;
  icon: string;
  description: string;
  pros: string;
  cons: string;
  example: string;
}

const defenseMethods: Record<string, DefenseMethod> = {
  "gravity-tractor": {
    name: "Gravity Tractor",
    icon: "🚀",
    description: "A spacecraft hovers near the asteroid and slowly pulls it off course using gravitational attraction. It's like a gentle cosmic tow truck!",
    pros: "Very safe and precise. No risk of fragmenting the asteroid. Can be done years in advance.",
    cons: "Requires a lot of time (years to decades). Only works for smaller asteroids. Needs sustained spacecraft operation.",
    example: "NASA's DART mission tested similar principles of asteroid deflection in 2022!"
  },
  "kinetic-impactor": {
    name: "Kinetic Impactor",
    icon: "💥",
    description: "Smash a high-speed projectile into the asteroid to change its velocity and trajectory. Think of it as cosmic billiards!",
    pros: "Proven technology. Fast deployment. Effective for medium-sized asteroids.",
    cons: "Risk of breaking asteroid into dangerous fragments. Less precise than gravity tractor.",
    example: "NASA's DART mission successfully impacted asteroid Dimorphos in September 2022, changing its orbit!"
  },
  "nuclear-detonation": {
    name: "Nuclear Detonation",
    icon: "☢️",
    description: "Detonate a nuclear device near or on the asteroid to vaporize surface material and create thrust that pushes it off course.",
    pros: "Most powerful option. Can handle large asteroids. Quick deployment for emergency scenarios.",
    cons: "International treaties may restrict use. Risk of fragmentation. Could create radioactive debris.",
    example: "While never tested in space, scientists at LLNL and NASA have extensively modeled this scenario."
  },
  "mass-driver": {
    name: "Mass Driver / Material Removal",
    icon: "⛏️",
    description: "Land on the asteroid and remove material, ejecting it into space. The reaction force slowly changes the asteroid's trajectory.",
    pros: "Very controlled and predictable. Can work on irregularly shaped asteroids. Mining could provide resources.",
    cons: "Extremely time-consuming. Requires landing on a tumbling asteroid. Technology still in development.",
    example: "This concept was explored in the OSIRIS-REx mission's study of asteroid Bennu!"
  },
  "asteroid-tug": {
    name: "Asteroid Tug / Anchoring",
    icon: "🔗",
    description: "Attach a spacecraft directly to the asteroid and use thrusters to slowly push or pull it to a new orbit.",
    pros: "Direct control over asteroid's movement. Can correct course during deflection. More efficient than gravity tractor.",
    cons: "Landing and anchoring is extremely difficult. Risk of causing asteroid to tumble. Requires robust attachment system.",
    example: "Japan's Hayabusa2 mission demonstrated precision landing and material collection techniques!"
  },
  "planetary-shield": {
    name: "Planetary Shield / Evacuation",
    icon: "🛡️",
    description: "For worst-case scenarios where deflection fails: protect infrastructure with advanced warning systems and evacuation plans.",
    pros: "Last resort backup plan. Protects lives even if deflection fails. Modern early-warning systems can provide years of notice.",
    cons: "Doesn't prevent impact. Massive economic and social disruption. Some impacts are too large to survive.",
    example: "NASA's Planetary Defense Coordination Office monitors Near-Earth Objects and coordinates global response!"
  }
};

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello! 🌍 I'm your AI Earth-defense advisor. I'm here to teach you about the fascinating world of asteroid defense! Do you want to learn about prevention, deflection, or impact mitigation methods?",
      buttons: ["Prevention", "Deflection", "Impact Mitigation"]
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addMessage = (role: MessageRole, content: string, buttons?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      buttons
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleAIResponse = (userInput: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      
      // Check for specific defense methods
      if (lowerInput.includes("gravity") || lowerInput.includes("tractor")) {
        const method = defenseMethods["gravity-tractor"];
        addMessage("ai", `Great choice! Let me tell you about the ${method.name} ${method.icon}\n\n${method.description}\n\n✅ Pros: ${method.pros}\n\n❌ Cons: ${method.cons}\n\n🔬 Example: ${method.example}\n\nWould you like to explore another method or learn about a different approach?`, ["Another Method", "How Do We Detect Asteroids?", "Real Missions"]);
      } else if (lowerInput.includes("kinetic") || lowerInput.includes("impactor") || lowerInput.includes("smash")) {
        const method = defenseMethods["kinetic-impactor"];
        addMessage("ai", `Excellent! The ${method.name} ${method.icon}\n\n${method.description}\n\n✅ Pros: ${method.pros}\n\n❌ Cons: ${method.cons}\n\n🔬 Example: ${method.example}\n\nWhat else would you like to know?`, ["Another Method", "Nuclear Option", "Detection Systems"]);
      } else if (lowerInput.includes("nuclear") || lowerInput.includes("bomb") || lowerInput.includes("nuke")) {
        const method = defenseMethods["nuclear-detonation"];
        addMessage("ai", `This is the heavy hitter! ${method.name} ${method.icon}\n\n${method.description}\n\n✅ Pros: ${method.pros}\n\n❌ Cons: ${method.cons}\n\n🔬 Example: ${method.example}\n\nInterested in other methods or want to know when we'd use this?`, ["Other Methods", "Emergency Scenarios", "Space Law"]);
      } else if (lowerInput.includes("mass") || lowerInput.includes("driver") || lowerInput.includes("mining")) {
        const method = defenseMethods["mass-driver"];
        addMessage("ai", `Fascinating technology! ${method.name} ${method.icon}\n\n${method.description}\n\n✅ Pros: ${method.pros}\n\n❌ Cons: ${method.cons}\n\n🔬 Example: ${method.example}\n\nWant to learn about other methods?`, ["Gravity Tractor", "Kinetic Impactor", "All Methods"]);
      } else if (lowerInput.includes("tug") || lowerInput.includes("anchor")) {
        const method = defenseMethods["asteroid-tug"];
        addMessage("ai", `Cool concept! ${method.name} ${method.icon}\n\n${method.description}\n\n✅ Pros: ${method.pros}\n\n❌ Cons: ${method.cons}\n\n🔬 Example: ${method.example}\n\nWhat would you like to explore next?`, ["Other Methods", "Landing Challenges", "Real Missions"]);
      } else if (lowerInput.includes("shield") || lowerInput.includes("evacuation") || lowerInput.includes("backup")) {
        const method = defenseMethods["planetary-shield"];
        addMessage("ai", `Important safety net! ${method.name} ${method.icon}\n\n${method.description}\n\n✅ Pros: ${method.pros}\n\n❌ Cons: ${method.cons}\n\n🔬 Example: ${method.example}\n\nWant to know about proactive defense methods?`, ["Prevention Methods", "Detection Systems", "Start Over"]);
      } else if (lowerInput.includes("prevention")) {
        addMessage("ai", "Prevention is all about early detection and tracking! 🔭\n\nWe use:\n• Ground-based telescopes to scan the sky\n• Space-based observatories for 24/7 monitoring\n• Advanced computer models to predict orbits\n• International cooperation to share data\n\nThe earlier we detect a threat, the more options we have! Most asteroids are tracked decades before potential impact.\n\nWould you like to learn about specific deflection methods?", ["Deflection Methods", "Detection Technology", "Success Stories"]);
      } else if (lowerInput.includes("deflection")) {
        addMessage("ai", "Great! 🚀 Deflection methods are how we change an asteroid's path. Here are the main approaches:\n\n1. 🚀 Gravity Tractor - Gentle gravitational pull\n2. 💥 Kinetic Impactor - High-speed collision\n3. ☢️ Nuclear Detonation - Extreme push\n4. ⛏️ Mass Driver - Material removal\n5. 🔗 Asteroid Tug - Direct attachment\n\nWhich method interests you most?", ["Gravity Tractor", "Kinetic Impactor", "Nuclear Option", "All Methods"]);
      } else if (lowerInput.includes("mitigation") || lowerInput.includes("impact")) {
        addMessage("ai", "Impact mitigation is our Plan B! 🛡️\n\nIf we can't deflect an asteroid, we:\n• Evacuate danger zones with early warning\n• Protect critical infrastructure\n• Prepare emergency response systems\n• Coordinate international disaster relief\n\nModern detection gives us years of advance warning for most threats, which is crucial for evacuation and preparation.\n\nWant to learn how we'd actually deflect an asteroid?", ["Deflection Methods", "Detection Systems", "Emergency Plans"]);
      } else if (lowerInput.includes("detect") || lowerInput.includes("find") || lowerInput.includes("spot")) {
        addMessage("ai", "Great question! 🔭 We detect asteroids using:\n\n• Pan-STARRS telescopes in Hawaii\n• Catalina Sky Survey in Arizona\n• NASA's NEOWISE space telescope\n• ESA's upcoming Flyeye telescope\n\nThese systems scan the sky every night, and sophisticated software identifies moving objects. We've catalogued over 90% of near-Earth asteroids larger than 1km!\n\n🌟 Fun fact: Amateur astronomers also help discover asteroids!\n\nWant to learn about what we do after detection?", ["Deflection Methods", "Tracking Orbits", "Real Missions"]);
      } else if (lowerInput.includes("mission") || lowerInput.includes("dart") || lowerInput.includes("real")) {
        addMessage("ai", "Exciting real missions! 🎯\n\n🚀 DART (2022): NASA's Double Asteroid Redirection Test successfully impacted asteroid Dimorphos, proving kinetic impactor technology works!\n\n🇯🇵 Hayabusa2 (2019): JAXA landed on asteroid Ryugu and returned samples to Earth.\n\n🇺🇸 OSIRIS-REx (2023): NASA collected samples from asteroid Bennu and brought them home.\n\n🇪🇺 Hera (2024): ESA's follow-up mission to study DART's impact crater.\n\nThese missions teach us how to interact with asteroids! What else would you like to know?", ["Deflection Methods", "Future Missions", "How It Works"]);
      } else if (lowerInput.includes("all method") || lowerInput.includes("show all")) {
        addMessage("ai", "Here's the complete arsenal! 🛡️\n\n1. 🚀 Gravity Tractor - Slow & steady gravitational pull\n2. 💥 Kinetic Impactor - Fast impact to change course\n3. ☢️ Nuclear Detonation - Maximum power option\n4. ⛏️ Mass Driver - Remove material for thrust\n5. 🔗 Asteroid Tug - Direct attachment & push\n6. 🛡️ Planetary Shield - Protect & evacuate\n\nEach method has ideal scenarios! Which one would you like to explore in detail?", ["Gravity Tractor", "Kinetic Impactor", "Nuclear Option", "Detection Tech"]);
      } else if (lowerInput.includes("another") || lowerInput.includes("other")) {
        addMessage("ai", "Let's explore more methods! 🌟 Which one interests you?\n\n🚀 Gravity Tractor - Gentle but slow\n💥 Kinetic Impactor - Fast and proven\n☢️ Nuclear Detonation - Ultimate power\n⛏️ Mass Driver - Controlled removal\n🔗 Asteroid Tug - Direct attachment", ["Gravity Tractor", "Kinetic Impactor", "Nuclear Option", "All Methods"]);
      } else if (lowerInput.includes("thank") || lowerInput.includes("bye")) {
        addMessage("ai", "You're welcome! 🌍 Thanks for learning about planetary defense with me! Remember, while asteroid impacts are rare, it's amazing that we have the technology to protect Earth.\n\nStay curious about space! 🚀✨", ["Start Over", "Learn More", "Real Missions"]);
      } else if (lowerInput.includes("start") || lowerInput.includes("begin") || lowerInput.includes("over")) {
        addMessage("ai", "Let's start fresh! 🌍 What would you like to learn about?\n\n🔭 Prevention - Early detection & tracking\n🚀 Deflection - Changing asteroid's path\n🛡️ Impact Mitigation - Protecting Earth when deflection fails", ["Prevention", "Deflection", "Impact Mitigation"]);
      } else {
        addMessage("ai", "Hmm, I'm not sure I understood that! 🤔 I can help you learn about:\n\n🔭 Prevention methods\n🚀 Deflection techniques\n🛡️ Impact mitigation\n\nOr you can ask me about specific methods like 'gravity tractor', 'kinetic impactor', or 'nuclear option'!\n\nWhat interests you?", ["Prevention", "Deflection", "All Methods"]);
      }
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (input.trim()) {
      addMessage("user", input);
      handleAIResponse(input);
      setInput("");
    }
  };

  const handleButtonClick = (buttonText: string) => {
    addMessage("user", buttonText);
    handleAIResponse(buttonText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cosmic flex flex-col">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-lg border-b border-border/50 p-4 shadow-glow">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center animate-pulse-glow">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Asteroid Defense AI</h1>
            <p className="text-sm text-muted-foreground">Your Earth Protection Advisor</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Rocket className="w-5 h-5 text-primary animate-pulse" />
            <Satellite className="w-5 h-5 text-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 overflow-hidden flex flex-col max-w-4xl w-full mx-auto">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "ai" 
                  ? "bg-gradient-primary shadow-glow" 
                  : "bg-card border-2 border-primary"
              }`}>
                {message.role === "ai" ? (
                  <Bot className="w-6 h-6 text-primary-foreground" />
                ) : (
                  <User className="w-6 h-6 text-primary" />
                )}
              </div>

              {/* Message Content */}
              <div className={`flex flex-col gap-2 max-w-[80%] ${
                message.role === "user" ? "items-end" : "items-start"
              }`}>
                <div className={`rounded-2xl px-4 py-3 ${
                  message.role === "ai"
                    ? "bg-card border border-border/50 shadow-lg"
                    : "bg-gradient-primary text-primary-foreground shadow-glow"
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-line">
                    {message.content}
                  </p>
                </div>

                {/* Action Buttons */}
                {message.buttons && message.buttons.length > 0 && (
                  <div className="flex flex-wrap gap-2 animate-slide-in">
                    {message.buttons.map((button, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleButtonClick(button)}
                        className="px-4 py-2 rounded-full bg-card hover:bg-gradient-chat border border-primary/30 text-sm font-medium text-foreground transition-all hover:shadow-glow hover:scale-105 active:scale-95"
                      >
                        {button}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-10 h-10 rounded-full bg-gradient-primary shadow-glow flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-typing" />
                  <div className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-typing" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-card/50 backdrop-blur-lg border-t border-border/50">
          <div className="max-w-4xl mx-auto flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about asteroid defense..."
              className="flex-1 px-4 py-3 bg-background border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-2xl font-medium hover:shadow-glow hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            🌟 Ask about specific methods or click the suggested buttons!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
