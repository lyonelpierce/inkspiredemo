import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useImageModal } from "@/hooks/use-image-modal";
import { Button } from "@/components/ui/button";
import { Download, Copy, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import Image from "next/image";

export const ImageModal = () => {
  const imageModal = useImageModal();

  const [isOwn, setIsOwn] = useState(false);
  const { imageUrl, imagePrompt, imageStyle, username, imageId, ownerId } =
    useImageModal();

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);

      const filename = "generated_image.png";
      anchor.download = filename;

      anchor.click();

      URL.revokeObjectURL(anchor.href);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(imagePrompt).then(
      () => {},
      (error) => {
        console.error("Error copying prompt to clipboard:", error);
      }
    );
  };

  const firstLetter = username ? username.charAt(0).toUpperCase() : "";

  const handleDelete = async (imageId: string) => {
    try {
      const response = await fetch("/api/gallery", {
        method: "DELETE",
        body: JSON.stringify({ imageId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <Dialog open={imageModal.isOpen} onOpenChange={imageModal.onClose}>
      <DialogContent className="p-5 md:flex bg-[#171717] border-0">
        <Image
          width={600}
          height={512}
          alt="Generated"
          src={imageUrl}
          className="rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
};
