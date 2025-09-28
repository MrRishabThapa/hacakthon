import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addBooking } from "@/store/slices/bookingSlice";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Users,
  Star,
  Clock,
  DollarSign,
  Mountain,
  Camera,
  Compass,
  Car,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  place: z.string().min(1, "Please select a destination"),
  date: z.date({
    required_error: "Please select a date",
  }),
  people: z
    .number()
    .min(1, "Must be at least 1 person")
    .max(20, "Maximum 20 people"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const destinations = [
  {
    id: "everest-base-camp",
    name: "Everest Base Camp Trek",
    location: "Khumbu Valley",
    duration: "14 Days",
    difficulty: "Hard",
    price: 100000,
    rating: 4.9,
    image: "/placeholder.svg",
    description:
      "The ultimate trekking adventure to the base of the world's highest mountain.",
    highlights: ["Namche Bazaar", "Tengboche Monastery", "Kala Patthar"],
  },
  {
    id: "annapurna-circuit",
    name: "Annapurna Circuit Trek",
    location: "Annapurna Region",
    duration: "12 Days",
    difficulty: "Medium",
    price: 50000,
    rating: 4.8,
    image: "/placeholder.svg",
    description:
      "Classic trek through diverse landscapes and traditional villages.",
    highlights: ["Thorong La Pass", "Muktinath Temple", "Poon Hill"],
  },
  {
    id: "chitwan-safari",
    name: "Chitwan Jungle Safari",
    location: "Chitwan National Park",
    duration: "3 Days",
    difficulty: "Easy",
    price: 25700,
    rating: 4.7,
    image: "/placeholder.svg",
    description: "Wildlife adventure in one of Nepal's premier national parks.",
    highlights: ["Rhino Spotting", "Elephant Safari", "Bird Watching"],
  },
  {
    id: "pokhara-adventure",
    name: "Pokhara Adventure Package",
    location: "Pokhara Valley",
    duration: "5 Days",
    difficulty: "Easy",
    price: 29500,
    rating: 4.6,
    image: "/placeholder.svg",
    description:
      "Perfect blend of adventure and relaxation by beautiful lakes.",
    highlights: ["Phewa Lake", "Paragliding", "Sarangkot Sunrise"],
  },
  {
    id: "langtang-valley",
    name: "Langtang Valley Trek",
    location: "Langtang Region",
    duration: "8 Days",
    difficulty: "Medium",
    price: 23000,
    rating: 4.5,
    image: "/placeholder.svg",
    description:
      "Beautiful valley trek with stunning mountain views and Tamang culture.",
    highlights: ["Kyanjin Gompa", "Cheese Factory", "Mountain Views"],
  },
  {
    id: "kathmandu-cultural",
    name: "Kathmandu Cultural Tour",
    location: "Kathmandu Valley",
    duration: "2 Days",
    difficulty: "Easy",
    price: 15500,
    rating: 4.4,
    image: "/placeholder.svg",
    description:
      "Explore ancient temples, palaces, and UNESCO World Heritage sites.",
    highlights: ["Durbar Square", "Swayambhunath", "Boudhanath"],
  },
];

const luxuryVans = [
  {
    id: "premium-van",
    name: "Premium Luxury Van",
    type: "Premium",
    capacity: "8-10 People",
    features: ["AC/Heater", "Leather Seats", "WiFi", "Entertainment System"],
    pricePerDay: 15000,
    rating: 4.9,
    image: "/placeholder.svg",
    description:
      "Top-tier luxury van with premium amenities for the ultimate travel experience.",
    highlights: ["Premium Sound System", "Panoramic Windows", "Mini Bar"],
  },
  {
    id: "deluxe-van",
    name: "Deluxe Comfort Van",
    type: "Deluxe",
    capacity: "10-12 People",
    features: ["AC", "Comfortable Seats", "Music System", "Phone Charging"],
    pricePerDay: 10000,
    rating: 4.7,
    image: "/placeholder.svg",
    description:
      "Comfortable deluxe van perfect for group travel with modern amenities.",
    highlights: ["Spacious Interior", "Good Sound System", "USB Charging"],
  },
  {
    id: "standard-van",
    name: "Standard Travel Van",
    type: "Standard",
    capacity: "12-15 People",
    features: ["Basic AC", "Standard Seats", "Radio", "Storage Space"],
    pricePerDay: 7000,
    rating: 4.4,
    image: "/placeholder.svg",
    description:
      "Reliable standard van for budget-conscious travelers without compromising safety.",
    highlights: ["Reliable Engine", "Good Mileage", "Spacious"],
  },
  {
    id: "economy-van",
    name: "Economy Van",
    type: "Economy",
    capacity: "15+ People",
    features: ["Fan", "Basic Seats", "Radio"],
    pricePerDay: 4500,
    rating: 4.0,
    image: "/placeholder.svg",
    description:
      "Budget-friendly option for large groups looking for basic transportation.",
    highlights: ["Large Capacity", "Budget Friendly", "Basic Comfort"],
  },
];

export default function Booking() {
  const [selectedDestination, setSelectedDestination] = useState<
    (typeof destinations)[0] | null
  >(null);
  const [selectedVan, setSelectedVan] = useState<(typeof luxuryVans)[0] | null>(
    null
  );
  const [activeTab, setActiveTab] = useState<"destinations" | "vans">(
    "destinations"
  );
  const dispatch = useDispatch();
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      place: "",
      people: 1,
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: BookingFormData) => {
    const selectedService =
      activeTab === "destinations" ? selectedDestination : selectedVan;
    if (!selectedService) return;

    dispatch(
      addBooking({
        place: selectedService.name,
        people: data.people,
        name: data.name,
        email: data.email,
        phone: data.phone,
        date: format(data.date, "yyyy-MM-dd"),
      })
    );

    toast({
      title: "Booking Submitted!",
      description: `We'll contact you soon to confirm your ${
        activeTab === "destinations" ? "adventure" : "van rental"
      }.`,
    });

    form.reset();
    setSelectedDestination(null);
    setSelectedVan(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-adventure";
      case "Medium":
        return "bg-accent";
      case "Hard":
        return "bg-secondary";
      default:
        return "bg-primary";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return <Camera className="h-4 w-4" />;
      case "Medium":
        return <Compass className="h-4 w-4" />;
      case "Hard":
        return <Mountain className="h-4 w-4" />;
      default:
        return <MapPin className="h-4 w-4" />;
    }
  };

  const getVanTypeColor = (type: string) => {
    switch (type) {
      case "Premium":
        return "bg-secondary";
      case "Deluxe":
        return "bg-accent";
      case "Standard":
        return "bg-primary";
      case "Economy":
        return "bg-adventure";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Book Your Service
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Nepal
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              {" "}
              Experience
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book adventure packages or rent our luxury vans for your perfect
            Nepal journey.
          </p>
        </div>

        {/* Service Tabs */}
        <div className="flex space-x-1 bg-muted p-1 rounded-lg mb-8 max-w-md mx-auto">
          <Button
            variant={activeTab === "destinations" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => {
              setActiveTab("destinations");
              setSelectedVan(null);
              form.setValue("place", "");
            }}
          >
            <Mountain className="h-4 w-4 mr-2" />
            Adventure Packages
          </Button>
          <Button
            variant={activeTab === "vans" ? "default" : "ghost"}
            className="flex-1"
            onClick={() => {
              setActiveTab("vans");
              setSelectedDestination(null);
              form.setValue("place", "");
            }}
          >
            <Car className="h-4 w-4 mr-2" />
            Luxury Van Rental
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Grid */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">
              {activeTab === "destinations"
                ? "Available Destinations"
                : "Luxury Van Fleet"}
            </h2>

            {activeTab === "destinations" ? (
              <div className="grid md:grid-cols-2 gap-6">
                {destinations.map((destination) => (
                  <Card
                    key={destination.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                      selectedDestination?.id === destination.id
                        ? "ring-2 ring-primary shadow-medium"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedDestination(destination);
                      setSelectedVan(null);
                      form.setValue("place", destination.name);
                    }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          className={cn(
                            "text-white",
                            getDifficultyColor(destination.difficulty)
                          )}
                        >
                          {getDifficultyIcon(destination.difficulty)}
                          <span className="ml-1">{destination.difficulty}</span>
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">
                            {destination.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">
                        {destination.name}
                      </CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {destination.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {destination.duration}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {destination.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Highlights:</h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.highlights.map((highlight, index) => (
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

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-2xl font-bold text-primary flex items-center">
                            <span className="text-sm mr-1">Rs</span>
                            {destination.price.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            per person
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {luxuryVans.map((van) => (
                  <Card
                    key={van.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-medium ${
                      selectedVan?.id === van.id
                        ? "ring-2 ring-primary shadow-medium"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedVan(van);
                      setSelectedDestination(null);
                      form.setValue("place", van.name);
                    }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge
                          className={cn(
                            "text-white",
                            getVanTypeColor(van.type)
                          )}
                        >
                          <Car className="h-4 w-4 mr-1" />
                          {van.type}
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">
                            {van.rating}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-xl">{van.name}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {van.capacity}
                        </span>
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {van.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium mb-2">Features:</h4>
                          <div className="flex flex-wrap gap-2">
                            {van.features.map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Highlights:</h4>
                          <div className="flex flex-wrap gap-2">
                            {van.highlights.map((highlight, index) => (
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

                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-2xl font-bold text-primary flex items-center">
                            <span className="text-sm mr-1">Rs</span>
                            {van.pricePerDay.toLocaleString()}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            per day
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-medium">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {activeTab === "destinations"
                    ? "Book Your Adventure"
                    : "Rent Luxury Van"}
                </CardTitle>
                <CardDescription>
                  {selectedDestination || selectedVan
                    ? `Complete your booking for ${
                        (selectedDestination || selectedVan)?.name
                      }`
                    : `Select a ${
                        activeTab === "destinations" ? "destination" : "van"
                      } to continue`}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {(selectedDestination || selectedVan) && (
                  <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold mb-2">
                      {(selectedDestination || selectedVan)?.name}
                    </h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      {selectedDestination && (
                        <>
                          <div className="flex items-center justify-between">
                            <span>Duration:</span>
                            <span>{selectedDestination.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Difficulty:</span>
                            <Badge
                              className={cn(
                                "text-white text-xs",
                                getDifficultyColor(
                                  selectedDestination.difficulty
                                )
                              )}
                            >
                              {selectedDestination.difficulty}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Price per person:</span>
                            <span className="font-semibold">
                              Rs {selectedDestination.price.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                      {selectedVan && (
                        <>
                          <div className="flex items-center justify-between">
                            <span>Capacity:</span>
                            <span>{selectedVan.capacity}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Type:</span>
                            <Badge
                              className={cn(
                                "text-white text-xs",
                                getVanTypeColor(selectedVan.type)
                              )}
                            >
                              {selectedVan.type}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Price per day:</span>
                            <span className="font-semibold">
                              Rs {selectedVan.pricePerDay.toLocaleString()}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="place"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {activeTab === "destinations"
                              ? "Destination"
                              : "Van Type"}
                          </FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              if (activeTab === "destinations") {
                                const destination = destinations.find(
                                  (d) => d.name === value
                                );
                                setSelectedDestination(destination || null);
                                setSelectedVan(null);
                              } else {
                                const van = luxuryVans.find(
                                  (v) => v.name === value
                                );
                                setSelectedVan(van || null);
                                setSelectedDestination(null);
                              }
                            }}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={`Select ${
                                    activeTab === "destinations"
                                      ? "destination"
                                      : "van"
                                  }`}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {activeTab === "destinations"
                                ? destinations.map((destination) => (
                                    <SelectItem
                                      key={destination.id}
                                      value={destination.name}
                                    >
                                      {destination.name}
                                    </SelectItem>
                                  ))
                                : luxuryVans.map((van) => (
                                    <SelectItem key={van.id} value={van.name}>
                                      {van.name}
                                    </SelectItem>
                                  ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Travel Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="people"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {activeTab === "destinations"
                              ? "Number of People"
                              : "Rental Days"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              max="20"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 1)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your phone number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {(selectedDestination || selectedVan) && (
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <div className="flex items-center justify-between text-lg font-semibold">
                          <span>Total Cost:</span>
                          <span className="text-primary">
                            Rs{" "}
                            {selectedDestination
                              ? (
                                  selectedDestination.price *
                                  (form.watch("people") || 1)
                                ).toLocaleString()
                              : selectedVan
                              ? (
                                  selectedVan.pricePerDay *
                                  (form.watch("people") || 1)
                                ).toLocaleString()
                              : 0}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {selectedDestination
                            ? `${
                                form.watch("people") || 1
                              } person(s) × Rs ${selectedDestination.price.toLocaleString()}`
                            : selectedVan
                            ? `${
                                form.watch("people") || 1
                              } day(s) × Rs ${selectedVan.pricePerDay.toLocaleString()}`
                            : ""}
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={
                        !(selectedDestination || selectedVan) ||
                        form.formState.isSubmitting
                      }
                    >
                      {form.formState.isSubmitting
                        ? "Booking..."
                        : activeTab === "destinations"
                        ? "Book Adventure"
                        : "Rent Van"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
