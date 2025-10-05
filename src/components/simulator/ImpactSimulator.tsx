import { useState, useEffect } from "react";
import { SimulatorGlobe } from "./SimulatorGlobe";
import { SimulatorControls } from "./SimulatorControls";
import { SimulatorMap } from "./SimulatorMap";
import { SimulatorResults } from "./SimulatorResults";
import { calculateImpact, ImpactParams, ImpactResults } from "@/lib/impactPhysics";

export const ImpactSimulator = () => {
  const [params, setParams] = useState<ImpactParams>({
    lat: 28.5,
    lon: -80.5,
    diameter: 370,
    velocity: 20,
    angle: 45,
    density: 3000,
    surface: "land",
    approach: "top",
  });

  const [results, setResults] = useState<ImpactResults | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const impactResults = calculateImpact(params);
      setResults(impactResults);
      setIsSimulating(false);
    }, 3000);
  };

  const handleReset = () => {
    setParams({
      lat: 28.5,
      lon: -80.5,
      diameter: 370,
      velocity: 20,
      angle: 45,
      density: 3000,
      surface: "land",
      approach: "top",
    });
    setResults(null);
  };

  return (
    <div className="fixed inset-0 pt-20 bg-background">
      <div className="h-full grid grid-cols-12 gap-4 p-4">
        {/* Left Panel - Controls */}
        <div className="col-span-3 overflow-y-auto">
          <SimulatorControls
            params={params}
            setParams={setParams}
            onSimulate={handleSimulate}
            onReset={handleReset}
            isSimulating={isSimulating}
          />
        </div>

        {/* Middle Panel - Globe */}
        <div className="col-span-5">
          <SimulatorGlobe
            params={params}
            setParams={setParams}
            results={results}
            isSimulating={isSimulating}
          />
        </div>

        {/* Right Panel - Map & Results */}
        <div className="col-span-4 overflow-y-auto space-y-4">
          <SimulatorMap params={params} results={results} setParams={setParams} />
          <SimulatorResults results={results} params={params} isSimulating={isSimulating} />
        </div>
      </div>
    </div>
  );
};
