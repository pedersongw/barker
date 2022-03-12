import React from "react";
import jwtDecode from "jwt-decode";
import { config } from "../URLs.jsx";
import axios from "axios";
import ReportedComment from "./ReportedComment";
import ReportDetails from "./ReportDetails";

class Admin extends React.Component {
  state = {
    user: null,
    isAdmin: false,
    comments: null,
    highlighted: null,
    selectedReport: null,
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    this.setState({ user: user });
    if (user.isAdmin) {
      this.setState({ isAdmin: true });
    }
    try {
      const { data } = await axios.get(config + "/api/comments/all");
      let filtered = data.filter(
        (comment) => comment.report.length > 0 && !comment.deleted
      );
      console.log(filtered);
      this.setState({ comments: filtered });
    } catch (err) {
      console.log(err);
    }
  }

  highlightComment = (comment) => {
    if (!this.state.highlighted || comment._id !== this.state.highlighted._id) {
      this.setState({ highlighted: comment });
      this.setState({ selectedReport: null });
    } else {
      this.setState({ highlighted: null });
      this.setState({ selectedReport: null });
    }
  };

  selectReport = (index) => {
    if (this.state.selectedReport === index) {
      this.setState({ selectedReport: null });
    } else {
      this.setState({ selectedReport: index });
    }
    console.log("clicked " + index.toString());
  };

  updateDeletedComment = async () => {
    const comment = this.state.highlighted;
    let commentID = { _id: comment._id };
    try {
      const response = await axios.post(
        config + "/api/comments/delete",
        commentID
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  unreport = async () => {
    const { highlighted, selectedReport } = this.state;
    let unreportObj = { id: highlighted._id, index: selectedReport };
    try {
      const response = await axios.post(
        config + "/api/comments/unreport",
        unreportObj
      );
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  mapComments = () => {
    return this.state.comments.map((comment) => {
      return (
        <ReportedComment
          highlightFunc={this.highlightComment}
          key={comment._id}
          comment={comment}
          highlighted={this.state.highlighted}
        />
      );
    });
  };

  mapReports = () => {
    return this.state.highlighted.report.map((reportObj, index) => {
      return (
        <ReportDetails
          select={this.selectReport}
          key={index}
          index={index}
          reportObj={reportObj}
          selectedReportIndex={this.state.selectedReport}
        />
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="admin-holder">
          <div className="report-descriptions-section">
            <h1 className="admin-h1">Report Details</h1>
            {this.state.highlighted && this.mapReports()}
          </div>
          <div className="reported">
            <h1 className="admin-h1">Reported Comments</h1>
            {this.state.comments && this.mapComments()}
          </div>
          <div className="admin-buttons">
            {this.state.highlighted && (
              <button onClick={() => this.updateDeletedComment()}>
                Mark Comment as Deleted
              </button>
            )}

            {this.state.selectedReport !== null && (
              <button onClick={() => this.unreport()}>
                Remove Selected Report
              </button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
