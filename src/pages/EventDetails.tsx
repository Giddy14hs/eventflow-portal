import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Users, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { fetchEventDetailsById } from "@/lib/utils";

const categoryColors = {
  education: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  academic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', 
  social: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  arts: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  music: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
  theater: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
  science: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300',
  community: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300',
  leadership: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
  career: 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300',
  workshop: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
};

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchEventDetailsById(id)
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load event details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-4">{error || "Event not found."}</p>
          <Button asChild variant="ghost">
            <Link to="/">Back to Events</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      <section className="py-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Events
            </Link>
          </Button>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className={categoryColors[event.category] || "bg-gray-100 text-gray-800"}>
                  {event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : "Event"}
                </Badge>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{event.title}</h1>
              <p className="text-lg text-muted-foreground mb-6">{event.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{event.venue}</span>
                </div>
              </div>
            </div>
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Official Ticket Page</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <Button asChild className="w-full" size="lg">
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      View & Book on Ticketmaster
                    </a>
                  </Button>
                  <div className="text-muted-foreground text-sm">
                    For real-time seat availability and booking, please use the official ticket page.
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.fullDescription || event.description}
                  </p>
                </CardContent>
              </Card>
              {/* Venue Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Venue Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {event.venueDetails && event.venueDetails.name ? (
                    <>
                      <div className="font-medium text-lg mb-2">{event.venueDetails.name}</div>
                      <div className="text-muted-foreground text-sm mb-1">{event.venueDetails.address?.line1}</div>
                      <div className="text-muted-foreground text-sm mb-1">{event.venueDetails.city?.name}, {event.venueDetails.state?.name} {event.venueDetails.postalCode}</div>
                      <div className="text-muted-foreground text-sm mb-1">{event.venueDetails.country?.name}</div>
                    </>
                  ) : (
                    <div className="text-muted-foreground">Venue information not available.</div>
                  )}
                </CardContent>
              </Card>
              {/* Seat Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Seat Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">
                    {event.seatAvailability || 'Check on Ticketmaster'}
                  </div>
                  <Button asChild variant="link" className="mt-2">
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                      Check Real-Time Availability
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
            {/* Sidebar (optional: add more info here if needed) */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href={event.url} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar / Book
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Share Event
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;