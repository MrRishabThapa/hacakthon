import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { RootState } from '@/store';
import { 
  Trophy, 
  Medal, 
  Award,
  Crown,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap
} from 'lucide-react';

// Mock leaderboard data
const leaderboardData = [
  {
    id: '1',
    name: 'Alex Chen',
    score: 15420,
    tier: 'Legend',
    treasuresFound: 47,
    completionRate: 94,
    avatar: 'AC',
    isCurrentUser: false,
  },
  {
    id: '2',
    name: 'Sarah Kumar',
    score: 12850,
    tier: 'Expert Explorer',
    treasuresFound: 38,
    completionRate: 76,
    avatar: 'SK',
    isCurrentUser: false,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    score: 11200,
    tier: 'Expert Explorer',
    treasuresFound: 34,
    completionRate: 68,
    avatar: 'MJ',
    isCurrentUser: false,
  },
  {
    id: '4',
    name: 'Emma Wilson',
    score: 9750,
    tier: 'Expert Explorer',
    treasuresFound: 29,
    completionRate: 58,
    avatar: 'EW',
    isCurrentUser: false,
  },
  {
    id: '5',
    name: 'John Doe',
    score: 8500,
    tier: 'Adventurer',
    treasuresFound: 25,
    completionRate: 50,
    avatar: 'JD',
    isCurrentUser: true, // This would be the logged-in user
  },
];

const tiers = [
  { name: 'Rookie', minScore: 0, icon: <Star className="h-5 w-5" />, color: 'text-muted-foreground' },
  { name: 'Explorer', minScore: 500, icon: <Target className="h-5 w-5" />, color: 'text-adventure' },
  { name: 'Adventurer', minScore: 2000, icon: <Award className="h-5 w-5" />, color: 'text-accent' },
  { name: 'Expert Explorer', minScore: 5000, icon: <Medal className="h-5 w-5" />, color: 'text-primary' },
  { name: 'Legend', minScore: 10000, icon: <Crown className="h-5 w-5" />, color: 'text-secondary' },
];

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState<'all' | 'friends'>('all');
  const { user } = useSelector((state: RootState) => state.auth);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-500" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  const getTierColor = (tier: string) => {
    const tierData = tiers.find(t => t.name === tier);
    return tierData?.color || 'text-muted-foreground';
  };

  const getTierIcon = (tier: string) => {
    const tierData = tiers.find(t => t.name === tier);
    return tierData?.icon || <Star className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Leaderboard</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Adventure 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Champions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how you rank against other treasure hunters and discover who leads 
            the ultimate Nepal adventure challenge.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <Button
                variant={activeTab === 'all' ? 'default' : 'ghost'}
                className="flex-1"
                onClick={() => setActiveTab('all')}
              >
                <Users className="h-4 w-4 mr-2" />
                All Players
              </Button>
              <Button
                variant={activeTab === 'friends' ? 'default' : 'ghost'}
                className="flex-1"
                onClick={() => setActiveTab('friends')}
              >
                <Star className="h-4 w-4 mr-2" />
                Friends
              </Button>
            </div>

            {/* Top 3 Podium */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-accent" />
                  Top Adventurers
                </CardTitle>
                <CardDescription>The ultimate treasure hunting champions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {leaderboardData.slice(0, 3).map((player, index) => (
                    <div key={player.id} className={`text-center p-4 rounded-lg ${
                      index === 0 ? 'bg-gradient-hero text-white' : 'bg-muted/50'
                    }`}>
                      <div className="flex justify-center mb-3">
                        {getRankIcon(index + 1)}
                      </div>
                      <Avatar className="mx-auto mb-3 w-16 h-16">
                        <AvatarFallback className="text-lg font-bold">
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold mb-1">{player.name}</h3>
                      <div className={`text-2xl font-bold mb-1 ${index === 0 ? 'text-white' : 'text-primary'}`}>
                        {player.score.toLocaleString()}
                      </div>
                      <Badge variant={index === 0 ? 'secondary' : 'outline'} className="text-xs">
                        {player.tier}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Full Rankings</CardTitle>
                <CardDescription>Complete leaderboard with detailed stats</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboardData.map((player, index) => (
                    <div 
                      key={player.id} 
                      className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                        player.isCurrentUser 
                          ? 'bg-primary/10 border border-primary/20' 
                          : 'bg-muted/30 hover:bg-muted/50'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {getRankIcon(index + 1)}
                      </div>
                      
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="font-semibold">
                          {player.avatar}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold truncate">
                            {player.name}
                            {player.isCurrentUser && (
                              <span className="ml-2 text-xs text-primary">(You)</span>
                            )}
                          </h3>
                          <div className={`flex items-center space-x-1 ${getTierColor(player.tier)}`}>
                            {getTierIcon(player.tier)}
                            <span className="text-sm font-medium">{player.tier}</span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {player.treasuresFound} treasures • {player.completionRate}% complete
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">
                          {player.score.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            {user && (
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Current Rank</span>
                      <Badge variant="outline">#5</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Score</span>
                      <span className="font-bold text-primary">{user.score}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Current Tier</span>
                      <div className={`flex items-center space-x-1 ${getTierColor(user.tier)}`}>
                        {getTierIcon(user.tier)}
                        <span className="text-sm font-medium">{user.tier}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="text-sm text-muted-foreground mb-2">
                        Next tier: Expert Explorer
                      </div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>{user.score}</span>
                        <span>5,000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${(user.score / 5000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tier System */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Tier System
                </CardTitle>
                <CardDescription>Advance through the ranks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tiers.map((tier, index) => (
                    <div 
                      key={tier.name} 
                      className={`flex items-center space-x-3 p-3 rounded-lg ${
                        user?.tier === tier.name ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'
                      }`}
                    >
                      <div className={tier.color}>
                        {tier.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{tier.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {tier.minScore.toLocaleString()}+ points
                        </div>
                      </div>
                      {user?.tier === tier.name && (
                        <Badge variant="outline" className="text-xs">Current</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="hero" className="w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Start Hunting
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="h-4 w-4 mr-2" />
                  Invite Friends
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}