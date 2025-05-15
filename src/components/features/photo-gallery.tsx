import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";

interface Photo {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  uploadedAt: string;
  dataAiHint?: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {photos.length === 0 ? (
        <p className="col-span-full text-center text-muted-foreground py-10">
          Aún no hay fotos. ¡Sé el primero en compartir!
        </p>
      ) : (
        photos.map((photo) => (
          <Card
            key={photo.id}
            className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <CardContent className="p-0 flex-grow">
              <div className="aspect-video relative w-full">
                <Image
                  src={photo.url}
                  alt={photo.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  data-ai-hint={photo.dataAiHint}
                  priority={false}
                  unoptimized={false}
                />
              </div>
            </CardContent>
            {(photo.caption || photo.alt !== `Uploaded image ${photo.url.split("/").pop()}`) && (
              <CardFooter className="p-3 pt-2">
                <CardDescription className="text-xs text-muted-foreground truncate">
                  {photo.caption || photo.alt}
                </CardDescription>
              </CardFooter>
            )}
          </Card>
        ))
      )}
    </div>
  );
}
