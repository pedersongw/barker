import React from "react";

class DateComponent extends React.Component {
  findMillisecondsDiff = () => {
    const diff = new Date() - new Date(this.props.time);
    return diff;
  };

  findDaysDiff = () => {
    return Math.floor(
      this.findMillisecondsDiff() / 1000 / 60 / 60 / 24
    ).toString();
  };

  findHoursDiff = () => {
    return Math.floor(this.findMillisecondsDiff() / 1000 / 60 / 60).toString();
  };

  findMinutesDiff = () => {
    return Math.floor(this.findMillisecondsDiff() / 1000 / 60).toString();
  };

  findSecondsDiff = () => {
    return Math.floor(this.findMillisecondsDiff() / 1000).toString();
  };
  displayWhenPosted = () => {
    const minutes = this.findMinutesDiff();
    const hours =
      Number(this.findHoursDiff()) > 0 ? this.findHoursDiff() : false;
    const days = Number(this.findDaysDiff()) > 0 ? this.findDaysDiff() : false;
    if (days) {
      return Number(days) > 1 ? days + " days ago" : days + " day ago";
    } else if (hours) {
      return Number(hours) > 1 ? hours + " hours ago" : hours + " hour ago";
    } else {
      if (Number(minutes) <= 2) {
        return "Just Now!";
      } else {
        return minutes + " minutes ago";
      }
    }
  };

  render() {
    return <small>{this.displayWhenPosted()}</small>;
  }
}

export default DateComponent;
