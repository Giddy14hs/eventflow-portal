import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Download, Mail, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Mock registered events data
const mockRegisteredEvents = [
  {
    id: "1",
    title: "Science Fair 2024", 
    description: "Annual science fair showcasing student innovations",
    date: "March 15, 2024",
    time: "9:00 AM - 3:00 PM",
    location: "School Auditorium",
    category: "academic",
    status: "confirmed",
    registrationDate: "February 15, 2024",
    confirmationCode: "SF2024-001"
  },
  {
    id: "3",
    title: "Spring Dance",
    description: "Annual spring formal dance event", 
    date: "April 5, 2024",
    time: "7:00 PM - 11:00 PM",
    location: "School Cafeteria",
    category: "social", 
    status: "confirmed",
    registrationDate: "February 20, 2024",
    confirmationCode: "SD2024-003"
  }
];

const mockPastEvents = [
  {
    id: "past1",
    title: "Winter Concert",
    description: "Annual winter music concert",
    date: "December 15, 2023", 
    time: "7:00 PM - 9:00 PM",
    location: "School Auditorium",
    category: "arts",
    status: "attended",
    registrationDate: "November 20, 2023",
    confirmationCode: "WC2023-015"
  }
];

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  social: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', 
  arts: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const statusColors = {
  confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  attended: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
};

const EventCard = ({ event, isPast = false }: { event: any, isPast?: boolean }) => (
  <Card className="hover:shadow-lg transition-all duration-300">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <Badge variant="secondary" className={categoryColors[event.category as keyof typeof categoryColors]}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
          <Badge variant="secondary" className={statusColors[event.status as keyof typeof statusColors]}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </Badge>
        </div>
      </div>
      <CardTitle className="text-xl">{event.title}</CardTitle>
      <p className="text-muted-foreground text-sm">{event.description}</p>
    </CardHeader>
    
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span>{event.location}</span>
        </div>
      </div>
      
      <div className="pt-2 border-t">
        <div className="text-xs text-muted-foreground mb-2">
          Registered: {event.registrationDate}
        </div>
        <div className="text-xs font-mono bg-muted px-2 py-1 rounded">
          Confirmation: {event.confirmationCode}
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        {!isPast && (
          <Button asChild variant="outline" size="sm">
            <Link to={`/events/${event.id}`}>View Details</Link>
          </Button>
        )}
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          Ticket
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <QrCode className="w-3 h-3" />
          QR Code
        </Button>
      </div>
    </CardContent>
  </Card>
);

const MyEvents = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Header */}
      <section className="py-12 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">My Events</h1>
            <p className="text-lg text-muted-foreground">
              Manage your event registrations and view your participation history
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Export All
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    Email Reminders
                  </Button>
                </div>
              </div>
              
              {mockRegisteredEvents.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't registered for any upcoming events yet.
                    </p>
                    <Button asChild>
                      <Link to="/">Browse Events</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockRegisteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-8">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Past Events</h2>
                <p className="text-muted-foreground">Events you have previously attended</p>
              </div>
              
              {mockPastEvents.length === 0 ? (
                <Card className="text-center py-12">
                  <CardContent>
                    <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Past Events</h3>
                    <p className="text-muted-foreground">
                      Your event participation history will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockPastEvents.map((event) => (
                    <EventCard key={event.id} event={event} isPast />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockRegisteredEvents.length}
                </div>
                <div className="text-sm text-muted-foreground">Upcoming Events</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockPastEvents.length}
                </div>
                <div className="text-sm text-muted-foreground">Events Attended</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {mockRegisteredEvents.length + mockPastEvents.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Registrations</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyEvents;