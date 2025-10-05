import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface TimelineControlProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const TimelineControl = ({ currentDate, onDateChange }: TimelineControlProps) => {
  const handlePrevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    onDateChange(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    onDateChange(newDate);
  };

  const handleToday = () => {
    onDateChange(new Date());
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30"
    >
      <div className="flex items-center gap-4 px-6 py-4 rounded-full bg-card/80 backdrop-blur-xl border border-primary/30 glow-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevDay}
          className="hover:bg-primary/20 hover:text-primary"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="flex items-center gap-3 min-w-[200px] justify-center">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-lg font-semibold text-foreground">
            {currentDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextDay}
          className="hover:bg-primary/20 hover:text-primary"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        <div className="w-px h-8 bg-border" />

        <Button
          variant="ghost"
          onClick={handleToday}
          className="hover:bg-primary/20 hover:text-primary px-4"
        >
          Today
        </Button>
      </div>
    </motion.div>
  );
};
