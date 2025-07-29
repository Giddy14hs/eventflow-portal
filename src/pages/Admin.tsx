import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Calendar, 
  Users, 
  TrendingUp, 
  FileText, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Search,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Mock data
const mockEvents = [
  {
    id: "1",
    title: "Science Fair 2024",
    category: "academic",
    date: "March 15, 2024",
    capacity: 200,
    registered: 145,
    status: "active"
  },
  {
    id: "2",
    title: "Basketball Championship", 
    category: "sports",
    date: "March 20, 2024",
    capacity: 300,
    registered: 280,
    status: "active"
  },
  {
    id: "3",
    title: "Spring Dance",
    category: "social", 
    date: "April 5, 2024",
    capacity: 150,
    registered: 89,
    status: "active"
  }
];

const mockRegistrations = [
  {
    id: "1",
    studentName: "John Smith",
    event: "Science Fair 2024",
    registrationDate: "Feb 15, 2024",
    status: "confirmed",
    grade: "11th"
  },
  {
    id: "2", 
    studentName: "Sarah Johnson",
    event: "Basketball Championship",
    registrationDate: "Feb 18, 2024", 
    status: "confirmed",
    grade: "10th"
  },
  {
    id: "3",
    studentName: "Mike Wilson",
    event: "Spring Dance",
    registrationDate: "Feb 20, 2024",
    status: "pending",
    grade: "12th"
  }
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const totalEvents = mockEvents.length;
  const totalRegistrations = mockEvents.reduce((sum, event) => sum + event.registered, 0);
  const totalCapacity = mockEvents.reduce((sum, event) => sum + event.capacity, 0);
  const utilizationRate = Math.round((totalRegistrations / totalCapacity) * 100);

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

  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Admin Portal</h1>
              <p className="text-lg text-muted-foreground">
                Manage events, registrations, and view analytics
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Event
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                        <p className="text-3xl font-bold text-primary">{totalEvents}</p>
                      </div>
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Registrations</p>
                        <p className="text-3xl font-bold text-primary">{totalRegistrations}</p>
                      </div>
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Utilization Rate</p>
                        <p className="text-3xl font-bold text-primary">{utilizationRate}%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Capacity</p>
                        <p className="text-3xl font-bold text-primary">{totalCapacity}</p>
                      </div>
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEvents.slice(0, 3).map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                          <Badge variant="secondary" className={categoryColors[event.category as keyof typeof categoryColors]}>
                            {event.category}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRegistrations.slice(0, 3).map((registration) => (
                        <div key={registration.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div>
                            <h4 className="font-medium">{registration.studentName}</h4>
                            <p className="text-sm text-muted-foreground">{registration.event}</p>
                          </div>
                          <Badge variant="secondary" className={statusColors[registration.status as keyof typeof statusColors]}>
                            {registration.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Event Management</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Event
                  </Button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
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

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Registrations</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell className="font-medium">{event.title}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={categoryColors[event.category as keyof typeof categoryColors]}>
                            {event.category}
                          </Badge>
                        </TableCell>
                        <TableCell>{event.date}</TableCell>
                        <TableCell>{event.registered}/{event.capacity}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={statusColors[event.status as keyof typeof statusColors]}>
                            {event.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Registrations Tab */}
            <TabsContent value="registrations" className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Registration Management</h2>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export Registrations
                </Button>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRegistrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">{registration.studentName}</TableCell>
                        <TableCell>{registration.event}</TableCell>
                        <TableCell>{registration.grade}</TableCell>
                        <TableCell>{registration.registrationDate}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className={statusColors[registration.status as keyof typeof statusColors]}>
                            {registration.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="mt-8">
              <h2 className="text-2xl font-semibold mb-6">Analytics & Reports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">87%</div>
                    <div className="text-sm text-muted-foreground">Average Fill Rate</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">2.3</div>
                    <div className="text-sm text-muted-foreground">Avg Events per Student</div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Attendance Rate</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Categories Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          Academic
                        </span>
                        <span className="font-medium">35%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          Sports
                        </span>
                        <span className="font-medium">28%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          Social
                        </span>
                        <span className="font-medium">22%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          Arts
                        </span>
                        <span className="font-medium">15%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Registration Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Chart placeholder - Integration with charting library needed
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Admin;