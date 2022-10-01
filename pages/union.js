import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Heading from "../components/Heading";

import styles from "../styles/Arrays.module.scss";

const UnionPage = () => {
  const firstMockArray = [4, 4, 3, 5];
  const secondMockArray = [453, 2, 4, 5, 21, 55];

  const [firstArray, setFirstArray] = useState(firstMockArray);
  const [secondArray, setSecondArray] = useState(secondMockArray);
  const [firstAddedNumber, setFirstAddedNumber] = useState("");
  const [secondAddedNumber, setSecondAddedNumber] = useState("");

  const arrayToSet = (array) => {
    const sortFunction = (a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      if (a === b) return 0;
    };

    const arrayWithUniqueValues = array.reduce((result, item) => {
      if (!result.includes(item)) {
        result.push(item);
      }
      return result;
    }, []);
    return arrayWithUniqueValues.sort(sortFunction);
  };

  const unionArrays = (firstArray, secondArray) => {
    const firstArrayToSet = arrayToSet(firstArray);
    const secondArrayToSet = arrayToSet(secondArray);
    return arrayToSet(firstArrayToSet.concat(secondArrayToSet));
  };

  const [resultArray, setResultArray] = useState(
    unionArrays(firstMockArray, secondMockArray),
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
      unionArrays(firstArray.concat(firstAddedNumber), secondArray),
    );
    setFirstAddedNumber("");
  };

  const onSubmitSecondForm = (event) => {
    event.preventDefault();
    setSecondArray(secondArray.concat(secondAddedNumber));
    setResultArray(
      unionArrays(firstArray, secondArray.concat(secondAddedNumber)),
    );
    setSecondAddedNumber("");
  };

  const onHandleDeleteFirst = (indexOfChosenNumber) => {
    const filteredFirstArray = firstArray.filter((number, index) => {
      return index !== indexOfChosenNumber;
    });
    setFirstArray(filteredFirstArray);
    setResultArray(unionArrays(filteredFirstArray, secondArray));
  };

  const onHandleDeleteSecond = (indexOfChosenNumber) => {
    const filteredSecondArray = secondArray.filter((number, index) => {
      return index !== indexOfChosenNumber;
    });
    setSecondArray(filteredSecondArray);
    setResultArray(unionArrays(firstArray, filteredSecondArray));
  };

  return (
    <>
      <Heading text="Union Method" />
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

export default UnionPage;
