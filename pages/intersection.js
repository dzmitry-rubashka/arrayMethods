import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Heading from "../components/Heading";

import styles from "../styles/Arrays.module.scss";

const IntersectionPage = () => {
  const firstMockArray = [1, 6, 2, 6, 2, 43, -100];
  const secondMockArray = [43, 5, 6, -100, 5, 2, 6, 2];

  const [firstArray, setFirstArray] = useState(firstMockArray);
  const [secondArray, setSecondArray] = useState(secondMockArray);
  const [firstAddedNumber, setFirstAddedNumber] = useState("");
  const [secondAddedNumber, setSecondAddedNumber] = useState("");

  const getIntersectionArray = (firstArray, secondArray) => {
    const sortFunction = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a === b) return 0;
    };

    const unsortedIntersectionArray = firstArray.reduce((result, item) => {
      if (secondArray.includes(item) && !result.includes(item)) {
        result.push(item);
      }
      return result;
    }, []);

    return unsortedIntersectionArray.sort(sortFunction);
  };

  const [resultArray, setResultArray] = useState(
    getIntersectionArray(firstMockArray, secondMockArray),
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
      getIntersectionArray(firstArray.concat(firstAddedNumber), secondArray),
    );
    setFirstAddedNumber("");
  };

  const onSubmitSecondForm = (event) => {
    event.preventDefault();
    setSecondArray(secondArray.concat(secondAddedNumber));
    setResultArray(
      getIntersectionArray(firstArray, secondArray.concat(secondAddedNumber)),
    );
    setSecondAddedNumber("");
  };

  const onHandleDeleteFirst = (indexOfChosenNumber) => {
    const filteredFirstArray = firstArray.filter((number, index) => {
      return index !== indexOfChosenNumber;
    });
    setFirstArray(filteredFirstArray);
    setResultArray(getIntersectionArray(filteredFirstArray, secondArray));
  };

  const onHandleDeleteSecond = (indexOfChosenNumber) => {
    const filteredSecondArray = secondArray.filter((number, index) => {
      return index !== indexOfChosenNumber;
    });
    setSecondArray(filteredSecondArray);
    setResultArray(getIntersectionArray(firstArray, filteredSecondArray));
  };

  return (
    <>
      <Heading text="Intersection Method" />
      <div className={styles.wrapper}>
        <div className={styles.mockArray}>
          First Array
          {firstArray.map((number, index) => {
            return (
              <div className={styles.number} key={uuidv4()}>
                {number}
                <div
                  className={styles.delete}
                  onClick={() => onHandleDeleteFirst(index)}
                >
                  Delete
                </div>
              </div>
            );
          })}
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
          {secondArray.map((number, index) => {
            return (
              <div className={styles.number} key={uuidv4()}>
                {number}
                <div
                  className={styles.delete}
                  onClick={() => onHandleDeleteSecond(index)}
                >
                  Delete
                </div>
              </div>
            );
          })}
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

export default IntersectionPage;
