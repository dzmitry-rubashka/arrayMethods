import styles from "../styles/Heading.module.scss";

const Heading = ({ text }) => {
  return <div className={styles.wrapper}>{text}</div>;
};

export default Heading;
