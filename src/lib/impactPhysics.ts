export interface ImpactParams {
  lat: number;
  lon: number;
  diameter: number;
  velocity: number;
  angle: number;
  density: number;
  surface: "land" | "water";
  approach: "top" | "north" | "east" | "south" | "west";
}

export interface ImpactResults {
  energyMT: string;
  magnitude: string;
  craterDiamKm: string;
  craterDepthKm: string;
  thermalRadKm: string;
  thermalCasualties: number;
  fatalities: number;
  isWater: boolean;
}

export function calculateImpact(params: ImpactParams): ImpactResults {
  const { diameter, velocity, angle, density, surface, lat, lon } = params;
  const vel = velocity * 1000; // m/s
  const angleRad = (angle * Math.PI) / 180;

  const volume = (4 / 3) * Math.PI * Math.pow(diameter / 2, 3);
  const mass = density * volume;

  const energyJoules = 0.5 * mass * Math.pow(vel, 2);
  const energyMT = energyJoules / 4.184e15;

  const isWater = surface === "water";
  const targetDensity = isWater ? 1000 : 2500;
  let craterDiamKm = 0,
    craterDepthKm = 0;

  if (!isWater) {
    craterDiamKm =
      1.16 *
      Math.pow(density / targetDensity, 1 / 3) *
      Math.pow(diameter / 1000, 0.78) *
      Math.pow(vel / 1000, 0.44) *
      Math.pow(Math.sin(angleRad), 1 / 3);
    craterDepthKm = craterDiamKm * 0.2;
  }

  const seismicEnergy = energyJoules * 0.0001;
  const magnitude = Math.max(0, (Math.log10(Math.max(1, seismicEnergy)) - 4.8) / 1.5);

  const thermalRadKm = Math.pow(energyMT, 0.45) * 1.5;

  const popDensity = getPopulationDensity(lat, lon, surface);
  const thermalCasualties = Math.round(popDensity * Math.PI * Math.pow(thermalRadKm, 2));

  let fatalities = 0;
  if (!isWater) {
    const craterArea = Math.PI * Math.pow(craterDiamKm / 2, 2);
    const lethalArea = Math.PI * Math.pow(thermalRadKm, 2);
    fatalities = Math.round(popDensity * Math.max(craterArea, lethalArea) * 0.9);
  } else {
    fatalities = Math.round(thermalCasualties * 0.5);
  }

  return {
    energyMT: energyMT.toFixed(1),
    magnitude: magnitude.toFixed(1),
    craterDiamKm: craterDiamKm.toFixed(2),
    craterDepthKm: craterDepthKm.toFixed(2),
    thermalRadKm: thermalRadKm.toFixed(1),
    thermalCasualties,
    fatalities,
    isWater,
  };
}

function getPopulationDensity(lat: number, lon: number, surface: string): number {
  if (surface === "water") return 0;
  
  const latFactor = Math.cos((lat * Math.PI) / 180);
  const cities = [
    { name: "New York", lat: 40.7, lon: -74.0, pop: 800 },
    { name: "London", lat: 51.5, lon: -0.1, pop: 1500 },
    { name: "Tokyo", lat: 35.7, lon: 139.7, pop: 2000 },
    { name: "Shanghai", lat: 31.2, lon: 121.5, pop: 1800 },
    { name: "Mumbai", lat: 19.1, lon: 72.9, pop: 2500 },
    { name: "Cairo", lat: 30.0, lon: 31.2, pop: 1000 },
  ];
  
  let maxCityPop = 0;
  for (const city of cities) {
    const dist = Math.sqrt(Math.pow(lat - city.lat, 2) + Math.pow(lon - city.lon, 2));
    if (dist < 5) {
      maxCityPop = Math.max(maxCityPop, city.pop / (1 + dist));
    }
  }
  
  return Math.max(5, Math.round(latFactor * 50 + maxCityPop));
}
