import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [date, setDate] = useState(new Date()); // Initialize with current date

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendar = () => {
    const month = date.getMonth(); // 0-indexed (January = 0)
    const year = date.getFullYear();

    const firstDay = (new Date(year, month)).getDay(); // 0-indexed (Sunday = 0)
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarRows = [];
    let day = 1;
    for (let i = 0; i < 6; i++) { // Max 6 rows for calendar
      const calendarCells = [];
      for (let j = 0; j < 7; j++) { // 7 days in a week
        if (i === 0 && j < firstDay) {
          calendarCells.push(<td key={`empty-${j}`}></td>); // Empty cells for days before first day
        } else if (day > daysInMonth) {
          break; // Break if all days filled
        } else {
          const isToday = (day === date.getDate() && month === date.getMonth() && year === date.getFullYear());
          const cellClass = isToday ? 'bg-blue-500 text-white font-bold' : '';
          calendarCells.push(
            <td key={`day-${day}`} className={cellClass}>
              {day}
            </td>
          );
          day++;
        }
      }
      calendarRows.push(<tr key={`row-${i}`}>{calendarCells}</tr>);
    }

    return (
      <table className="w-full table-auto border border-gray-300">
        <thead>
          <tr className="text-center bg-gray-200">
            <th colSpan="7">
              <div className="flex justify-between items-center px-2 py-1">
                <button className="focus:outline-none" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
                  <i className="fas fa-chevron-left text-gray-400 hover:text-blue-500"></i> {/* Replace with appropriate icon */}
                </button>
                <span className="font-bold text-xl">{`${months[date.getMonth()]} ${date.getFullYear()}`}</span>
                <button className="focus:outline-none" onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
                  <i className="fas fa-chevron-right text-gray-400 hover:text-blue-500"></i> {/* Replace with appropriate icon */}
                </button>
              </div>
            </th>
          </tr>
          <tr className="text-center bg-gray-300 text-sm">
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>{calendarRows}</tbody>
      </table>
    );
  };

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Update the state with the current date on component mount
  useEffect(() => {
    const intervalId = setInterval(() => setDate(new Date()), 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup function to prevent memory leaks
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-100 rounded-lg shadow-md">
      {generateCalendar()}
    </div>
  );
};

export default Calendar;
