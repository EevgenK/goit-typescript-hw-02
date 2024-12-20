import { Image, modalImgType } from "../../App.types";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

type ImageGalleryProps = {
  items: Image[];
  getRef: React.RefObject<HTMLUListElement>;
  openModal: (obj: modalImgType) => void;
};
const ImageGallery = ({ items, getRef, openModal }: ImageGalleryProps) => {
  return (
    <ul className={s.list} ref={getRef}>
      {items.map((el) => {
        return (
          <li key={el.id}>
            <ImageCard
              openModal={openModal}
              src={el.urls.small}
              modalImg={el.urls.regular}
              alt={el.alt_description}
              likes={el.likes}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
