import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Music, BarChart3, Settings, Headphones, Zap, MessageSquare } from "lucide-react";
import EmotionDetector from "./EmotionDetector";
import MusicRecommendations from "./MusicRecommendations";
import DataVisualization from "./DataVisualization";
import UserFeedback from "./UserFeedback";
import StressGraph from "./StressGraph";

interface EmotionData {
  emotion: string;
  confidence: number;
  timestamp: Date;
  source: 'facial' | 'voice';
}

export default function MoodPlayDashboard() {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [sessionStats, setSessionStats] = useState({
    detectionsToday: 47,
    accuracyScore: 95.4,
    songsRecommended: 89,
    userSatisfaction: 76,
    stressReliefSessions: 12,
    therapyMinutes: 85
  });

  const handleEmotionDetected = (emotionData: EmotionData) => {
    setCurrentEmotion(emotionData);
    setSessionStats(prev => ({
      ...prev,
      detectionsToday: prev.detectionsToday + 1
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 border-b border-border">
        <div className="relative container mx-auto px-6 py-12">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-[35px] font-bold tracking-tight text-primary">
                MoodPlay
              </h1>
              <p className="text-[35px] text-muted-foreground max-w-2xl mx-auto">
                Intelligent emotion-based music personalization platform powered by AI
              </p>
              
              <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-[35px]">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Real-time Detection</span>
                </div>
                <div className="flex items-center gap-2 text-[35px]">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Multi-modal AI</span>
                </div>
                <div className="flex items-center gap-2 text-[35px]">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Spotify Integration</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 pt-8">
              {[
                { label: 'Detections Today', value: sessionStats.detectionsToday, icon: Brain, color: 'primary' },
                { label: 'Accuracy Score', value: `${sessionStats.accuracyScore}%`, icon: Zap, color: 'accent' },
                { label: 'Songs Recommended', value: sessionStats.songsRecommended, icon: Music, color: 'secondary' },
                { label: 'User Feedback', value: sessionStats.userSatisfaction, icon: MessageSquare, color: 'accent-pink' },
                { label: 'Stress Relief Sessions', value: sessionStats.stressReliefSessions, icon: Headphones, color: 'success' },
                { label: 'Therapy Minutes', value: sessionStats.therapyMinutes, icon: Zap, color: 'warning' }
              ].map((stat, index) => (
                <Card key={index} className="glass p-4 hover:scale-105 transition-transform">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-${stat.color}/20 flex items-center justify-center`}>
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="detection" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="glass">
              <TabsTrigger value="detection" className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span className="text-primary-dark font-bold">Emotion Detection</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex items-center gap-2">
                <Music className="h-4 w-4" />
                <span className="text-primary-dark font-bold">Music Recommendations</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="feedback" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Feedback
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {currentEmotion && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  Current: {currentEmotion.emotion}
                </Badge>
                <Badge variant="outline">
                  {(currentEmotion.confidence * 100).toFixed(0)}% confident
                </Badge>
              </div>
            )}
          </div>

          <TabsContent value="detection" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <EmotionDetector onEmotionDetected={handleEmotionDetected} />
                <StressGraph />
              </div>
              
              <div className="space-y-6">
                {/* Recent Emotions */}
                <Card className="glass p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Emotions</h3>
                  <div className="space-y-3">
                    {currentEmotion && (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-surface">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-accent" />
                          <span className="capitalize font-medium">{currentEmotion.emotion}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {currentEmotion.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    )}
                    
                    {/* Mock previous emotions */}
                    {['neutral', 'happy', 'surprised'].map((emotion, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-surface/50 opacity-60">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-muted" />
                          <span className="capitalize">{emotion}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(Date.now() - (index + 1) * 300000).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* System Status */}
                <Card className="glass p-6">
                  <h3 className="text-lg font-semibold mb-4">System Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Facial Recognition</span>
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Voice Analysis</span>
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Online
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Spotify Integration</span>
                      <Badge variant="secondary" className="bg-success/20 text-success">
                        Connected
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">API Response Time</span>
                      <Badge variant="outline">
                        45ms
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-6">
            {currentEmotion ? (
              <MusicRecommendations 
                emotion={currentEmotion.emotion} 
                confidence={currentEmotion.confidence}
              />
            ) : (
              <Card className="glass p-12 text-center">
                <Music className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No Emotion Detected</h3>
                <p className="text-muted-foreground mb-6">
                  Start emotion detection to get personalized music recommendations
                </p>
                <Button variant="glow" onClick={() => {
                  // Switch to detection tab
                  const detectTab = document.querySelector('[value="detection"]') as HTMLElement;
                  detectTab?.click();
                }}>
                  Start Detection
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <DataVisualization />
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <UserFeedback />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass p-6">
                <h3 className="text-lg font-semibold mb-4">Detection Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Facial Recognition</p>
                      <p className="text-sm text-muted-foreground">Enable camera-based emotion detection</p>
                    </div>
                    <Button variant="glass" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Voice Analysis</p>
                      <p className="text-sm text-muted-foreground">Enable microphone-based emotion detection</p>
                    </div>
                    <Button variant="glass" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Real-time Processing</p>
                      <p className="text-sm text-muted-foreground">Process emotions in real-time</p>
                    </div>
                    <Button variant="glass" size="sm">Configure</Button>
                  </div>
                </div>
              </Card>

              <Card className="glass p-6">
                <h3 className="text-lg font-semibold mb-4">Music Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Spotify Integration</p>
                      <p className="text-sm text-muted-foreground">Connect your Spotify account</p>
                    </div>
                    <Button variant="emotion" size="sm">Connect</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Recommendation Engine</p>
                      <p className="text-sm text-muted-foreground">AI-powered music suggestions</p>
                    </div>
                    <Button variant="glass" size="sm">Optimize</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Genre Preferences</p>
                      <p className="text-sm text-muted-foreground">Customize music genres</p>
                    </div>
                    <Button variant="glass" size="sm">Edit</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}