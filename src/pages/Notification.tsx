import { useNavigate } from "react-router-dom";
import { CheckCircle2, Gift, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Notification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center animate-scale-in">
            <CheckCircle2 className="h-12 w-12 text-success" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Charging Complete!
          </h1>
          <p className="text-muted-foreground">
            Your vehicle is fully charged and ready to go
          </p>
        </div>

        <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg p-4 border border-success/20">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="h-5 w-5 text-success" />
            <p className="font-semibold text-foreground">Reward Earned!</p>
          </div>
          <p className="text-2xl font-bold text-success mb-1">+10 Points</p>
          <p className="text-sm text-muted-foreground">
            Thank you for unplugging on time
          </p>
        </div>

        <div className="space-y-3 pt-4">
          <Button 
            className="w-full h-12 bg-gradient-to-r from-primary to-success hover:opacity-90"
            onClick={() => navigate("/rewards")}
          >
            Track Rewards
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full h-12"
            onClick={() => navigate("/home")}
          >
            Back to Home
          </Button>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground mb-2">Charging Summary</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Duration</p>
              <p className="font-semibold">2h 45m</p>
            </div>
            <div>
              <p className="text-muted-foreground">Energy Added</p>
              <p className="font-semibold">45 kWh</p>
            </div>
            <div>
              <p className="text-muted-foreground">Cost</p>
              <p className="font-semibold">€15.75</p>
            </div>
            <div>
              <p className="text-muted-foreground">CO₂ Saved</p>
              <p className="font-semibold text-success">12 kg</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Notification;
