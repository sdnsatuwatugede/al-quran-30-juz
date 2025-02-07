import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { Verse } from "@shared/schema";

interface VerseCardProps {
  verse: Verse;
}

export default function VerseCard({ verse }: VerseCardProps) {
  const handlePlayAudio = () => {
    const audio = new Audio(verse.audio);
    audio.play();
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Surah {verse.surah}:{verse.ayah}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayAudio}
              title="Play Audio"
            >
              <Play className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-2xl text-right font-['Amiri'] leading-loose">
            {verse.arab}
          </p>

          <p className="text-sm text-muted-foreground italic">
            {verse.latin}
          </p>

          <p className="text-base">
            {verse.text}
          </p>

          {verse.notes && (
            <p className="text-sm text-muted-foreground mt-2 border-t pt-2">
              {verse.notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}