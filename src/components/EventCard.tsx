import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'sports' | 'social' | 'arts';
  capacity: number;
  registered: number;
  image?: string;
}

interface EventCardProps {
  event: Event;
}

const categoryColors = {
  academic: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  sports: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  social: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  arts: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
};

const EventCard = ({ event }: EventCardProps) => {
  const spotsLeft = event.capacity - event.registered;
  const isAlmostFull = spotsLeft <= 5 && spotsLeft > 0;
  const isFull = spotsLeft === 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className={categoryColors[event.category]}>
            {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
          </Badge>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            <span>{event.registered}/{event.capacity}</span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-muted-foreground text-sm line-clamp-2">
          {event.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4 text-primary" />
            <span>{event.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Availability Status */}
        <div className="pt-2">
          {isFull ? (
            <Badge variant="destructive" className="text-xs">
              Event Full
            </Badge>
          ) : isAlmostFull ? (
            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
              Only {spotsLeft} spots left!
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              {spotsLeft} spots available
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to={`/events/${event.id}`}>View Details</Link>
          </Button>
          <Button 
            asChild 
            size="sm" 
            className="flex-1 shadow-sm hover:shadow-md transition-shadow"
            disabled={isFull}
          >
            <Link to={`/register/${event.id}`} className={isFull ? "pointer-events-none opacity-50" : ""}>
              {isFull ? "Full" : "Register"}
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default EventCard;