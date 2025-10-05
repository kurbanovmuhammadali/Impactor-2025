import { motion } from "framer-motion";
import { X, AlertTriangle, Gauge, Calendar, Ruler } from "lucide-react";
import { Button } from "./ui/button";

interface Asteroid {
  id: string;
  name: string;
  distance: number;
  velocity: number;
  diameter: number;
  hazardous: boolean;
  closeApproachDate: string;
}

interface AsteroidDetailProps {
  asteroid: Asteroid | null;
  onClose: () => void;
}

export const AsteroidDetail = ({ asteroid, onClose }: AsteroidDetailProps) => {
  if (!asteroid) return null;

  const formatDistance = (km: number) => {
    return (km / 1000000).toFixed(2) + " million km";
  };

  const formatVelocity = (kmh: number) => {
    return (kmh / 1000).toFixed(2) + " km/s";
  };

  const formatDiameter = (m: number) => {
    return m >= 1000 ? (m / 1000).toFixed(2) + " km" : m.toFixed(0) + " m";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative w-full max-w-2xl bg-card rounded-2xl border border-primary/30 glow-border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-6 ${asteroid.hazardous ? "bg-destructive/20" : "bg-primary/20"}`}>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {asteroid.hazardous && (
                <div className="p-3 rounded-full bg-destructive/20 danger-glow">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-foreground glow-text">
                  {asteroid.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {asteroid.hazardous ? "Potentially Hazardous" : "Non-Hazardous"}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Ruler className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Distance</span>
            </div>
            <p className="text-xl font-semibold text-foreground">
              {formatDistance(asteroid.distance)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Gauge className="w-5 h-5 text-secondary" />
              </div>
              <span className="text-sm text-muted-foreground">Velocity</span>
            </div>
            <p className="text-xl font-semibold text-foreground">
              {formatVelocity(asteroid.velocity)}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/20">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Close Approach</span>
            </div>
            <p className="text-xl font-semibold text-foreground">
              {new Date(asteroid.closeApproachDate).toLocaleDateString()}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 border border-border">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <Ruler className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Diameter</span>
            </div>
            <p className="text-xl font-semibold text-foreground">
              {formatDiameter(asteroid.diameter)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-muted/30 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Data provided by NASA's Near-Earth Object Web Service
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};


