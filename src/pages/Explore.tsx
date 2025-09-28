import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Search,
  Filter,
  Mountain,
  TreePine,
  Building,
  Waves,
  Camera,
} from "lucide-react";

// Import all images
import gosaikundaImg from "@/assets/gosaikunda.jpg";
import rupseImg from "@/assets/rupse.jpg";
import khaptadImg from "@/assets/khaptad.jpg";
import raraImg from "@/assets/Rara-lake-view.jpg";
import chisapaniImg from "@/assets/kali.jpeg";
import tinjureImg from "@/assets/tinjure.jpg";
import rangbhangImg from "@/assets/rangbhang.jpg";
import barunImg from "@/assets/barun.png";

const places = [
  {
    id: 1,
    name: "Gosaikunda",
    region: "Langtang",
    type: "Lake",
    rating: 4.8,
    image: gosaikundaImg,
    description:
      "A sacred alpine lake surrounded by snow-capped peaks, perfect for trekking and spiritual reflection.",
    specialBadge: "Sacred Beauty",
    difficulty: "Hard",
    highlights: ["Holy Lake", "Alpine Views", "Trekking Adventure"],
  },
  {
    id: 2,
    name: "Rupse Chhahara",
    region: "Mustang",
    type: "Waterfall",
    rating: 4.7,
    image: rupseImg,
    description:
      "A stunning hidden waterfall cascading from a cliff in the remote Mustang region.",
    specialBadge: "Hidden Gem",
    difficulty: "Medium",
    highlights: ["Waterfall Views", "Secluded Spot", "Nature Walks"],
  },
  {
    id: 3,
    name: "Khaptad Dham",
    region: "Far Western Nepal",
    type: "Nature & Spiritual",
    rating: 4.9,
    image: khaptadImg,
    description:
      "A serene plateau with rolling hills, sacred sites, and vibrant wildflowers untouched by crowds.",
    specialBadge: "Peaceful Retreat",
    difficulty: "Medium",
    highlights: ["Meditation Spots", "Wildflowers", "Quiet Hills"],
  },
  {
    id: 4,
    name: "Rara Lake Viewpoints",
    region: "Far Western Nepal",
    type: "Lake",
    rating: 4.8,
    image: raraImg,
    description:
      "Nepal's largest lake, surrounded by pristine wilderness and rarely visited hiking trails.",
    specialBadge: "Remote Beauty",
    difficulty: "Hard",
    highlights: ["Crystal Clear Waters", "Wildlife", "Solitude"],
  },
  {
    id: 5,
    name: "Chisapani Gadhi",
    region: "Eastern Nepal",
    type: "Hill Fort",
    rating: 4.6,
    image: chisapaniImg,
    description:
      "A historic fort with panoramic views of the hills and sunrise landscapes, often overlooked by tourists.",
    specialBadge: "Historic Overlook",
    difficulty: "Medium",
    highlights: ["Hill Views", "Historic Architecture", "Sunrise"],
  },
  {
    id: 6,
    name: "Tinjure-Milke-Jaljale",
    region: "Eastern Nepal",
    type: "Himalayan Trail",
    rating: 4.5,
    image: tinjureImg,
    description:
      "A quiet trail known as the 'Rhododendron Capital,' with colorful blooms and panoramic mountain vistas.",
    specialBadge: "Nature's Palette",
    difficulty: "Medium",
    highlights: ["Rhododendron Forests", "Panoramic Views", "Birdwatching"],
  },
  {
    id: 7,
    name: "Rangbhang Valley",
    region: "Far Western Nepal",
    type: "Valley",
    rating: 4.7,
    image: rangbhangImg,
    description:
      "A hidden valley offering untouched landscapes, quaint villages, and Himalayan serenity.",
    specialBadge: "Offbeat Paradise",
    difficulty: "Hard",
    highlights: ["Remote Villages", "Mountain Views", "Trekking"],
  },
  {
    id: 8,
    name: "Barun Valley",
    region: "Makalu",
    type: "Trek",
    rating: 4.9,
    image: barunImg,
    description:
      "A hidden gem in the Makalu region, rich in biodiversity and surrounded by towering peaks.",
    specialBadge: "Untouched Wilderness",
    difficulty: "Hard",
    highlights: ["Biodiversity", "Glacial Views", "High Altitude Trekking"],
  },
];

const regions = [
  "All Regions",
  "Annapurna",
  "Central Nepal",
  "Western Nepal",
  "Far Western Nepal",
  "Eastern Nepal",
  "Manaslu",
];
const types = [
  "All Types",
  "Village",
  "Town",
  "Lake",
  "Nature",
  "Plantation",
  "Trek",
  "City",
];
const difficulties = ["All Difficulties", "Easy", "Medium", "Hard"];

export default function Explore() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("All Difficulties");

  const filteredPlaces = places.filter((place) => {
    const matchesSearch =
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All Regions" || place.region === selectedRegion;
    const matchesType =
      selectedType === "All Types" || place.type === selectedType;
    const matchesDifficulty =
      selectedDifficulty === "All Difficulties" ||
      place.difficulty === selectedDifficulty;

    return matchesSearch && matchesRegion && matchesType && matchesDifficulty;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Village":
      case "Town":
      case "City":
        return <Building className="h-4 w-4" />;
      case "Lake":
        return <Waves className="h-4 w-4" />;
      case "Nature":
      case "Plantation":
        return <TreePine className="h-4 w-4" />;
      case "Trek":
        return <Mountain className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-adventure text-adventure-foreground";
      case "Medium":
        return "bg-accent text-accent-foreground";
      case "Hard":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Cultural Heritage":
        return "bg-accent text-accent-foreground";
      case "Hidden Gem":
        return "bg-adventure text-adventure-foreground";
      case "Remote Beauty":
        return "bg-primary text-primary-foreground";
      case "Musical Heritage":
        return "bg-secondary text-secondary-foreground";
      case "Spiritual Retreat":
        return "bg-muted text-muted-foreground";
      case "Tea Paradise":
        return "bg-adventure text-adventure-foreground";
      case "Adventure Zone":
        return "bg-secondary text-secondary-foreground";
      case "Religious Heritage":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Explore Nepal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Hidden
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              {" "}
              Treasures
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore Nepal's rural places, ancient villages, and breathtaking
            natural wonders waiting to be discovered.
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
                <Select
                  value={selectedRegion}
                  onValueChange={setSelectedRegion}
                >
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
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
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
                {filteredPlaces.length} place
                {filteredPlaces.length !== 1 ? "s" : ""} found
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("All Regions");
                  setSelectedType("All Types");
                  setSelectedDifficulty("All Difficulties");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Places Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {places.map((place) => (
            <Card
              key={place.id}
              className="group hover:shadow-strong transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative h-48 bg-muted">
                <div
                  className="absolute inset-0 "
                  style={{ backgroundImage: `url(${place.image})` }}
                />
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
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
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
                Try adjusting your filters or search terms to discover more
                places.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("All Regions");
                  setSelectedType("All Types");
                  setSelectedDifficulty("All Difficulties");
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
