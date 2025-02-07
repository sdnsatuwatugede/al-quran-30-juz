import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { juzSchema } from "@shared/schema";
import JuzSelector from "@/components/quran/juz-selector";
import VerseCard from "@/components/quran/verse-card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Juz() {
  const { id } = useParams();
  const juzId = parseInt(id || "1");

  const { data: juz, isLoading } = useQuery({
    queryKey: [`https://api.myquran.com/v2/quran/ayat/juz/${juzId}`],
    queryFn: async ({ queryKey }) => {
      const res = await fetch(queryKey[0]);
      const data = await res.json();
      return juzSchema.parse(data.data);
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Juz {juzId}</h1>
        <JuzSelector currentJuz={juzId} />
      </div>

      <div className="space-y-4">
        {juz?.verses.map((verse) => (
          <VerseCard key={verse.id} verse={verse} />
        ))}
      </div>
    </div>
  );
}
