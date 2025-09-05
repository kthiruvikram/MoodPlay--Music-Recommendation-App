import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Star, Send, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function UserFeedback() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your feedback. We'll review it and get back to you soon.",
    });
    
    // Reset form
    setFeedback("");
    setRating(0);
    setEmail("");
    setCategory("general");
    setIsSubmitting(false);
  };

  const categories = [
    { id: "general", label: "General Feedback", icon: MessageSquare },
    { id: "emotion-detection", label: "Emotion Detection", icon: ThumbsUp },
    { id: "music-recommendations", label: "Music Recommendations", icon: ThumbsDown },
    { id: "ui-ux", label: "User Interface", icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Form */}
        <div className="lg:col-span-2">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Share Your Feedback
              </CardTitle>
              <CardDescription>
                Help us improve MoodPlay by sharing your experience and suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div className="space-y-2">
                  <Label>Overall Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`p-1 transition-colors ${
                          star <= rating 
                            ? "text-accent-yellow" 
                            : "text-muted-foreground hover:text-accent-yellow"
                        }`}
                      >
                        <Star 
                          className="h-6 w-6" 
                          fill={star <= rating ? "currentColor" : "none"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <Label>Feedback Category</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          category === cat.id
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <cat.icon className="h-4 w-4" />
                          <span className="text-sm font-medium">{cat.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll only use this to follow up on your feedback
                  </p>
                </div>

                {/* Feedback Text */}
                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us about your experience with MoodPlay. What did you like? What could be improved?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="min-h-[120px] resize-none"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {feedback.length}/500 characters
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={!feedback.trim() || isSubmitting}
                  className="w-full"
                  variant="glow"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Feedback Stats & Recent */}
        <div className="space-y-6">
          {/* Feedback Stats */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Feedback Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Submissions</span>
                <Badge variant="secondary">40</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Rating</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent-yellow fill-current" />
                  <span className="text-sm font-medium">4.6</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Rate</span>
                <Badge variant="outline">94%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Response Time</span>
                <Badge variant="outline">2.3 days</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <ThumbsUp className="h-4 w-4 mr-2" />
                Report a Bug
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Request Feature
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg">Recent Community Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { rating: 5, text: "Amazing emotion detection accuracy!", time: "2 hours ago" },
                { rating: 4, text: "Love the Spotify integration", time: "5 hours ago" },
                { rating: 5, text: "UI is beautiful and intuitive", time: "1 day ago" },
              ].map((item, index) => (
                <div key={index} className="p-3 rounded-lg bg-surface/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < item.rating ? "text-accent-yellow fill-current" : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}