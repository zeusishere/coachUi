import React from "react";

// returns row and col(to be plotted in Matrix) in from seatNumber
const getRowAndColFromSeatNumber = (seatNum) => {
  let row = Math.floor(seatNum / 7);
  let col = seatNum - row * 7 - 1;
  //   move back one row
  if (col < 0) {
    col = 6;
    row -= 1;
  }
  return { row, col };
};

const Coach = ({ coachData, seatNumbersBookedInCurrentReq = [] }) => {
  const bookedSeats = coachData?.bookedSeats || [];

  const numRows = 12;
  const numCols = 7;
  const lastRowNumCols = 3;
  //  generates colour coded seating arrangement of coach
  const generateMatrixData = () => {
    const matrixData = [];
    // marks all seats as available (color green)
    for (let i = 0; i < numRows; i++) {
      const rowData = [];
      for (let j = 0; j < (i === numRows - 1 ? lastRowNumCols : numCols); j++) {
        const cell = {
          position: i * 7 + j + 1,
          occupied: false,
        };
        rowData.push(cell);
      }
      matrixData.push(rowData);
    }
    // marks the  seats booked (color grey)
    for (let seatNum of bookedSeats) {
      const { row, col } = getRowAndColFromSeatNumber(seatNum);
      matrixData[row][col].occupied = true;
    }

    // marks the  seats booked in current req (color orange), if any
    for (let seatNum of seatNumbersBookedInCurrentReq) {
      const { row, col } = getRowAndColFromSeatNumber(seatNum);
      matrixData[row][col].occupied = "current";
    }

    return matrixData;
  };

  const matrixData = generateMatrixData();

  return (
    <div className="matrix-container">
      <h1>Coach Seating Arrangement</h1>
      <table className="matrix-table">
        <tbody>
          {matrixData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  style={{
                    backgroundColor: !cell.occupied
                      ? "green"
                      : cell.occupied === "current"
                      ? "orange"
                      : "grey",
                    margin: "8px",
                  }}
                >
                  {`${cell.position}`}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Coach;
