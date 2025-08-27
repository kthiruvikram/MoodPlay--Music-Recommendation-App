import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Mic, MicOff, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmotionData {
  emotion: string;
  confidence: number;
  timestamp: Date;
  source: 'facial' | 'voice';
}

const emotions = [
  { name: 'happy', color: 'emotion-happy', icon: '😊' },
  { name: 'sad', color: 'emotion-sad', icon: '😢' },
  { name: 'angry', color: 'emotion-angry', icon: '😠' },
  { name: 'surprised', color: 'emotion-surprised', icon: '😲' },
  { name: 'neutral', color: 'emotion-neutral', icon: '😐' },
  { name: 'fear', color: 'emotion-fear', icon: '😨' },
  { name: 'disgust', color: 'emotion-disgust', icon: '🤢' },
  { name: 'stress', color: 'emotion-stress', icon: '😰' }
];

export default function EmotionDetector({ onEmotionDetected }: { onEmotionDetected: (data: EmotionData) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [detectionMode, setDetectionMode] = useState<'facial' | 'voice' | 'both'>('both');

  // Simulate emotion detection
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const confidence = 0.65 + Math.random() * 0.3; // 65-95% confidence
        const source = detectionMode === 'both' 
          ? (Math.random() > 0.5 ? 'facial' : 'voice')
          : detectionMode === 'facial' ? 'facial' : 'voice';

        const emotionData: EmotionData = {
          emotion: randomEmotion.name,
          confidence,
          timestamp: new Date(),
          source
        };

        setCurrentEmotion(emotionData);
        onEmotionDetected(emotionData);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isRecording, detectionMode, onEmotionDetected]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const getCurrentEmotionData = () => {
    if (!currentEmotion) return null;
    return emotions.find(e => e.name === currentEmotion.emotion);
  };

  const emotionData = getCurrentEmotionData();

  return (
    <Card className="glass p-6 space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold gradient-text">Emotion Detection</h2>
        
        {/* Detection Mode Toggle */}
        <div className="flex justify-center gap-2">
          {(['facial', 'voice', 'both'] as const).map((mode) => (
            <Button
              key={mode}
              variant={detectionMode === mode ? "emotion" : "glass"}
              size="sm"
              onClick={() => setDetectionMode(mode)}
              className="capitalize"
            >
              {mode === 'facial' && <Camera className="h-4 w-4" />}
              {mode === 'voice' && <Mic className="h-4 w-4" />}
              {mode === 'both' && (
                <>
                  <Camera className="h-4 w-4" />
                  <Mic className="h-4 w-4" />
                </>
              )}
              {mode}
            </Button>
          ))}
        </div>

        {/* Main Detection Display */}
        <div className="relative">
          <div className={cn(
            "w-32 h-32 mx-auto rounded-full border-4 flex items-center justify-center text-4xl transition-all duration-500",
            isRecording ? "border-accent animate-pulse-glow" : "border-muted",
            emotionData && `border-${emotionData.color}`
          )}>
            {emotionData ? emotionData.icon : '🎭'}
          </div>
          
          {isRecording && (
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
          )}
        </div>

        {/* Current Emotion Display */}
        {currentEmotion && (
          <div className="space-y-2 animate-fade-in-up">
            <div className="flex items-center justify-center gap-2">
              <Badge 
                variant="secondary" 
                className={cn("capitalize text-lg px-4 py-2", `bg-${emotionData?.color}/20`)}
              >
                {currentEmotion.emotion}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {(currentEmotion.confidence * 100).toFixed(1)}%
              </Badge>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              {currentEmotion.source === 'facial' ? <Camera className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              <span className="capitalize">{currentEmotion.source} Detection</span>
            </div>
          </div>
        )}

        {/* Control Button */}
        <Button
          onClick={toggleRecording}
          variant={isRecording ? "destructive" : "glow"}
          size="xl"
          className="w-full"
        >
          {isRecording ? (
            <>
              <Pause className="h-5 w-5" />
              Stop Detection
            </>
          ) : (
            <>
              <Play className="h-5 w-5" />
              Start Detection
            </>
          )}
        </Button>

        {/* Emotion Adjustment */}
        {currentEmotion && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Not quite right? Select your actual emotion:</p>
            <div className="grid grid-cols-4 gap-2">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.name}
                  variant={currentEmotion.emotion === emotion.name ? "emotion" : "glass"}
                  size="sm"
                  onClick={() => {
                    const adjustedEmotion: EmotionData = {
                      ...currentEmotion,
                      emotion: emotion.name,
                      confidence: 1.0,
                      timestamp: new Date()
                    };
                    setCurrentEmotion(adjustedEmotion);
                    onEmotionDetected(adjustedEmotion);
                  }}
                  className="flex flex-col gap-1 h-auto py-2"
                >
                  <span className="text-lg">{emotion.icon}</span>
                  <span className="text-xs capitalize">{emotion.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}