import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, Users, Award } from "lucide-react";
import EventCard from "@/components/EventCard";
import Navbar from "@/components/Navbar";
import { fetchEventsByCategory } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("education");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, token, isAuthenticated } = useAuth();

  // Fetch events when category changes
  useEffect(() => {
    setLoading(true);
    setError("");
    fetchEventsByCategory(selectedCategory)
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load events from backend.");
        setLoading(false);
      });
  }, [selectedCategory]);

  // Filter events based on search and category
  const handleSearch = () => {
    let filtered = events;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title?.toLowerCase().includes(searchLower) ||
        event.description?.toLowerCase().includes(searchLower) ||
        event.location?.toLowerCase().includes(searchLower) ||
        event.category?.toLowerCase().includes(searchLower)
      );
    }
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [searchTerm, events]);

  const handleRegister = async (event) => {
    if (!user || !token) {
      toast({ title: "Not authenticated", description: "Please sign in to register for events.", variant: "destructive" });
      return;
    }
    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ event_id: event.id, user_id: user.id }),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Registration failed");
      }
      toast({ title: "Registration successful!", description: `You have registered for ${event.title}.` });
    } catch (err) {
      toast({ title: "Registration failed", description: err.message, variant: "destructive" });
    }
  };

  const stats = [
    { label: "Total Events", value: events.length, icon: Calendar },
    { label: "Total Registrations", value: events.reduce((sum, event) => sum + (event.registered || 0), 0), icon: Users },
    { label: "Categories", value: 1, icon: Award },
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
                  placeholder="Search events by title, description, location, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="px-6"
                disabled={loading}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="arts">Arts & Culture</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="theater">Theater</SelectItem>
                  <SelectItem value="science">Science & Technology</SelectItem>
                  <SelectItem value="community">Community Service</SelectItem>
                  <SelectItem value="leadership">Leadership</SelectItem>
                  <SelectItem value="career">Career Development</SelectItem>
                  <SelectItem value="workshop">Workshops</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
                className="text-sm"
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading events...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-foreground">
                  {selectedCategory === 'education' ? 'Education Events' : 
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) + ' Events'}
                </h2>
                <p className="text-muted-foreground">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                </p>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No events found for the selected category.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Try selecting a different category or clearing your search.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} onRegister={handleRegister} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
