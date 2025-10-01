import { Trophy, Gift, Award, Leaf, Zap, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BottomNav from "@/components/BottomNav";

const Rewards = () => {
  const rewards = [
    { name: "1 Hour Free Parking", points: 50, icon: Gift },
    { name: "EV Cleaning Kit", points: 150, icon: Gift },
    { name: "€10 Charging Credit", points: 200, icon: Zap },
    { name: "Premium Cable", points: 500, icon: Gift },
  ];

  const badges = [
    { name: "Eco Warrior", desc: "Charged 50 times", icon: Leaf, unlocked: true },
    { name: "Night Owl", desc: "10 off-peak charges", icon: Award, unlocked: true },
    { name: "Speed Demon", desc: "Used fast charger 20 times", icon: Zap, unlocked: false },
    { name: "Green Champion", desc: "Saved 100kg CO₂", icon: Target, unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Header */}
      <div className="bg-card shadow-sm p-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Your Rewards</h1>
        
        {/* Points Balance */}
        <Card className="p-6 bg-gradient-to-br from-primary to-success mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">GreenCharge Points</p>
              <p className="text-4xl font-bold text-white">285</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="p-4 space-y-6">
        {/* Available Rewards */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Available Rewards</h2>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <reward.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground">{reward.points} points</p>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    variant={reward.points <= 285 ? "default" : "outline"}
                    disabled={reward.points > 285}
                  >
                    Redeem
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Your Badges</h2>
          <div className="grid grid-cols-2 gap-3">
            {badges.map((badge, index) => (
              <Card 
                key={index} 
                className={`p-4 ${badge.unlocked ? 'bg-gradient-to-br from-success/10 to-primary/5' : 'opacity-50'}`}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    badge.unlocked ? 'bg-success/20' : 'bg-muted'
                  }`}>
                    <badge.icon className={`h-8 w-8 ${
                      badge.unlocked ? 'text-success' : 'text-muted-foreground'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{badge.desc}</p>
                  </div>
                  {badge.unlocked && (
                    <Badge variant="default" className="text-xs">Unlocked</Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rewards;
