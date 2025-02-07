import { Card, CardContent } from "@/components/ui/card";
import type { Verse } from "@shared/schema";

interface VerseCardProps {
  verse: Verse;
}

export default function VerseCard({ verse }: VerseCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {verse.surah}:{verse.nomor}
            </span>
          </div>
          
          <p className="text-2xl text-right font-['Amiri'] leading-loose">
            {verse.ar}
          </p>
          
          <p className="text-sm text-muted-foreground">
            {verse.tr}
          </p>
          
          <p className="text-base">
            {verse.idn}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
