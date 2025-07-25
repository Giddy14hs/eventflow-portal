import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, MapPin, Users, ArrowLeft, User, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";

// Mock event data (in real app, this would come from API)
const mockEvent = {
  id: "1",
  title: "Science Fair 2024",
  description: "Annual science fair showcasing student innovations and research projects. Students will present their work to judges and visitors. This is a fantastic opportunity for students to demonstrate their scientific knowledge and creativity.",
  longDescription: "The Science Fair 2024 is our school's premier academic event, bringing together the brightest minds to showcase innovative projects across various scientific disciplines. Students have been working for months on their research projects, covering topics from renewable energy solutions to artificial intelligence applications. The event will feature interactive demonstrations, poster presentations, and live experiments. Judges will include local scientists, university professors, and industry professionals who will evaluate projects based on scientific method, innovation, and presentation quality.",
  date: "March 15, 2024",
  time: "9:00 AM - 3:00 PM",
  location: "School Auditorium",
  category: "academic" as const,
  capacity: 200,
  registered: 145,
  requirements: [
    "Students must submit project proposal by March 1st",
    "All materials must be provided by participants", 
    "Projects must follow school safety guidelines",
    "Parental consent form required for all participants"
  ],
  coordinator: {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
    phone: "(555) 123-4567"
  },
  schedule: [
    { time: "9:00 AM", activity: "Registration and Setup" },
    { time: "10:00 AM", activity: "Judging Begins - Category A" },
    { time: "11:30 AM", activity: "Judging Begins - Category B" },
    { time: "12:30 PM", activity: "Lunch Break" },
    { time: "1:30 PM", activity: "Public Viewing Opens" },
    { time: "2:30 PM", activity: "Awards Ceremony" },
    { time: "3:00 PM", activity: "Event Concludes" }
  ]
};

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', 
  social: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  arts: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvent; // In real app: fetch event by id
  
  const spotsLeft = event.capacity - event.registered;
  const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;
  const isFull = spotsLeft === 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Header */}
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
                <Badge variant="secondary" className={categoryColors[event.category]}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </Badge>
                {isFull ? (
                  <Badge variant="destructive">Event Full</Badge>
                ) : isAlmostFull ? (
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                    Only {spotsLeft} spots left!
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    {spotsLeft} spots available
                  </Badge>
                )}
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
                  <span className="text-foreground">{event.location}</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Registration Status</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold">{event.registered}/{event.capacity}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all" 
                      style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                    />
                  </div>
                  <Button 
                    asChild 
                    className="w-full" 
                    size="lg"
                    disabled={isFull}
                  >
                    <Link to={`/register/${event.id}`} className={isFull ? "pointer-events-none opacity-50" : ""}>
                      {isFull ? "Event Full" : "Register Now"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
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
                    {event.longDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="min-w-20 text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          {item.time}
                        </div>
                        <div className="text-muted-foreground">{item.activity}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {event.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Coordinator */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Coordinator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{event.coordinator.name}</div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${event.coordinator.email}`} className="text-primary hover:underline">
                        {event.coordinator.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${event.coordinator.phone}`} className="text-primary hover:underline">
                        {event.coordinator.phone}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
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