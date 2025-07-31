import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, SkipForward, Heart, ExternalLink, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  emotion_match: number;
  genre: string;
  preview_url?: string;
  spotify_url: string;
  cover_url: string;
}

interface MusicRecommendationsProps {
  emotion: string;
  confidence: number;
}

// Simulated music data based on emotions
const musicDatabase: Record<string, Track[]> = {
  happy: [
    {
      id: "1",
      title: "Good as Hell",
      artist: "Lizzo",
      album: "Cuz I Love You",
      duration: 219,
      emotion_match: 0.95,
      genre: "Pop",
      spotify_url: "https://open.spotify.com/track/1WkMMavIMc4JZ8cfMmxHkI",
      cover_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300"
    },
    {
      id: "2", 
      title: "Happy",
      artist: "Pharrell Williams",
      album: "G I R L",
      duration: 232,
      emotion_match: 0.92,
      genre: "Pop",
      spotify_url: "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH",
      cover_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300"
    }
  ],
  sad: [
    {
      id: "3",
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      duration: 285,
      emotion_match: 0.89,
      genre: "Soul",
      spotify_url: "https://open.spotify.com/track/1zwMYTA5nlNjZxYrvBB2pV",
      cover_url: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300"
    },
    {
      id: "4",
      title: "Mad World",
      artist: "Gary Jules",
      album: "Trading Snakeoil for Wolftickets",
      duration: 186,
      emotion_match: 0.94,
      genre: "Alternative",
      spotify_url: "https://open.spotify.com/track/3JOVT2M8YK9GQkY2Cm0kDB",
      cover_url: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300"
    }
  ],
  // Add more emotions...
  neutral: [
    {
      id: "5",
      title: "Weightless",
      artist: "Marconi Union",
      album: "Weightless",
      duration: 513,
      emotion_match: 0.88,
      genre: "Ambient",
      spotify_url: "https://open.spotify.com/track/2WfaOiMkCvy7F5fcp2zZ8L",
      cover_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300"
    }
  ]
};

export default function MusicRecommendations({ emotion, confidence }: MusicRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [likedTracks, setLikedTracks] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const tracks = musicDatabase[emotion] || musicDatabase.neutral;
      setRecommendations(tracks);
      setIsLoading(false);
    };

    if (emotion) {
      loadRecommendations();
    }
  }, [emotion]);

  const togglePlay = (trackId: string) => {
    setCurrentlyPlaying(currentlyPlaying === trackId ? null : trackId);
  };

  const toggleLike = (trackId: string) => {
    const newLiked = new Set(likedTracks);
    if (newLiked.has(trackId)) {
      newLiked.delete(trackId);
    } else {
      newLiked.add(trackId);
    }
    setLikedTracks(newLiked);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmotionColor = () => {
    const colors: Record<string, string> = {
      happy: 'emotion-happy',
      sad: 'emotion-sad',
      angry: 'emotion-angry',
      neutral: 'emotion-neutral',
      surprised: 'emotion-surprised',
      fear: 'emotion-fear',
      disgust: 'emotion-disgust'
    };
    return colors[emotion] || 'emotion-neutral';
  };

  if (isLoading) {
    return (
      <Card className="glass p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Music className="h-6 w-6 animate-pulse" />
            <h2 className="text-2xl font-bold">Finding Your Music...</h2>
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-surface animate-pulse">
                <div className="w-16 h-16 bg-muted rounded-lg" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold gradient-text">Music for Your Mood</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={cn("capitalize", `bg-${getEmotionColor()}/20`)}>
              {emotion}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {(confidence * 100).toFixed(0)}% confidence
            </span>
          </div>
        </div>
        <Button variant="glass" size="sm">
          <SkipForward className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {recommendations.map((track, index) => (
          <div
            key={track.id}
            className={cn(
              "group p-4 rounded-lg border transition-all duration-300 hover:bg-surface-elevated",
              currentlyPlaying === track.id ? "bg-primary/10 border-primary/30" : "bg-surface border-border"
            )}
          >
            <div className="flex items-center gap-4">
              {/* Album Cover */}
              <div className="relative">
                <img
                  src={track.cover_url}
                  alt={`${track.album} cover`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <Button
                  variant="glass"
                  size="icon"
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => togglePlay(track.id)}
                >
                  {currentlyPlaying === track.id ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4" />
                  }
                </Button>
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
                <p className="text-muted-foreground truncate">{track.artist}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">{track.genre}</Badge>
                  <span className="text-xs text-muted-foreground">{formatDuration(track.duration)}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-xs text-muted-foreground">
                      {(track.emotion_match * 100).toFixed(0)}% match
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLike(track.id)}
                  className={cn(
                    "transition-colors",
                    likedTracks.has(track.id) ? "text-red-500 hover:text-red-600" : "text-muted-foreground"
                  )}
                >
                  <Heart className={cn("h-4 w-4", likedTracks.has(track.id) && "fill-current")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-muted-foreground hover:text-foreground"
                >
                  <a href={track.spotify_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Progress Bar for Currently Playing */}
            {currentlyPlaying === track.id && (
              <div className="mt-3 space-y-2">
                <Progress value={45} className="h-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1:23</span>
                  <span>{formatDuration(track.duration)}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No recommendations available for this emotion yet.</p>
        </div>
      )}
    </Card>
  );
}