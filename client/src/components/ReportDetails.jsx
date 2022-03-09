import React from "react";

class ReportDetails extends React.Component {
  render() {
    const { reportObj, selectedReportIndex, index } = this.props;
    return (
      <div
        className="report-details"
        id={selectedReportIndex === index ? "selected-report" : null}
        onClick={() => this.props.select(this.props.index)}
      >
        <div className="report-user">{reportObj.user.name}</div>
        <div className="report-selected-option">
          {"Reason:   " + reportObj.selectedOption}
        </div>

        {reportObj.selectedOption === "Other" && (
          <React.Fragment>
            <div className="report-description">Description: </div>
            <div className="report-explanation">{reportObj.otherText}</div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ReportDetails;
