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
import { IPlantNetSpecies } from "@/data/interfaces/IPlantNetSpecies";

interface IWikipediaModalProps {
  answer: IPlantNetSpecies;
}

const WikipediaDialog: React.FC<IWikipediaModalProps> = ({ answer }) => {
  const [articleContent, setArticleContent] = useState<string>("");

  const handleGetArticleContent = async () => {
    const baseApiUrl = import.meta.env.VITE_API_URL_LOCAL;
    const headers = {
      Accept: "*/*",
    };
    const apiUrl = `${baseApiUrl}/api/plant/getWikiArticle/${answer.name}/${
      answer.commonNames !== undefined ? answer.commonNames : "-"
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
        <Button variant={"secondary"} onClick={handleGetArticleContent}>
          <BadgeInfo className="w-4 h-4 mr-2" /> En savoir plus
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{`${answer.name} ${
            answer.commonNames !== undefined ? `(${answer.commonNames})` : ""
          }`}</DialogTitle>
          <DialogDescription>
            {!articleContent.includes("Données non-disponible")
              ? "Informations provenant de Wikipédia"
              : ""}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-start justify-center gap-2 dialogContent">
          <div className="flex flex-row gap-4 scrollAreaContainer">
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div dangerouslySetInnerHTML={{ __html: articleContent }} />
            </ScrollArea>
            <ScrollArea className="h-[300px] w-full rounded-md border p-4">
              <div className="flex flex-col gap-4 imagesContainer">
                {answer.images.map((image) => (
                  <img src={image} />
                ))}
              </div>
            </ScrollArea>
          </div>
          {!articleContent.includes("Données non-disponible") ? (
            <Button
              variant="link"
              onClick={() =>
                window.open(
                  `https://fr.wikipedia.org/wiki/${answer.name}`,
                  "_blank"
                )
              }
            >
              En savoir plus
            </Button>
          ) : (
            <Button
              variant="link"
              onClick={() =>
                window.open(
                  `https://www.google.com/search?q=${answer.name} (${answer.commonNames})`,
                  "_blank"
                )
              }
            >
              En savoir plus
            </Button>
          )}
        </div>
        <DialogFooter>
          {/* <Button type="submit">Save changes</Button> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WikipediaDialog;
