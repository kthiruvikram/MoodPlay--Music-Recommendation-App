import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, BarChart3, PieChart as PieChartIcon, Activity } from "lucide-react";

// Sample data for visualizations
const emotionAccuracy = [
  { emotion: 'Happy', facial: 92, voice: 88, combined: 95 },
  { emotion: 'Sad', facial: 89, voice: 91, combined: 94 },
  { emotion: 'Angry', facial: 85, voice: 87, combined: 90 },
  { emotion: 'Surprised', facial: 88, voice: 83, combined: 91 },
  { emotion: 'Neutral', facial: 94, voice: 89, combined: 96 },
  { emotion: 'Fear', facial: 82, voice: 85, combined: 88 },
  { emotion: 'Disgust', facial: 79, voice: 81, combined: 84 },
  { emotion: 'Stress', facial: 87, voice: 90, combined: 93 }
];

const emotionGenreHeatmap = [
  { emotion: 'Happy', pop: 45, rock: 25, jazz: 15, classical: 10, electronic: 35 },
  { emotion: 'Sad', pop: 20, rock: 30, jazz: 40, classical: 50, electronic: 15 },
  { emotion: 'Angry', pop: 25, rock: 55, jazz: 10, classical: 5, electronic: 40 },
  { emotion: 'Neutral', pop: 30, rock: 25, jazz: 35, classical: 45, electronic: 25 }
];

const userSatisfaction = [
  { category: 'Music Relevance', score: 4.2 },
  { category: 'Emotion Accuracy', score: 4.0 },
  { category: 'Interface', score: 4.5 },
  { category: 'Response Time', score: 4.3 },
  { category: 'Stress Relief', score: 4.4 },
  { category: 'Overall Experience', score: 4.1 }
];

const confusionMatrix = [
  { predicted: 'Happy', happy: 85, sad: 2, angry: 1, surprised: 8, neutral: 3, fear: 1, disgust: 0, stress: 0 },
  { predicted: 'Sad', happy: 3, sad: 82, angry: 2, surprised: 1, neutral: 8, fear: 3, disgust: 1, stress: 0 },
  { predicted: 'Angry', happy: 2, sad: 5, angry: 78, surprised: 3, neutral: 7, fear: 4, disgust: 1, stress: 0 },
  { predicted: 'Surprised', happy: 12, sad: 2, angry: 3, surprised: 75, neutral: 6, fear: 2, disgust: 0, stress: 0 },
  { predicted: 'Neutral', happy: 5, sad: 8, angry: 4, surprised: 2, neutral: 79, fear: 1, disgust: 1, stress: 0 },
  { predicted: 'Fear', happy: 1, sad: 6, angry: 8, surprised: 3, neutral: 4, fear: 76, disgust: 2, stress: 0 },
  { predicted: 'Disgust', happy: 0, sad: 3, angry: 5, surprised: 1, neutral: 2, fear: 4, disgust: 85, stress: 0 },
  { predicted: 'Stress', happy: 2, sad: 8, angry: 12, surprised: 1, neutral: 5, fear: 6, disgust: 1, stress: 65 }
];

const engagementData = [
  { time: '00:00', sessions: 45, interactions: 120, stressReduction: 15 },
  { time: '04:00', sessions: 23, interactions: 65, stressReduction: 8 },
  { time: '08:00', sessions: 89, interactions: 245, stressReduction: 42 },
  { time: '12:00', sessions: 156, interactions: 420, stressReduction: 78 },
  { time: '16:00', sessions: 134, interactions: 380, stressReduction: 65 },
  { time: '20:00', sessions: 98, interactions: 290, stressReduction: 45 },
];

const emotionDistribution = [
  { name: 'Happy', value: 25, color: 'hsl(var(--emotion-happy))' },
  { name: 'Neutral', value: 22, color: 'hsl(var(--emotion-neutral))' },
  { name: 'Sad', value: 16, color: 'hsl(var(--emotion-sad))' },
  { name: 'Stress', value: 14, color: 'hsl(var(--destructive))' },
  { name: 'Surprised', value: 10, color: 'hsl(var(--emotion-surprised))' },
  { name: 'Angry', value: 8, color: 'hsl(var(--emotion-angry))' },
  { name: 'Fear', value: 3, color: 'hsl(var(--emotion-fear))' },
  { name: 'Disgust', value: 2, color: 'hsl(var(--emotion-disgust))' }
];

export default function DataVisualization() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary">MoodPlay Analytics</h2>
        <p className="text-muted-foreground">Real-time insights into emotion detection and music recommendation performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { label: 'Overall Accuracy', value: '92.3%', change: '+2.1%', color: 'success' },
          { label: 'User Satisfaction', value: '4.2/5', change: '+0.3', color: 'primary' },
          { label: 'Stress Reduction', value: '65%', change: '+8%', color: 'destructive' },
          { label: 'Active Sessions', value: '1,247', change: '+156', color: 'accent' },
          { label: 'Music Matches', value: '8.9k', change: '+1.2k', color: 'secondary' }
        ].map((metric, index) => (
          <Card key={index} className="glass p-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-2xl font-bold">{metric.value}</p>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                {metric.change}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotion Detection Accuracy */}
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Emotion Detection Accuracy</h3>
              <Badge variant="outline">Multi-modal</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={emotionAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="emotion" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Bar dataKey="facial" fill="hsl(var(--primary))" name="Facial" />
                <Bar dataKey="voice" fill="hsl(var(--accent))" name="Voice" />
                <Bar dataKey="combined" fill="hsl(var(--primary-glow))" name="Combined" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* User Satisfaction */}
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Satisfaction Metrics</h3>
              <Badge variant="outline">4.2/5 Avg</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={userSatisfaction}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="category" className="text-xs" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <PolarRadiusAxis domain={[0, 5]} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                <Radar 
                  name="Score" 
                  dataKey="score" 
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))" 
                  fillOpacity={0.3} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Emotion Distribution */}
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Emotion Distribution</h3>
              <Badge variant="outline">Last 24h</Badge>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emotionDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {emotionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Engagement Over Time */}
        <Card className="glass p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">User Engagement</h3>
              <div className="flex gap-2">
                <Button variant="glass" size="sm">
                  <Activity className="h-4 w-4" />
                  Real-time
                </Button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Sessions"
                />
                <Line 
                  type="monotone" 
                  dataKey="interactions" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Interactions"
                />
                <Line 
                  type="monotone" 
                  dataKey="stressReduction" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Stress Reduction Events"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Confusion Matrix */}
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Emotion Classification Confusion Matrix</h3>
            <Badge variant="outline">Accuracy: 81.2%</Badge>
          </div>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-9 gap-1 text-xs">
              <div className="p-2 font-semibold">Predicted →</div>
              {['Happy', 'Sad', 'Angry', 'Surprised', 'Neutral', 'Fear', 'Disgust', 'Stress'].map(emotion => (
                <div key={emotion} className="p-2 text-center font-semibold text-muted-foreground">
                  {emotion}
                </div>
              ))}
              
              {confusionMatrix.map((row, i) => (
                <>
                  <div key={`label-${i}`} className="p-2 font-semibold text-muted-foreground">
                    {row.predicted}
                  </div>
                  {Object.entries(row).slice(1).map(([emotion, value], j) => (
                    <div 
                      key={`${i}-${j}`}
                      className={`p-2 text-center rounded ${
                        i === j ? 'bg-success/20 text-success font-bold' : 
                        Number(value) > 5 ? 'bg-warning/20 text-warning' : 
                        'bg-muted/20 text-muted-foreground'
                      }`}
                    >
                      {value}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}