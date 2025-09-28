import Hero from '@/components/Hero';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Camera, 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  ArrowRight,
  Shield,
  Award,
  Compass
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Mountain className="h-6 w-6" />,
      title: 'Mountain Adventures',
      description: 'Explore the majestic Himalayas with expert guides',
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: 'Treasure Hunt',
      description: 'Find hidden gems and earn points in our gamified experience',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Group Travel',
      description: 'Join like-minded travelers on unforgettable journeys',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safe & Secure',
      description: 'Your safety is our top priority with experienced guides',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'USA',
      rating: 5,
      text: 'An absolutely incredible experience! The treasure hunt feature made exploring Nepal so much more engaging.',
    },
    {
      name: 'Marco Silva',
      location: 'Brazil',
      rating: 5,
      text: 'Best travel platform I\'ve used. The booking process was seamless and the guides were exceptional.',
    },
    {
      name: 'Yuki Tanaka',
      location: 'Japan',
      rating: 5,
      text: 'The gamification aspect added such a fun element to our Nepal adventure. Highly recommended!',
    },
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Why Choose TreasureNepal
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Your Gateway to 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Amazing Adventures</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover Nepal like never before with our innovative platform that combines 
              traditional travel with modern gamification.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer">
              <Link to="/booking">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Calendar className="h-8 w-8 text-primary" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl">Book Your Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Plan your perfect Nepal adventure or rent our luxury vans. 
                    Choose from curated experiences, destinations, and premium transport.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer">
              <Link to="/explore">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <MapPin className="h-8 w-8 text-adventure" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-adventure group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl">Explore Places</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Discover hidden gems and rural places across Nepal. 
                    Filter by region, difficulty, and activities.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>

            <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer">
              <Link to="/hunt">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Compass className="h-8 w-8 text-accent" />
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardTitle className="text-2xl">Start Hunting</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Join the treasure hunt! Find special places, scan QR codes, 
                    and earn points to climb the leaderboard.
                  </CardDescription>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Travelers Say</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied adventurers who've discovered Nepal with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-soft">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready for Your Nepal Adventure?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of travelers who've discovered the magic of Nepal
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="secondary" size="xl">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="xl" className="bg-white/10 border-white/30 hover:bg-white/20">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}