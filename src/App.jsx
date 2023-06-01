import { useState, useEffect } from "react";
import { fetchCoachData, resetCoach, reserveSeatsInCoach } from "./api/index";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import Coach from "./Coach";
import "./App.css";
import NumberInputComponent from "./NumberInputBox";
function App() {
  const [count, setCount] = useState(0);
  const [coachData, setCoachData] = useState(null);
  const [seatNumbersBooked, updateSeatNumbersBooked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchCoachData = async () => {
    setLoading(true);

    try {
      const responseData = await fetchCoachData();
      setCoachData(responseData.coach);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const resetCoachData = async () => {
    setLoading(true);

    try {
      const responseData = await resetCoach(coachData._id);
      setCoachData(responseData.coach);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCoachData();
  }, []);

  return (
    <div>
      <Button onClick={handleFetchCoachData} text={"Fetch Data"} />{" "}
      <Button onClick={resetCoachData} text={"Reset Data"} />
      <br />
      <NumberInputComponent
        setCoachData={setCoachData}
        updateSeatNumbersBooked={updateSeatNumbersBooked}
      />
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <Coach
          coachData={coachData}
          seatNumbersBookedInCurrentReq={seatNumbersBooked}
        />
      )}
    </div>
  );
}

export default App;
