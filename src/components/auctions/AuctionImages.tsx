import { useBreakpointValue } from "@chakra-ui/react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "../../styles/image-gallery.css";

interface Props {
  imageUrls: string[];
}

const AuctionImages = ({ imageUrls }: Props) => {
  const showThumbnail = useBreakpointValue(
    {
      base: false,
      md: true,
    },
    {
      fallback: "base",
    }
  );

  const images: ReactImageGalleryItem[] = imageUrls.map((url) => ({
    original: url,
    thumbnail: url,
  }));
  return (
    <ImageGallery
      items={images}
      thumbnailPosition={showThumbnail ? "right" : "bottom"}
      showThumbnails={showThumbnail}
      infinite={false}
    />
  );
};

export default AuctionImages;
