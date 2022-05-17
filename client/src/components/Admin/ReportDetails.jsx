import React from "react";
import styles from "./ReportDetails.module.css";

class ReportDetails extends React.Component {
  render() {
    const { reportObj, selectedReportIndex, index } = this.props;
    return (
      <div
        className={styles.reportDetails}
        id={selectedReportIndex === index ? styles.selectedReport : null}
        onClick={() => this.props.select(this.props.index)}
      >
        <div className={styles.reportUser}>{reportObj.user.name}</div>
        <div className={styles.reportSelectedOption}>
          {"Reason:   " + reportObj.selectedOption}
        </div>

        {reportObj.selectedOption === "Other" && (
          <React.Fragment>
            <div className={styles.reportDescription}>Description: </div>
            <div className={styles.reportExplanation}>
              {reportObj.otherText}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ReportDetails;
