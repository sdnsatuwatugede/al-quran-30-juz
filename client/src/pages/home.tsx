import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-primary">Al-Quran Digital</h1>
        <p className="text-muted-foreground">
          Baca dan pelajari Al-Quran dengan terjemahan Bahasa Indonesia
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((juz) => (
          <Link key={juz} href={`/juz/${juz}`}>
            <Card className="hover:border-primary transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Book className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Juz {juz}</h2>
                  <p className="text-sm text-muted-foreground">
                    Baca Juz ke-{juz}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
