// import { motion } from "framer-motion";
// import { Telescope, Target } from "lucide-react";

// interface NavigationProps {
//   activeMode: "explorer" | "simulator";
//   onModeChange: (mode: "explorer" | "simulator") => void;
// }

// export const Navigation = ({ activeMode, onModeChange }: NavigationProps) => {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-primary/20">
//       <div className="max-w-7xl mx-auto px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="text-3xl">☄️</div>
//             <div>
//               <h1 className="text-2xl font-bold text-foreground glow-text">
//                 IMPACTOR 2025
//               </h1>
//               <p className="text-xs text-muted-foreground">
//                 NASA Near-Earth Object Analysis
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2 p-1 rounded-full bg-muted/30 border border-primary/20">
//             <button
//               onClick={() => onModeChange("explorer")}
//               className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
//                 activeMode === "explorer"
//                   ? "bg-primary text-primary-foreground glow-border"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <Telescope className="w-4 h-4" />
//               <span className="font-semibold">Explorer</span>
//             </button>
//             <button
//               onClick={() => onModeChange("simulator")}
//               className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
//                 activeMode === "simulator"
//                   ? "bg-primary text-primary-foreground glow-border"
//                   : "text-muted-foreground hover:text-foreground"
//               }`}
//             >
//               <Target className="w-4 h-4" />
//               <span className="font-semibold">Impact Simulator</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };



import { motion } from "framer-motion";
import { Telescope, Target, Bot } from "lucide-react";

interface NavigationProps {
  activeMode: "explorer" | "simulator" | "assistant";
  onModeChange: (mode: "explorer" | "simulator" | "assistant") => void;
}

export const Navigation = ({ activeMode, onModeChange }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-3xl">☄️</div>
            <div>
              <h1 className="text-2xl font-bold text-foreground glow-text">
                IMPACTOR 2025
              </h1>
              <p className="text-xs text-muted-foreground">
                NASA Near-Earth Object Analysis
              </p>
            </div>
          </div>

          <div className="flex gap-2 p-1 rounded-full bg-muted/30 border border-primary/20">
            <button
              onClick={() => onModeChange("explorer")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeMode === "explorer"
                  ? "bg-primary text-primary-foreground glow-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Telescope className="w-4 h-4" />
              <span className="font-semibold">Explorer</span>
            </button>

            <button
              onClick={() => onModeChange("simulator")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeMode === "simulator"
                  ? "bg-primary text-primary-foreground glow-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Target className="w-4 h-4" />
              <span className="font-semibold">Impact Simulator</span>
            </button>

            <button
              onClick={() => onModeChange("assistant")}
              className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all ${
                activeMode === "assistant"
                  ? "bg-primary text-primary-foreground glow-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Bot className="w-4 h-4" />
              <span className="font-semibold">AI Assistant</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
