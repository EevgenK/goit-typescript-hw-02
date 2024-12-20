import s from "./ErrorMessage.module.css";
type Props = { text: string };
const ErrorMessage = ({ text }: Props) => {
  return <p className={s.error}>{text}</p>;
};

export default ErrorMessage;
