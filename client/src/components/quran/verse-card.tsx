import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import type { Verse } from "@shared/schema";
import { useState, useRef, useEffect } from "react";

interface VerseCardProps {
  verse: Verse;
  onPlaybackComplete?: () => void;
  autoPlay?: boolean;
}

export default function VerseCard({ verse, onPlaybackComplete, autoPlay }: VerseCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay) {
      handleAudioToggle();
    }

    return () => {
      // Cleanup on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnd);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [autoPlay]);

  const handleAudioEnd = () => {
    setIsPlaying(false);
    if (onPlaybackComplete) {
      // Wait 30 seconds before playing the next verse
      timeoutRef.current = setTimeout(() => {
        onPlaybackComplete();
      }, 2000);
    }
  };

  const handleAudioToggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(verse.audio);
      audioRef.current.addEventListener('ended', handleAudioEnd);
    }

    if (isPlaying) {
      audioRef.current.pause();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-roboto">
              Surah {verse.surah}:{verse.ayah}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAudioToggle}
              title={isPlaying ? "Pause Audio" : "Play Audio"}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>

          <p className="text-2xl text-right font-['Amiri'] leading-loose">
            {verse.arab}
          </p>

          <p className="text-sm text-muted-foreground italic font-roboto">
            {verse.latin}
          </p>

          <p className="text-base font-roboto">
            {verse.text}
          </p>

          {verse.notes && (
            <p className="text-sm text-muted-foreground mt-2 border-t pt-2 font-roboto">
              {verse.notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}