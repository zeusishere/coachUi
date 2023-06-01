import { useState, useEffect } from "react";
import { fetchCoachData, resetCoach } from "./api/index";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import Coach from "./Coach";
import "./App.css";
import NumberInputComponent from "./NumberInputBox";
function App() {
  const [coachData, setCoachData] = useState(null);
  const [seatNumbersBooked, updateSeatNumbersBooked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //  makes an api call and updates state of coach
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
  // resets the coach to a empty state
  const resetCoachData = async () => {
    setLoading(true);
    updateSeatNumbersBooked([]);

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
