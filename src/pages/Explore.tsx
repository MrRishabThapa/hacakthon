import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  Search,
  Filter,
  Mountain,
  TreePine,
  Building,
  Waves,
  Camera
} from 'lucide-react';

const places = [
  {
    id: 1,
    name: 'Ghandruk Village',
    region: 'Annapurna',
    type: 'Village',
    rating: 4.8,
    image: '/placeholder.svg',
    description: 'Beautiful Gurung village with stunning mountain views and traditional culture.',
    specialBadge: 'Cultural Heritage',
    difficulty: 'Easy',
    highlights: ['Traditional Architecture', 'Mountain Views', 'Local Culture'],
  },
  {
    id: 2,
    name: 'Bandipur',
    region: 'Central Nepal',
    type: 'Town',
    rating: 4.7,
    image: '/placeholder.svg',
    description: 'Preserved Newari town with medieval architecture and panoramic valley views.',
    specialBadge: 'Hidden Gem',
    difficulty: 'Easy',
    highlights: ['Newari Culture', 'Historic Buildings', 'Scenic Views'],
  },
  {
    id: 3,
    name: 'Rara Lake',
    region: 'Western Nepal',
    type: 'Lake',
    rating: 4.9,
    image: '/placeholder.svg',
    description: 'Nepal\'s largest lake surrounded by pristine wilderness and snow-capped peaks.',
    specialBadge: 'Remote Beauty',
    difficulty: 'Hard',
    highlights: ['Crystal Clear Waters', 'Wildlife', 'Solitude'],
  },
  {
    id: 4,
    name: 'Tansen (Palpa)',
    region: 'Western Nepal',
    type: 'Town',
    rating: 4.6,
    image: '/placeholder.svg',
    description: 'Historic hill station known for traditional music, crafts, and architecture.',
    specialBadge: 'Musical Heritage',
    difficulty: 'Medium',
    highlights: ['Traditional Music', 'Handicrafts', 'Hill Views'],
  },
  {
    id: 5,
    name: 'Khaptad National Park',
    region: 'Far Western Nepal',
    type: 'Nature',
    rating: 4.5,
    image: '/placeholder.svg',
    description: 'Peaceful grasslands, forests, and spiritual sites with diverse flora and fauna.',
    specialBadge: 'Spiritual Retreat',
    difficulty: 'Medium',
    highlights: ['Meditation Spots', 'Wildlife', 'Rolling Hills'],
  },
  {
    id: 6,
    name: 'Ilam Tea Gardens',
    region: 'Eastern Nepal',
    type: 'Plantation',
    rating: 4.4,
    image: '/placeholder.svg',
    description: 'Lush tea plantations with fresh mountain air and beautiful sunrise views.',
    specialBadge: 'Tea Paradise',
    difficulty: 'Easy',
    highlights: ['Tea Tasting', 'Sunrise Views', 'Fresh Air'],
  },
  {
    id: 7,
    name: 'Manaslu Circuit',
    region: 'Manaslu',
    type: 'Trek',
    rating: 4.9,
    image: '/placeholder.svg',
    description: 'Off-the-beaten-path trek around the world\'s eighth highest mountain.',
    specialBadge: 'Adventure Zone',
    difficulty: 'Hard',
    highlights: ['High Altitude', 'Remote Villages', 'Glacial Views'],
  },
  {
    id: 8,
    name: 'Janakpur',
    region: 'Central Nepal',
    type: 'City',
    rating: 4.3,
    image: '/placeholder.svg',
    description: 'Sacred city with beautiful temples and rich Hindu mythology connections.',
    specialBadge: 'Religious Heritage',
    difficulty: 'Easy',
    highlights: ['Ancient Temples', 'Religious Art', 'Cultural Festivals'],
  },
];

const regions = ['All Regions', 'Annapurna', 'Central Nepal', 'Western Nepal', 'Far Western Nepal', 'Eastern Nepal', 'Manaslu'];
const types = ['All Types', 'Village', 'Town', 'Lake', 'Nature', 'Plantation', 'Trek', 'City'];
const difficulties = ['All Difficulties', 'Easy', 'Medium', 'Hard'];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All Regions');
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Difficulties');

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'All Regions' || place.region === selectedRegion;
    const matchesType = selectedType === 'All Types' || place.type === selectedType;
    const matchesDifficulty = selectedDifficulty === 'All Difficulties' || place.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesRegion && matchesType && matchesDifficulty;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Village':
      case 'Town':
      case 'City':
        return <Building className="h-4 w-4" />;
      case 'Lake':
        return <Waves className="h-4 w-4" />;
      case 'Nature':
      case 'Plantation':
        return <TreePine className="h-4 w-4" />;
      case 'Trek':
        return <Mountain className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-adventure text-adventure-foreground';
      case 'Medium': return 'bg-accent text-accent-foreground';
      case 'Hard': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Cultural Heritage': return 'bg-accent text-accent-foreground';
      case 'Hidden Gem': return 'bg-adventure text-adventure-foreground';
      case 'Remote Beauty': return 'bg-primary text-primary-foreground';
      case 'Musical Heritage': return 'bg-secondary text-secondary-foreground';
      case 'Spiritual Retreat': return 'bg-muted text-muted-foreground';
      case 'Tea Paradise': return 'bg-adventure text-adventure-foreground';
      case 'Adventure Zone': return 'bg-secondary text-secondary-foreground';
      case 'Religious Heritage': return 'bg-accent text-accent-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Explore Nepal</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Hidden 
            <span className="bg-gradient-hero bg-clip-text text-transparent"> Treasures</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore Nepal's rural places, ancient villages, and breathtaking natural wonders 
            waiting to be discovered.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Destinations
            </CardTitle>
            <CardDescription>
              Find the perfect place based on your preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search places..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((difficulty) => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm text-muted-foreground">
                {filteredPlaces.length} place{filteredPlaces.length !== 1 ? 's' : ''} found
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('All Regions');
                  setSelectedType('All Types');
                  setSelectedDifficulty('All Difficulties');
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <Card key={place.id} className="group hover:shadow-strong transition-all duration-300 cursor-pointer overflow-hidden">
              <div className="relative h-48 bg-muted">
                <div className="absolute inset-0 bg-gradient-hero/20" />
                <div className="absolute top-4 left-4">
                  <Badge className={getBadgeColor(place.specialBadge)}>
                    {place.specialBadge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(place.difficulty)}>
                    {place.difficulty}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center space-x-1 text-white text-sm">
                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                    <span>{place.rating}</span>
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {place.name}
                  </CardTitle>
                  {getTypeIcon(place.type)}
                </div>
                <CardDescription className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  {place.region}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {place.description}
                </p>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2 text-sm">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {place.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Camera className="h-4 w-4 mr-2" />
                    Explore Place
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No places found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms to discover more places.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRegion('All Regions');
                  setSelectedType('All Types');
                  setSelectedDifficulty('All Difficulties');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}