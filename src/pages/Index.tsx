import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Users, Award } from "lucide-react";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    title: "Science Fair 2024",
    description: "Annual science fair showcasing student innovations and research projects. Students will present their work to judges and visitors.",
    date: "March 15, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "School Auditorium",
    category: "academic" as const,
    capacity: 200,
    registered: 145,
  },
  {
    id: "2", 
    title: "Basketball Championship",
    description: "Inter-school basketball tournament finals. Come support our school team as they compete for the championship title.",
    date: "March 20, 2024",
    time: "6:00 PM - 9:00 PM", 
    location: "School Gymnasium",
    category: "sports" as const,
    capacity: 300,
    registered: 280,
  },
  {
    id: "3",
    title: "Spring Dance",
    description: "Annual spring formal dance event for high school students. Music, food, and fun for everyone!",
    date: "April 5, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "School Cafeteria", 
    category: "social" as const,
    capacity: 150,
    registered: 89,
  },
  {
    id: "4",
    title: "Art Exhibition",
    description: "Student art showcase featuring paintings, sculptures, and digital art from our talented artists.",
    date: "March 25, 2024",
    time: "2:00 PM - 6:00 PM",
    location: "Art Gallery",
    category: "arts" as const,
    capacity: 100,
    registered: 67,
  },
  {
    id: "5",
    title: "Math Olympiad",
    description: "Regional mathematics competition for high-achieving students. Test your problem-solving skills!",
    date: "April 10, 2024", 
    time: "1:00 PM - 4:00 PM",
    location: "Library",
    category: "academic" as const,
    capacity: 50,
    registered: 48,
  },
  {
    id: "6",
    title: "Soccer Tournament",
    description: "School soccer tournament with multiple divisions. Players of all skill levels welcome to participate.",
    date: "April 15, 2024",
    time: "10:00 AM - 4:00 PM", 
    location: "Soccer Field",
    category: "sports" as const,
    capacity: 80,
    registered: 65,
  },
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);

  // Filter events based on search and category
  const handleSearch = () => {
    let filtered = mockEvents;
    
    if (searchTerm) {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }
    
    setFilteredEvents(filtered);
  };

  // Auto-filter when search term or category changes
  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCategory]);

  const stats = [
    { label: "Total Events", value: mockEvents.length, icon: Calendar },
    { label: "Total Registrations", value: mockEvents.reduce((sum, event) => sum + event.registered, 0), icon: Users },
    { label: "Categories", value: 4, icon: Award },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary to-accent py-20 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">School Event Registration</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover and register for exciting school events. From academic competitions to sports tournaments and social gatherings.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-foreground/20 rounded-lg mx-auto mb-2">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background/80 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="arts">Arts</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Upcoming Events</h2>
            <p className="text-muted-foreground">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            </p>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
