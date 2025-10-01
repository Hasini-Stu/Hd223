import { User, Car, Zap, TrendingDown, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BottomNav from "@/components/BottomNav";

const Profile = () => {
  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-card shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
              JD
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-foreground">John Doe</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2024</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Vehicle Info */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Car className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Your Vehicle</h3>
              <p className="text-foreground font-medium">Tesla Model 3</p>
              <p className="text-sm text-muted-foreground">Long Range • 2023</p>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
        </Card>

        {/* Charging Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
              <Zap className="h-6 w-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">127</p>
            <p className="text-sm text-muted-foreground">Total Charges</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
              <TrendingDown className="h-6 w-6 text-secondary" />
            </div>
            <p className="text-2xl font-bold text-foreground">342</p>
            <p className="text-sm text-muted-foreground">kg CO₂ Saved</p>
          </Card>
        </div>

        {/* Weekly Stats */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">This Week</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Energy Added</span>
                <span className="font-semibold">156 kWh</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-success w-3/4" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Total Cost</span>
                <span className="font-semibold">€54.60</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary to-primary w-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">CO₂ Emissions Saved</span>
                <span className="font-semibold text-success">42 kg</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success w-4/5" />
              </div>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Charger Preferences</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Preferred Type</span>
              <span className="font-medium">Type 2, CCS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Max Distance</span>
              <span className="font-medium">5 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price Range</span>
              <span className="font-medium">€0.30 - €0.50/kWh</span>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Profile;
