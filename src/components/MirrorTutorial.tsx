import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronRight, Orbit, MousePointer2, Calendar, Info } from "lucide-react";

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Welcome, Explorer",
    description: "Welcome to Impactor 2025 — your window into near-Earth asteroids. Let me show you around.",
    icon: <Orbit className="w-8 h-8" />,
  },
  {
    title: "Rotate & Navigate",
    description: "Click and drag anywhere to rotate the view. Explore the space around Earth.",
    icon: <MousePointer2 className="w-8 h-8" />,
  },
  {
    title: "Zoom In & Out",
    description: "Use your scroll wheel or pinch to zoom in and out. Get closer to see asteroid details.",
    icon: <MousePointer2 className="w-8 h-8" />,
  },
  {
    title: "Select Asteroids",
    description: "Click on any glowing asteroid to view its details, trajectory, and risk assessment.",
    icon: <Info className="w-8 h-8" />,
  },
  {
    title: "Time Travel",
    description: "Use the timeline at the bottom to change dates and see asteroid positions over time.",
    icon: <Calendar className="w-8 h-8" />,
  },
];

interface MirrorTutorialProps {
  onComplete: () => void;
}

export const MirrorTutorial = ({ onComplete }: MirrorTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentTutorial = tutorialSteps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-md"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative max-w-2xl mx-4 p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-primary/30 glow-border"
        >
          {/* Mirror Frame Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-primary/20 text-primary glow-border"
            >
              {currentTutorial.icon}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-foreground mb-4 glow-text"
            >
              {currentTutorial.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8"
            >
              {currentTutorial.description}
            </motion.p>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {tutorialSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? "bg-primary w-8"
                      : index < currentStep
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              className="group bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-lg glow-border"
            >
              {currentStep < tutorialSteps.length - 1 ? "Continue" : "Launch Explorer"}
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            {/* Skip Button */}
            {currentStep < tutorialSteps.length - 1 && (
              <button
                onClick={onComplete}
                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Skip tutorial
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
