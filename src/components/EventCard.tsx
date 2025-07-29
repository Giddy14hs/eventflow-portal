import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'academic' | 'sports' | 'social' | 'arts' | 'music' | 'theater' | 'science' | 'community' | 'leadership' | 'career' | 'workshop';
  image?: string;
}

interface EventCardProps {
  event: Event;
}

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

const EventCard = ({ event, onRegister }: EventCardProps & { onRegister?: (event: Event) => void }) => {
  // Format category name for display
  const formatCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'arts': 'Arts & Culture',
      'science': 'Science & Tech',
      'community': 'Community Service',
      'career': 'Career Development',
    };
    return categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  const { isAuthenticated } = useAuth();
  const [registering, setRegistering] = useState(false);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="secondary" className={categoryColors[event.category] || "bg-gray-100 text-gray-800"}>
            {formatCategoryName(event.category)}
          </Badge>
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
      </CardContent>

      <CardFooter className="pt-0 flex flex-col gap-2">
        <Button asChild className="w-full shadow-sm hover:shadow-md transition-shadow">
          <Link to={`/events/${event.id}`}>View Details</Link>
        </Button>
        {isAuthenticated && onRegister && (
          <Button
            className="w-full"
            variant="secondary"
            disabled={registering}
            onClick={async () => {
              setRegistering(true);
              await onRegister(event);
              setRegistering(false);
            }}
          >
            {registering ? "Registering..." : "Register"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;