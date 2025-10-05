// import { useState, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import { LoadingScreen } from "@/components/LoadingScreen";
// import { MirrorTutorial } from "@/components/MirrorTutorial";
// import { SolarSystem } from "@/components/SolarSystem";
// import { AsteroidDetail } from "@/components/AsteroidDetail";
// import { TimelineControl } from "@/components/TimelineControl";
// import { Navigation } from "@/components/Navigation";
// import { ImpactSimulator } from "@/components/simulator/ImpactSimulator";
// import AIChat from "@/components/AIChat"; // adjust path if needed
// import { toast } from "sonner";


// interface Asteroid {
//   id: string;
//   name: string;
//   distance: number;
//   velocity: number;
//   diameter: number;
//   hazardous: boolean;
//   closeApproachDate: string;
// }

// type AppState = "loading" | "tutorial" | "explorer";
// type AppMode = "explorer" | "simulator" | "assistant";

// const Index = () => {
//   const [appState, setAppState] = useState<AppState>("loading");
//   const [appMode, setAppMode] = useState<AppMode>("explorer");
//   const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
//   const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [loading, setLoading] = useState(false);

//   const fetchAsteroids = async (date: Date) => {
//     setLoading(true);
//     try {
//       const startDate = date.toISOString().split("T")[0];
//       const endDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0];

//       const response = await fetch(
//         `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch asteroid data");
//       }

//       const data = await response.json();
//       const neoList: Asteroid[] = [];

//       Object.values(data.near_earth_objects).forEach((dayAsteroids: any) => {
//         dayAsteroids.forEach((neo: any) => {
//           const approach = neo.close_approach_data[0];
//           neoList.push({
//             id: neo.id,
//             name: neo.name,
//             distance: parseFloat(approach.miss_distance.kilometers),
//             velocity: parseFloat(approach.relative_velocity.kilometers_per_hour),
//             diameter:
//               (neo.estimated_diameter.meters.estimated_diameter_min +
//                 neo.estimated_diameter.meters.estimated_diameter_max) /
//               2,
//             hazardous: neo.is_potentially_hazardous_asteroid,
//             closeApproachDate: approach.close_approach_date,
//           });
//         });
//       });

//       setAsteroids(neoList.slice(0, 50)); // Limit to 50 for performance
//       toast.success(`Loaded ${neoList.length} near-Earth asteroids`);
//     } catch (error) {
//       console.error("Error fetching asteroids:", error);
//       toast.error("Failed to load asteroid data. Using demo data.");
      
//       // Demo data fallback
//       setAsteroids([
//         {
//           id: "1",
//           name: "2024 AA1",
//           distance: 5000000,
//           velocity: 25000,
//           diameter: 150,
//           hazardous: true,
//           closeApproachDate: new Date().toISOString(),
//         },
//         {
//           id: "2",
//           name: "2024 BB2",
//           distance: 8000000,
//           velocity: 18000,
//           diameter: 80,
//           hazardous: false,
//           closeApproachDate: new Date().toISOString(),
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (appState === "explorer") {
//       fetchAsteroids(currentDate);
//     }
//   }, [currentDate, appState]);

//   const handleDateChange = (newDate: Date) => {
//     setCurrentDate(newDate);
//   };

//   return (
//     <div style={{height:'100% '}}  className="relative w-full h-screen overflow-hidden bg-background">
//       <AnimatePresence mode="wait">
//         {appState === "loading" && (
//           <LoadingScreen onComplete={() => setAppState("tutorial")} />
//         )}
//       </AnimatePresence>

//       <AnimatePresence mode="wait">
//         {appState === "tutorial" && (
//           <MirrorTutorial onComplete={() => setAppState("explorer")} />
//         )}
//       </AnimatePresence>

//       {appState === "explorer" && (
//         <>
//           <Navigation activeMode={appMode} onModeChange={setAppMode} />

//           {appMode === "explorer" ? (
//             <>
//               {/* Header Stats */}
//               <div className="absolute top-24 left-0 right-0 z-20 px-6">
//                 <div className="flex justify-end">
//                   <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-xl">
//                     <span className="text-sm font-semibold text-primary">
//                       {asteroids.length} Objects Tracked
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Solar System */}
//               <div className="pt-20 h-[calc(100vh-5rem)]">
//                 <SolarSystem asteroids={asteroids} onAsteroidClick={setSelectedAsteroid} />
//               </div>

//               {/* Timeline Control */}
//               <TimelineControl currentDate={currentDate} onDateChange={handleDateChange} />

//               {/* Asteroid Detail Modal */}
//               <AnimatePresence>
//                 {selectedAsteroid && (
//                   <AsteroidDetail
//                     asteroid={selectedAsteroid}
//                     onClose={() => setSelectedAsteroid(null)}
//                   />
//                 )}
//               </AnimatePresence>

//               {/* Instructions Overlay */}
//               <div className="absolute bottom-32 left-8 z-20 p-4 rounded-lg bg-card/60 backdrop-blur-xl border border-primary/20 max-w-xs">
//                 <p className="text-xs text-muted-foreground">
//                   <span className="font-semibold text-primary">Drag</span> to rotate •
//                   <span className="font-semibold text-primary"> Scroll</span> to zoom •
//                   <span className="font-semibold text-primary"> Click</span> asteroids for details
//                 </p>
//               </div>
//             </>
//           ) : (
//             <ImpactSimulator />
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Index;



import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MirrorTutorial } from "@/components/MirrorTutorial";
import { SolarSystem } from "@/components/SolarSystem";
import { AsteroidDetail } from "@/components/AsteroidDetail";
import { TimelineControl } from "@/components/TimelineControl";
import { Navigation } from "@/components/Navigation";
import { ImpactSimulator } from "@/components/simulator/ImpactSimulator";
import AIChat from "@/components/AIChat"; // Your AI Assistant component
import { toast } from "sonner";

interface Asteroid {
  id: string;
  name: string;
  distance: number;
  velocity: number;
  diameter: number;
  hazardous: boolean;
  closeApproachDate: string;
}

type AppState = "loading" | "tutorial" | "explorer";
type AppMode = "explorer" | "simulator" | "assistant";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("loading");
  const [appMode, setAppMode] = useState<AppMode>("explorer");
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const fetchAsteroids = async (date: Date) => {
    setLoading(true);
    try {
      const startDate = date.toISOString().split("T")[0];
      const endDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=DEMO_KEY`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch asteroid data");
      }

      const data = await response.json();
      const neoList: Asteroid[] = [];

      Object.values(data.near_earth_objects).forEach((dayAsteroids: any) => {
        dayAsteroids.forEach((neo: any) => {
          const approach = neo.close_approach_data[0];
          neoList.push({
            id: neo.id,
            name: neo.name,
            distance: parseFloat(approach.miss_distance.kilometers),
            velocity: parseFloat(approach.relative_velocity.kilometers_per_hour),
            diameter:
              (neo.estimated_diameter.meters.estimated_diameter_min +
                neo.estimated_diameter.meters.estimated_diameter_max) /
              2,
            hazardous: neo.is_potentially_hazardous_asteroid,
            closeApproachDate: approach.close_approach_date,
          });
        });
      });

      setAsteroids(neoList.slice(0, 50)); // Limit to 50 for performance
      toast.success(`Loaded ${neoList.length} near-Earth asteroids`);
    } catch (error) {
      console.error("Error fetching asteroids:", error);
      toast.error("Failed to load asteroid data. Using demo data.");
      
      // Demo data fallback
      setAsteroids([
        {
          id: "1",
          name: "2024 AA1",
          distance: 5000000,
          velocity: 25000,
          diameter: 150,
          hazardous: true,
          closeApproachDate: new Date().toISOString(),
        },
        {
          id: "2",
          name: "2024 BB2",
          distance: 8000000,
          velocity: 18000,
          diameter: 80,
          hazardous: false,
          closeApproachDate: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appState === "explorer") {
      fetchAsteroids(currentDate);
    }
  }, [currentDate, appState]);

  const handleDateChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <div style={{ height: '100%' }} className="relative w-full h-screen overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {appState === "loading" && (
          <LoadingScreen onComplete={() => setAppState("tutorial")} />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {appState === "tutorial" && (
          <MirrorTutorial onComplete={() => setAppState("explorer")} />
        )}
      </AnimatePresence>

      {appState === "explorer" && (
        <>
          <Navigation activeMode={appMode} onModeChange={setAppMode} />

          {appMode === "explorer" ? (
            <>
              {/* Header Stats */}
              <div className="absolute top-24 left-0 right-0 z-20 px-6">
                <div className="flex justify-end">
                  <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-xl">
                    <span className="text-sm font-semibold text-primary">
                      {asteroids.length} Objects Tracked
                    </span>
                  </div>
                </div>
              </div>

              {/* Solar System */}
              <div className="pt-20 h-[calc(100vh-5rem)]">
                <SolarSystem asteroids={asteroids} onAsteroidClick={setSelectedAsteroid} />
              </div>

              {/* Timeline Control */}
              <TimelineControl currentDate={currentDate} onDateChange={handleDateChange} />

              {/* Asteroid Detail Modal */}
              <AnimatePresence>
                {selectedAsteroid && (
                  <AsteroidDetail
                    asteroid={selectedAsteroid}
                    onClose={() => setSelectedAsteroid(null)}
                  />
                )}
              </AnimatePresence>

              {/* Instructions Overlay */}
              <div className="absolute bottom-32 left-8 z-20 p-4 rounded-lg bg-card/60 backdrop-blur-xl border border-primary/20 max-w-xs">
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">Drag</span> to rotate •
                  <span className="font-semibold text-primary"> Scroll</span> to zoom •
                  <span className="font-semibold text-primary"> Click</span> asteroids for details
                </p>
              </div>
            </>
          ) : appMode === "simulator" ? (
            <ImpactSimulator />
          ) : appMode === "assistant" ? (
            <div className="ai-chat h-full w-full">
            <AIChat />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default Index;
