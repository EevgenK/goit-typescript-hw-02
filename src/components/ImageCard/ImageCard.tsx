import { modalImgType } from "../../App.types";
import s from "./ImageCard.module.css";
type ImageCardProps = {
  src: string;
  alt: string;
  likes: number;
  modalImg: string;
  openModal: (obj: modalImgType) => void;
};
const ImageCard = ({
  src,
  alt,
  modalImg,
  likes,
  openModal,
}: ImageCardProps) => {
  return (
    <div className={s.card} onClick={() => openModal({ modalImg, alt, likes })}>
      <img className={s.img} src={src} alt={alt} />
    </div>
  );
};

export default ImageCard;
