import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SuggestedActionsProps {
  actions: string[];
  onActionClick: (action: string) => void;
}

export const SuggestedActions = ({ actions, onActionClick }: SuggestedActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={() => onActionClick(action)}
          variant="outline"
          size="sm"
          className={cn(
            "rounded-full border-primary/50 hover:bg-primary/20 hover:border-primary",
            "transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
          )}
        >
          {action}
        </Button>
      ))}
    </div>
  );
};
