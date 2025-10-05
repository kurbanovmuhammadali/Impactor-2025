import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Rocket, RotateCcw, Satellite } from "lucide-react";
import { ImpactParams } from "@/lib/impactPhysics";
import { useState } from "react";
import { toast } from "sonner";

interface SimulatorControlsProps {
  params: ImpactParams;
  setParams: (params: ImpactParams) => void;
  onSimulate: () => void;
  onReset: () => void;
  isSimulating: boolean;
}

export const SimulatorControls = ({
  params,
  setParams,
  onSimulate,
  onReset,
  isSimulating,
}: SimulatorControlsProps) => {
  const [neoId, setNeoId] = useState("3542519");
  const [apiKey, setApiKey] = useState("DEMO_KEY");

  const fetchNEOData = async () => {
    try {
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/${neoId}?api_key=${apiKey}`
      );

      if (!response.ok) throw new Error("Failed to fetch NEO data");

      const data = await response.json();
      const dMin = data.estimated_diameter.meters.estimated_diameter_min;
      const dMax = data.estimated_diameter.meters.estimated_diameter_max;
      const avgDiam = Math.round((dMin + dMax) / 2);

      let vel = 20;
      if (data.close_approach_data && data.close_approach_data.length > 0) {
        vel = Math.round(
          parseFloat(data.close_approach_data[0].relative_velocity.kilometers_per_second)
        );
      }

      setParams({ ...params, diameter: avgDiam, velocity: vel });
      toast.success(`Loaded data for ${data.name}`);
    } catch (error) {
      toast.error("Failed to load NEO data");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-xl border-primary/20 glow-border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <span>🎯</span> Target Location
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click the map or double-click the globe to set target
        </p>

        <div className="space-y-3">
          <div>
            <Label>Latitude</Label>
            <Input
              type="number"
              min="-90"
              max="90"
              step="0.1"
              value={params.lat}
              onChange={(e) => setParams({ ...params, lat: parseFloat(e.target.value) })}
              className="bg-muted/50"
            />
          </div>

          <div>
            <Label>Longitude</Label>
            <Input
              type="number"
              min="-180"
              max="180"
              step="0.1"
              value={params.lon}
              onChange={(e) => setParams({ ...params, lon: parseFloat(e.target.value) })}
              className="bg-muted/50"
            />
          </div>

          <div>
            <Label>Surface Type</Label>
            <Select
              value={params.surface}
              onValueChange={(value) => setParams({ ...params, surface: value as "land" | "water" })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="land">Solid Land</SelectItem>
                <SelectItem value="water">Deep Ocean</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-card/80 backdrop-blur-xl border-primary/20 glow-border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <Satellite className="w-5 h-5" /> NASA NEO Data
        </h3>

        <div className="space-y-3">
          <div>
            <Label>API Key (optional)</Label>
            <Input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="DEMO_KEY"
              className="bg-muted/50"
            />
          </div>

          <div>
            <Label>NEO ID</Label>
            <Input
              type="text"
              value={neoId}
              onChange={(e) => setNeoId(e.target.value)}
              className="bg-muted/50"
            />
          </div>

          <Button onClick={fetchNEOData} variant="secondary" className="w-full">
            📡 Load NEO Data
          </Button>
        </div>
      </Card>

      <Card className="p-4 bg-card/80 backdrop-blur-xl border-primary/20 glow-border">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-primary">
          <span>☄️</span> Impact Parameters
        </h3>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <Label>Diameter</Label>
              <span className="text-sm text-primary font-semibold">{params.diameter} m</span>
            </div>
            <input
              type="range"
              min="10"
              max="5000"
              step="10"
              value={params.diameter}
              onChange={(e) => setParams({ ...params, diameter: parseInt(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>Velocity</Label>
              <span className="text-sm text-primary font-semibold">{params.velocity} km/s</span>
            </div>
            <input
              type="range"
              min="11"
              max="72"
              step="1"
              value={params.velocity}
              onChange={(e) => setParams({ ...params, velocity: parseInt(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <Label>Impact Angle</Label>
              <span className="text-sm text-primary font-semibold">{params.angle}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={params.angle}
              onChange={(e) => setParams({ ...params, angle: parseInt(e.target.value) })}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          <div>
            <Label>Asteroid Density</Label>
            <Select
              value={params.density.toString()}
              onValueChange={(value) => setParams({ ...params, density: parseInt(value) })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1500">Porous/Icy (1500 kg/m³)</SelectItem>
                <SelectItem value="3000">Rocky (3000 kg/m³)</SelectItem>
                <SelectItem value="8000">Iron/Dense (8000 kg/m³)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Approach Direction</Label>
            <Select
              value={params.approach}
              onValueChange={(value) => setParams({ ...params, approach: value as any })}
            >
              <SelectTrigger className="bg-muted/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Top-Down</SelectItem>
                <SelectItem value="north">From North</SelectItem>
                <SelectItem value="east">From East</SelectItem>
                <SelectItem value="south">From South</SelectItem>
                <SelectItem value="west">From West</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="flex gap-2">
        <Button
          onClick={onSimulate}
          disabled={isSimulating}
          className="flex-1 bg-primary hover:bg-primary/80 glow-border"
        >
          <Rocket className="w-4 h-4 mr-2" />
          {isSimulating ? "SIMULATING..." : "SIMULATE"}
        </Button>
        <Button onClick={onReset} variant="secondary" className="px-6">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
