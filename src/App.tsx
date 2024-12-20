import { useEffect, useRef, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import { getGallery } from "./services/api";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import smoothScroll from "./services/smoothScroll";
import ImageModal from "./components/ImageModal/ImageModal";

import "./App.css";
import { Image, modalImgType } from "./App.types";
import toast from "react-hot-toast";

function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImg, setModalImg] = useState<modalImgType>({
    modalImg: "",
    alt: "",
    likes: 0,
  });
  const galleryRef = useRef<HTMLUListElement>(null);
  const prevSearchRef = useRef<string>("");
  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchImages = async (): Promise<void> => {
      try {
        setIsLoading(true);
        let request = page;
        if (prevSearchRef.current !== search) {
          prevSearchRef.current = search;
          request = 1;
          setImages([]);
        }
        const { results, pages } = await getGallery(search, request);
        if (!results.length) {
          toast.error(
            `Sorry, there is no results on "${search}". Please try another request`
          );
        }
        setImages((prevImages) => [...prevImages, ...results]);

        setTotalPages(pages);
      } catch (errors) {
        setError((errors as Error).message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [search, page]);
  const onOpenModal = (obj: modalImgType) => {
    setIsModalOpen(true);
    setModalImg(obj);
  };
  return (
    <section>
      <SearchBar onSubmit={(el: string) => setSearch(el)} />
      <div className="container">
        {error ? (
          <ErrorMessage text={error} />
        ) : (
          !!images.length && (
            <ImageGallery
              getRef={galleryRef}
              items={images}
              openModal={onOpenModal}
            />
          )
        )}
        {isLoading && <Loader />}
        {!images.length ||
          (totalPages > page && (
            <LoadMoreBtn
              onClick={() => {
                setPage((prevPage) => prevPage + 1);
                setTimeout(() => {
                  smoothScroll(galleryRef);
                }, 100);
              }}
            >
              Load more
            </LoadMoreBtn>
          ))}

        <ImageModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
          }}
          imageData={modalImg}
        />
      </div>
    </section>
  );
}

export default App;
