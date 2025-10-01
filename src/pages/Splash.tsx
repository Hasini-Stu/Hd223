import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import logo from "@/assets/logo.png";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-success/20 blur-3xl rounded-full animate-pulse" />
        <img 
          src={logo} 
          alt="ParkCharge+ Logo" 
          className="w-32 h-32 relative z-10 drop-shadow-lg animate-scale-in"
        />
      </div>
      
      <h1 className="text-5xl font-bold text-white mt-8 mb-2 tracking-tight">
        ParkCharge+
      </h1>
      
      <p className="text-xl text-white/90 font-medium flex items-center gap-2">
        <Zap className="w-5 h-5" />
        Charge Smart. Park Smarter.
      </p>
      
      <div className="mt-12 flex gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "200ms" }} />
        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "400ms" }} />
      </div>
    </div>
  );
};

export default Splash;
