import { useState } from "react";
import { MapPin, Navigation, Filter, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BottomNav from "@/components/BottomNav";
import { useNavigate } from "react-router-dom";

interface ChargingStation {
  id: number;
  name: string;
  status: "available" | "occupied";
  distance: string;
  lat: number;
  lng: number;
}

const Home = () => {
  const navigate = useNavigate();
  const [stations] = useState<ChargingStation[]>([
    { id: 1, name: "Tesla Supercharger", status: "available", distance: "0.5 km", lat: 51.505, lng: -0.09 },
    { id: 2, name: "ChargePoint Station", status: "occupied", distance: "1.2 km", lat: 51.51, lng: -0.1 },
    { id: 3, name: "EVgo Fast Charger", status: "available", distance: "2.3 km", lat: 51.515, lng: -0.08 },
    { id: 4, name: "BP Pulse", status: "available", distance: "3.1 km", lat: 51.52, lng: -0.12 },
  ]);

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-card shadow-sm p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Find Charging</h1>
          <p className="text-sm text-muted-foreground">4 stations nearby</p>
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Filter className="h-5 w-5" />
        </Button>
      </div>

      {/* Map Placeholder with gradient */}
      <div className="relative h-64 bg-gradient-to-br from-success/20 via-secondary/20 to-primary/20 flex items-center justify-center">
        <div className="absolute inset-0 bg-muted/40" />
        <MapPin className="h-16 w-16 text-primary relative z-10" />
        <p className="absolute bottom-4 text-sm text-muted-foreground">Interactive map view</p>
      </div>

      {/* Smart Route Button */}
      <div className="p-4">
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg">
          <Navigation className="mr-2 h-5 w-5" />
          Smart Route Suggestion
        </Button>
      </div>

      {/* Stations List */}
      <div className="px-4 space-y-3">
        {stations.map((station) => (
          <Card 
            key={station.id} 
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/station/${station.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  station.status === "available" ? "bg-success/10" : "bg-destructive/10"
                }`}>
                  <Battery className={`h-6 w-6 ${
                    station.status === "available" ? "text-success" : "text-destructive"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{station.name}</h3>
                  <p className="text-sm text-muted-foreground">{station.distance} away</p>
                  <Badge 
                    variant={station.status === "available" ? "default" : "destructive"}
                    className="mt-2"
                  >
                    {station.status === "available" ? "Available" : "Occupied"}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-primary">€0.35/kWh</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
