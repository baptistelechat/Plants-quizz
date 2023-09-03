import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { BadgeInfo } from "lucide-react";

interface IWikipediaModalProps {
  scientificName: string;
  commonName: string;
}

const WikipediaDialog: React.FC<IWikipediaModalProps> = ({
  scientificName,
  commonName,
}) => {
  const [articleContent, setArticleContent] = useState<string>("");

  const handleGetArticleContent = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL_LOCAL;
    const headers = {
      Accept: "*/*",
    };
    const apiUrl = `${baseApiUrl}/api/plant/getWikiArticle/${scientificName}/${
      commonName !== undefined ? commonName : "-"
    }`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers,
      });
      if (response.ok) {
        const data = await response.json();
        setArticleContent(data.articleContent);
      } else {
        console.log("Erreur de réponse du serveur - Wikipedia");
      }
    } catch (error) {
      console.log("Erreur lors de la requête fetch (Wikipedia):", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" onClick={handleGetArticleContent}>
          <BadgeInfo className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{`${scientificName} ${
            commonName !== undefined ? `(${commonName})` : ""
          }`}</DialogTitle>
          <DialogDescription>
            Informations provenant de Wikipédia
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          <div dangerouslySetInnerHTML={{ __html: articleContent }} />
        </ScrollArea>
        {!articleContent.includes("Données non-disponible") ? (
          <a
            className="underline"
            href={`https://fr.wikipedia.org/wiki/${scientificName}`}
            target="_blank"
          >
            En savoir plus
          </a>
        ) : (
          <></>
        )}
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WikipediaDialog;
