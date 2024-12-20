import { RefObject } from "react";

const smoothScroll = (element: RefObject<HTMLElement>): void => {
  if (element.current) {
    let cardHeight =
      element.current.firstElementChild?.getBoundingClientRect().height || 0;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
  }
};
export default smoothScroll;
