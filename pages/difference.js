import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Heading from "../components/Heading";

import styles from "../styles/Arrays.module.scss";

const DifferencePage = () => {
  const firstMockArray = [-3, 6, 90, 90, 0, 1];
  const secondMockArray = [435, 0, -56, 90];

  const [firstArray, setFirstArray] = useState(firstMockArray);
  const [secondArray, setSecondArray] = useState(secondMockArray);
  const [firstAddedNumber, setFirstAddedNumber] = useState("");
  const [secondAddedNumber, setSecondAddedNumber] = useState("");

  const getDiffArray = (firstArray, secondArray) => {
    const sortFunction = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a === b) return 0;
    };
    const unsortedDiffArray = firstArray.reduce((result, item) => {
      if (!secondArray.includes(item)) {
        result.push(item);
      }
      return result;
    }, []);
    return unsortedDiffArray.sort(sortFunction).reduce((result, item) => {
      if (!result.includes(item)) {
        result.push(item);
      }
      return result;
    }, []);
  };

  const [resultArray, setResultArray] = useState(
    getDiffArray(firstArray, secondArray),
  );

  const handleChangeFirstNumber = (event) => {
    const newNumber = event.target.value;
    setFirstAddedNumber(+newNumber);
  };

  const handleChangeSecondNumber = (event) => {
    const newNumber = event.target.value;
    setSecondAddedNumber(+newNumber);
  };

  const onSubmitFirstForm = (event) => {
    event.preventDefault();
    setFirstArray(firstArray.concat(firstAddedNumber));
    setResultArray(
      getDiffArray(firstArray.concat(firstAddedNumber), secondArray),
    );
    setFirstAddedNumber("");
  };

  const onSubmitSecondForm = (event) => {
    event.preventDefault();
    setSecondArray(secondArray.concat(secondAddedNumber));
    setResultArray(
      getDiffArray(firstArray, secondArray.concat(secondAddedNumber)),
    );
    setSecondAddedNumber("");
  };

  const onHandleDeleteFirst = (indexOfChosenNumber) => {
    const filteredFirstArray = firstArray.filter((number, index) => {
      return index !== indexOfChosenNumber;
    });
    setFirstArray(filteredFirstArray);
    setResultArray(getDiffArray(filteredFirstArray, secondArray));
  };

  const onHandleDeleteSecond = (indexOfChosenNumber) => {
    const filteredSecondArray = secondArray.filter((number, index) => {
      return index !== indexOfChosenNumber;
    });
    setSecondArray(filteredSecondArray);
    setResultArray(getDiffArray(firstArray, filteredSecondArray));
  };

  return (
    <>
      <Heading text="Difference Method" />
      <div className={styles.wrapper}>
        <div className={styles.mockArray}>
          First Array
          {firstArray.map((number, index) => (
            <div className={styles.number} key={uuidv4()}>
              {number}
              <div
                className={styles.delete}
                onClick={() => onHandleDeleteFirst(index)}
              >
                Delete
              </div>
            </div>
          ))}
          <form onSubmit={onSubmitFirstForm} className={styles.form}>
            <input
              required
              type="number"
              onChange={handleChangeFirstNumber}
              value={firstAddedNumber}
              className={styles.input}
              placeholder="New number"
            />
            <button type="submit" className={styles.button}>
              Add
            </button>
          </form>
        </div>
        <div className={styles.mockArray}>
          Second Array
          {secondArray.map((number, index) => (
            <div className={styles.number} key={uuidv4()}>
              {number}
              <div
                className={styles.delete}
                onClick={() => onHandleDeleteSecond(index)}
              >
                Delete
              </div>
            </div>
          ))}
          <form onSubmit={onSubmitSecondForm} className={styles.form}>
            <input
              required
              type="number"
              onChange={handleChangeSecondNumber}
              value={secondAddedNumber}
              className={styles.input}
              placeholder="New number"
            />
            <button type="submit" className={styles.button}>
              Add
            </button>
          </form>
        </div>
      </div>
      <div className={styles.result}>
        Result Array
        {resultArray.map((number) => {
          return (
            <div className={styles.number} key={uuidv4()}>
              {number}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default DifferencePage;
