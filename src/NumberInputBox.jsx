import React, { useState } from "react";
import { reserveSeatsInCoach } from "./api";
function NumberInputComponent(props) {
  const { setCoachData, updateSeatNumbersBooked } = props;
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleChange = (event) => {
    let value = event.target.value;
    setInputValue(value);
    setIsValid(
      Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) <= 7
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isValid) {
      const responseData = await reserveSeatsInCoach(inputValue);
      if (responseData.success) {
        setCoachData(responseData.coach);
        updateSeatNumbersBooked(responseData.seatNumbersBooked);
      } else {
        alert(responseData.message);
      }
    } else {
      setIsValid(
        Number.isInteger(Number(inputValue)) &&
          Number(inputValue) > 0 &&
          Number(inputValue) <= 7
      );
    }
  };

  return (
    <div className="input-div">
      <form onSubmit={handleSubmit}>
        <label>
          Enter a number:
          <input type="number" value={inputValue} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
        {!isValid && (
          <p>
            Please enter a valid integer number greater than 0 and less than 8.
          </p>
        )}
      </form>
    </div>
  );
}

export default NumberInputComponent;
