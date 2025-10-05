import { Card } from "@/components/ui/card";
import { ImpactParams, ImpactResults } from "@/lib/impactPhysics";
import { AlertTriangle, Flame, Activity, Mountain, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface SimulatorResultsProps {
  results: ImpactResults | null;
  params: ImpactParams;
  isSimulating: boolean;
}

export const SimulatorResults = ({ results, params, isSimulating }: SimulatorResultsProps) => {
  if (isSimulating) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-xl border-primary/20 glow-border text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full" />
        </motion.div>
        <p className="mt-4 text-primary font-semibold">SIMULATING IMPACT...</p>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="p-6 bg-card/80 backdrop-blur-xl border-primary/20">
        <p className="text-muted-foreground text-center">
          Adjust parameters and click "SIMULATE" to calculate impact effects.
        </p>
      </Card>
    );
  }

  const densityType =
    params.density > 4000 ? "dense iron" : params.density > 2000 ? "rocky" : "icy";

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-destructive/10 border-destructive/30">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-1" />
          <div>
            <p className="font-semibold text-foreground">⚠️ Educational Tool</p>
            <p className="text-sm text-muted-foreground mt-1">
              Results are estimates based on scientific scaling laws. Use for educational purposes
              only.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 bg-accent/20 border-accent/30">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">Impact Energy</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {parseFloat(results.energyMT).toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground">Megatons TNT</div>
        </Card>

        <Card className="p-4 bg-secondary/20 border-secondary/30">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-secondary" />
            <span className="text-xs text-muted-foreground">Seismic</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{results.magnitude}</div>
          <div className="text-xs text-muted-foreground">Richter Scale</div>
        </Card>

        <Card className="p-4 bg-primary/20 border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Mountain className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Crater Diameter</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {results.isWater ? "N/A" : results.craterDiamKm}
          </div>
          <div className="text-xs text-muted-foreground">kilometers</div>
        </Card>

        <Card className="p-4 bg-primary/20 border-primary/30">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">Crater Depth</span>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {results.isWater ? "N/A" : results.craterDepthKm}
          </div>
          <div className="text-xs text-muted-foreground">kilometers</div>
        </Card>
      </div>

      <Card className="p-4 bg-secondary/20 border-secondary/30">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-4 h-4 text-secondary" />
          <span className="text-sm text-muted-foreground">Thermal Radiation (3rd-degree burns)</span>
        </div>
        <div className="text-xl font-bold text-foreground">{results.thermalRadKm} km radius</div>
        <div className="text-sm text-muted-foreground mt-1">
          ~{results.thermalCasualties.toLocaleString()} people affected
        </div>
      </Card>

      <Card className="p-4 bg-destructive/20 border-destructive/30">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          <span className="text-sm text-muted-foreground">Estimated Fatalities</span>
        </div>
        <div className="text-xl font-bold text-foreground">
          ~{results.fatalities.toLocaleString()}
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          Based on proximity and blast effects
        </div>
      </Card>

      <Card className="p-4 bg-muted/50">
        <p className="text-sm text-foreground">
          A <strong>{params.diameter}m</strong> {densityType} asteroid strikes at{" "}
          <strong>{params.velocity} km/s</strong>. It releases{" "}
          <strong>{parseFloat(results.energyMT).toLocaleString()} Megatons</strong> of energy.{" "}
          {results.isWater
            ? "The ocean impact generates massive tsunamis and vaporizes vast amounts of water."
            : `It excavates a crater ${results.craterDiamKm} km wide.`}
        </p>
      </Card>
    </div>
  );
};
