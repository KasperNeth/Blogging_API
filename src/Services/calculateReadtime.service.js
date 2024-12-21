require("dotenv").config()

// Converts time in minutes into a human-readable format
const HumanReadable= (time) => {
  if (time < 0.5) {
    return "less than a minute";
  }
  if (time >= 0.5 && time < 1.5) {
    return "a minute";
  }
  if (time < 60) {
    return `${Math.ceil(time)} minutes`;
  }
  const hours = Math.floor(time / 60);
  const minsRemaining = Math.round(time % 60);
  if (minsRemaining === 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  }
  return `${hours} hour${hours > 1 ? "s" : ""} and ${minsRemaining} minutes`;
};


const calculateReadTime = (text) => {
  const wordsPerMinute = parseInt(process.env.WPM_SECRET, 10) || 200; 
  const noOfWordCount = text.trim().split(/\s+/).filter((word) => word.length > 0).length; 
  const timeInMinutes = noOfWordCount / wordsPerMinute;
  return HumanReadable(timeInMinutes);
};

module.exports = 
{calculateReadTime};
