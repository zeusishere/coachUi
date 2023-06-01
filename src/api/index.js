const fetchCoachData = async () => {
  const response = await fetch(`http://localhost:3000/v1/coach/`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data;
};

const reserveSeatsInCoach = async (seats) => {
  const params = new URLSearchParams();
  params.append("seats", seats.toString());
  const endPoint =
    "http://localhost:3000/v1/coach/reserve-seats?" + params.toString();
  const response = await fetch(endPoint, {
    method: "PUT",
  });

  const data = await response.json();

  return data;
};
const resetCoach = async () => {
  const endPoint = "http://localhost:3000/v1/coach/reset";
  const response = await fetch(endPoint, {
    method: "PUT",
  });

  const data = await response.json();
  return data;
};

export { fetchCoachData, reserveSeatsInCoach, resetCoach };
