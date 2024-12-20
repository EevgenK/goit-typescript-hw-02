import s from "./LoadMoreBtn.module.css";
type LoadMoreBtnProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ children, onClick }) => {
  return (
    <button className={s.btn} type="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default LoadMoreBtn;
