import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Users,
  Target,
  Award,
  Heart,
  Mountain,
  Compass,
  Camera,
  Shield,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion for Nepal",
      description:
        "We are deeply passionate about showcasing the beauty and culture of Nepal to the world.",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Safety First",
      description:
        "Your safety is our top priority. We work with certified guides and follow strict safety protocols.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Focus",
      description:
        "We believe in supporting local communities and sustainable tourism practices.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Innovation",
      description:
        "We combine traditional travel with modern technology to create unique experiences.",
    },
  ];

  const stats = [
    { number: "50+", label: "Destinations" },
    { number: "1000+", label: "Happy Travelers" },
    { number: "200+", label: "Local Partners" },
    { number: "5★", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative py-32 bg-gradient-mountain text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge
              variant="outline"
              className="mb-6 border-white/30 text-white"
            >
              About TreasureNepal
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discovering Nepal's Hidden
              <span className="block text-accent">Treasures Together</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              We're on a mission to revolutionize travel in Nepal by combining
              traditional exploration with innovative gamification, creating
              unforgettable adventures while supporting local communities.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                Our Mission
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Making Nepal Accessible to Every Adventurer
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                TreasureNepal was born from a simple idea: travel should be an
                adventure, not just a vacation. We believe that by gamifying the
                exploration of Nepal's incredible destinations, we can create
                deeper connections between travelers and the places they visit.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mountain className="h-5 w-5 text-primary" />
                  <span>Authentic cultural experiences</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Compass className="h-5 w-5 text-primary" />
                  <span>Interactive treasure hunt adventures</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Camera className="h-5 w-5 text-primary" />
                  <span>Sustainable tourism practices</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center border-0 shadow-soft">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold mb-4">What Drives Us Forward</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values guide every decision we make and every experience
              we create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              Our Story
            </Badge>
            <h2 className="text-4xl font-bold mb-8">The Journey Begins</h2>

            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2024 by a team of passionate travelers and technology
                enthusiasts, TreasureNepal emerged from countless journeys
                through the mystical landscapes of Nepal. We discovered that
                while Nepal offers some of the world's most breathtaking
                destinations, many hidden gems remain unexplored by travelers.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                Our innovative approach combines cutting-edge technology with
                traditional Nepali hospitality. Through our gamified platform,
                travelers can embark on treasure hunts, discover secret
                locations, and compete with fellow adventurers while
                contributing to local communities.
              </p>

              <p className="text-lg leading-relaxed">
                Today, TreasureNepal is proud to be Nepal's premier adventure
                travel platform, connecting curious explorers with authentic
                experiences and helping preserve the country's natural and
                cultural heritage for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <Award className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Join Our Adventure?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Become part of our growing community of adventurers and start
            discovering Nepal's hidden treasures today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="xl">
                Start Your Journey
              </Button>
            </Link>
            <Link to="/explore">
              <Button
                variant="outline"
                size="xl"
                className="bg-white/10 border-white/30 hover:bg-white/20"
              >
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
