
export function formatDate(timestamp) {
    if (!timestamp) return "";
    const dateObj = new Date(timestamp);
    return dateObj.toISOString().split("T")[0]; // Extracts 'YYYY-MM-DD'
  }
  
//Formats a timestamp to extract the time in 'HH:MM:SS' format.

  export function formatTime(timestamp) {
    if (!timestamp) return "";
    const dateObj = new Date(timestamp);
    return dateObj.toTimeString().split(" ")[0]; // Extracts 'HH:MM:SS'
  }
  