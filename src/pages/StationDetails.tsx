import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Zap, Clock, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-card shadow-sm p-4 flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Tesla Supercharger</h1>
          <p className="text-sm text-muted-foreground">Station #{id}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Card */}
        <Card className="p-6 bg-gradient-to-br from-success/10 to-primary/5">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-success text-success-foreground">
              Available Now
            </Badge>
            <div className="flex items-center gap-1 text-warning">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-semibold">4.8</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Charger Type</p>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-semibold">Type 2, CHAdeMO</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Power Output</p>
              <p className="font-semibold">150 kW</p>
            </div>
          </div>
        </Card>

        {/* Location */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">
                123 Green Street, City Center
              </p>
              <p className="text-sm text-primary mt-1">0.5 km away</p>
            </div>
          </div>
        </Card>

        {/* AI Prediction */}
        <Card className="p-4 bg-gradient-to-br from-secondary/10 to-primary/5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1 flex items-center gap-2">
                Smart Prediction
                <Badge variant="secondary" className="text-xs">AI</Badge>
              </h3>
              <p className="text-sm text-muted-foreground">
                Expected to remain available for the next 2 hours based on usage patterns
              </p>
            </div>
          </div>
        </Card>

        {/* Pricing & Incentive */}
        <Card className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Pricing</h3>
              <p className="text-2xl font-bold text-primary mb-1">€0.35/kWh</p>
              <p className="text-sm text-muted-foreground">Peak hours: €0.45/kWh</p>
            </div>
          </div>
          
          <div className="bg-warning/10 rounded-lg p-3 border border-warning/20">
            <p className="text-sm font-semibold text-warning mb-1">
              🎁 Off-Peak Bonus
            </p>
            <p className="text-sm text-muted-foreground">
              Earn 15 GreenCharge points for charging during off-peak hours!
            </p>
          </div>
        </Card>

        {/* Reserve Button */}
        <Button 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-success hover:opacity-90 shadow-lg"
          onClick={() => navigate("/notification")}
        >
          Reserve This Station
        </Button>
      </div>
    </div>
  );
};

export default StationDetails;
