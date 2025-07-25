import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Users, FileText, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

interface FormData {
  // Student Information
  studentFirstName: string;
  studentLastName: string;
  studentEmail: string;
  studentPhone: string;
  grade: string;
  studentId: string;
  
  // Parent/Guardian Information
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  emergencyContact: string;
  emergencyPhone: string;
  
  // Additional Information
  dietaryRestrictions: string;
  medicalConditions: string;
  specialRequirements: string;
  
  // Consents
  consentForm: boolean;
  mediaRelease: boolean;
  emergencyTreatment: boolean;
}

const mockEvent = {
  title: "Science Fair 2024",
  date: "March 15, 2024",
  time: "9:00 AM - 3:00 PM",
  location: "School Auditorium"
};

const Register = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    studentPhone: "",
    grade: "",
    studentId: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    emergencyContact: "",
    emergencyPhone: "",
    dietaryRestrictions: "",
    medicalConditions: "",
    specialRequirements: "",
    consentForm: false,
    mediaRelease: false,
    emergencyTreatment: false
  });

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const requiredFields = [
      'studentFirstName', 'studentLastName', 'studentEmail', 'grade', 'studentId',
      'parentFirstName', 'parentLastName', 'parentEmail', 'parentPhone'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.consentForm || !formData.emergencyTreatment) {
      toast({
        title: "Consent Required", 
        description: "Please check all required consent boxes.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "You have been registered for the event. Check your email for confirmation.",
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navbar />
      
      {/* Header */}
      <section className="py-8 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <Button asChild variant="ghost" className="mb-4">
            <Link to={id ? `/events/${id}` : "/"} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Event
            </Link>
          </Button>
          
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold text-foreground mb-4">Event Registration</h1>
            <div className="bg-card rounded-lg p-4 border">
              <h2 className="text-xl font-semibold mb-2">{mockEvent.title}</h2>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>{mockEvent.date} • {mockEvent.time}</div>
                <div>{mockEvent.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Student Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Student Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="studentFirstName">First Name *</Label>
                  <Input
                    id="studentFirstName"
                    value={formData.studentFirstName}
                    onChange={(e) => handleInputChange('studentFirstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentLastName">Last Name *</Label>
                  <Input
                    id="studentLastName"
                    value={formData.studentLastName}
                    onChange={(e) => handleInputChange('studentLastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentEmail">Student Email *</Label>
                  <Input
                    id="studentEmail"
                    type="email"
                    value={formData.studentEmail}
                    onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                    placeholder="student@school.edu"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentPhone">Student Phone</Label>
                  <Input
                    id="studentPhone"
                    type="tel"
                    value={formData.studentPhone}
                    onChange={(e) => handleInputChange('studentPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade *</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9th Grade</SelectItem>
                      <SelectItem value="10">10th Grade</SelectItem>
                      <SelectItem value="11">11th Grade</SelectItem>
                      <SelectItem value="12">12th Grade</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    placeholder="Enter student ID"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Parent/Guardian Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Parent/Guardian Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="parentFirstName">Parent First Name *</Label>
                  <Input
                    id="parentFirstName"
                    value={formData.parentFirstName}
                    onChange={(e) => handleInputChange('parentFirstName', e.target.value)}
                    placeholder="Enter parent first name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parentLastName">Parent Last Name *</Label>
                  <Input
                    id="parentLastName"
                    value={formData.parentLastName}
                    onChange={(e) => handleInputChange('parentLastName', e.target.value)}
                    placeholder="Enter parent last name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent Email *</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                    placeholder="parent@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent Phone *</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    placeholder="Emergency contact name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                  <Textarea
                    id="dietaryRestrictions"
                    value={formData.dietaryRestrictions}
                    onChange={(e) => handleInputChange('dietaryRestrictions', e.target.value)}
                    placeholder="Please list any dietary restrictions or food allergies"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="medicalConditions">Medical Conditions</Label>
                  <Textarea
                    id="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    placeholder="Please list any medical conditions we should be aware of"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialRequirements">Special Requirements</Label>
                  <Textarea
                    id="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                    placeholder="Any special accommodations or requirements"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Consent and Permissions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Consent and Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="consentForm"
                    checked={formData.consentForm}
                    onCheckedChange={(checked) => handleInputChange('consentForm', checked as boolean)}
                  />
                  <Label htmlFor="consentForm" className="text-sm leading-relaxed">
                    I give permission for my child to participate in this event and acknowledge that I have read and understand all event requirements and safety guidelines. *
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="emergencyTreatment"
                    checked={formData.emergencyTreatment}
                    onCheckedChange={(checked) => handleInputChange('emergencyTreatment', checked as boolean)}
                  />
                  <Label htmlFor="emergencyTreatment" className="text-sm leading-relaxed">
                    I authorize school officials to seek emergency medical treatment for my child if necessary. *
                  </Label>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="mediaRelease"
                    checked={formData.mediaRelease}
                    onCheckedChange={(checked) => handleInputChange('mediaRelease', checked as boolean)}
                  />
                  <Label htmlFor="mediaRelease" className="text-sm leading-relaxed">
                    I give permission for photos/videos of my child to be taken during the event for school promotional purposes.
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button variant="outline" asChild>
                <Link to={id ? `/events/${id}` : "/"}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="px-8">
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Register;