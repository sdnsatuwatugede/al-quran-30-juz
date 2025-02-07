import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface JuzSelectorProps {
  currentJuz: number;
}

export default function JuzSelector({ currentJuz }: JuzSelectorProps) {
  const prevJuz = currentJuz > 1 ? currentJuz - 1 : null;
  const nextJuz = currentJuz < 30 ? currentJuz + 1 : null;

  return (
    <div className="flex justify-between items-center">
      {prevJuz ? (
        <Link href={`/juz/${prevJuz}`}>
          <Button variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Juz {prevJuz}
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {nextJuz ? (
        <Link href={`/juz/${nextJuz}`}>
          <Button variant="outline">
            Juz {nextJuz}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
