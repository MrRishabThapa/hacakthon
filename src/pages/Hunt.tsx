import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RootState } from '@/store';
import { startScanning, stopScanning, foundItem } from '@/store/slices/huntSlice';
import { updateScore } from '@/store/slices/authSlice';
import { 
  Camera, 
  Trophy, 
  MapPin, 
  Star,
  QrCode,
  Target,
  Award,
  Zap,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Hunt() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { items, foundItems, totalScore, scanning } = useSelector((state: RootState) => state.hunt);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleStartScan = (itemId: string) => {
    setSelectedItem(itemId);
    dispatch(startScanning());
    
    // Simulate scanning process
    setTimeout(() => {
      const item = items.find(i => i.id === itemId);
      if (item && !item.isFound) {
        dispatch(foundItem(itemId));
        dispatch(updateScore(item.points));
        toast({
          title: "Treasure Found!",
          description: `You discovered ${item.name} and earned ${item.points} points!`,
        });
      }
      dispatch(stopScanning());
      setSelectedItem(null);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-adventure text-adventure-foreground';
      case 'Medium': return 'bg-accent text-accent-foreground';
      case 'Hard': return 'bg-secondary text-secondary-foreground';
      case 'Extreme': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getPointsColor = (points: number) => {
    if (points >= 300) return 'text-secondary';
    if (points >= 200) return 'text-accent';
    if (points >= 150) return 'text-primary';
    return 'text-adventure';
  };

  const completionPercentage = (foundItems.length / items.length) * 100;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Treasure Hunt</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Hidden 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Treasures</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scan QR codes at special locations to discover treasures and earn points. 
            Compete with other adventurers and climb the leaderboard!
          </p>
        </div>

        {/* User Stats */}
        {user && (
          <Card className="mb-8 shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-accent" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">{user.score}</div>
                  <div className="text-sm text-muted-foreground">Total Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-adventure mb-1">{foundItems.length}</div>
                  <div className="text-sm text-muted-foreground">Treasures Found</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{user.tier}</div>
                  <div className="text-sm text-muted-foreground">Current Tier</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-1">{Math.round(completionPercentage)}%</div>
                  <div className="text-sm text-muted-foreground">Completion</div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Hunt Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {foundItems.length} of {items.length} found
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Hunt Items */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Available Treasures</h2>
            <Badge variant="outline" className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              {items.length} Treasures
            </Badge>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <Card 
                key={item.id} 
                className={`group transition-all duration-300 hover:shadow-medium ${
                  item.isFound ? 'bg-muted/50 border-adventure/50' : 'hover:scale-105'
                } ${selectedItem === item.id && scanning ? 'animate-pulse' : ''}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                    {item.isFound ? (
                      <CheckCircle className="h-5 w-5 text-adventure" />
                    ) : (
                      <div className={`flex items-center space-x-1 ${getPointsColor(item.points)}`}>
                        <Star className="h-4 w-4" />
                        <span className="font-semibold">{item.points}</span>
                      </div>
                    )}
                  </div>
                  
                  <CardTitle className={`text-xl ${item.isFound ? 'text-muted-foreground' : ''}`}>
                    {item.name}
                  </CardTitle>
                  
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {item.area}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className={`text-sm mb-4 ${item.isFound ? 'text-muted-foreground' : ''}`}>
                    {item.description}
                  </p>

                  {item.isFound ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-adventure">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">Treasure Found!</span>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Found on {new Date(item.foundAt!).toLocaleDateString()}
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant={selectedItem === item.id && scanning ? "secondary" : "hero"}
                      className="w-full"
                      onClick={() => handleStartScan(item.id)}
                      disabled={scanning}
                    >
                      {selectedItem === item.id && scanning ? (
                        <>
                          <QrCode className="h-4 w-4 mr-2 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4 mr-2" />
                          Scan to Find
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Play */}
        <Card className="mt-12 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              How to Play
            </CardTitle>
            <CardDescription>
              Follow these steps to start your treasure hunting adventure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">1. Visit Location</h3>
                <p className="text-sm text-muted-foreground">
                  Travel to the specified area where the treasure is hidden
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-secondary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">2. Find QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Look for the QR code at the treasure location and scan it
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-adventure rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="h-6 w-6 text-adventure-foreground" />
                </div>
                <h3 className="font-semibold mb-2">3. Earn Points</h3>
                <p className="text-sm text-muted-foreground">
                  Successfully scan to earn points and climb the leaderboard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Note */}
        <div className="mt-8 text-center">
          <Badge variant="outline" className="text-xs">
            Demo Mode: Click "Scan to Find" to simulate finding treasures
          </Badge>
        </div>
      </div>
    </div>
  );
}