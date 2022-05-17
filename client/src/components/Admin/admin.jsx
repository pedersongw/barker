import React from "react";
import jwtDecode from "jwt-decode";
import { config } from "../../URLs.jsx";
import axios from "axios";
import ReportedComment from "./ReportedComment";
import ReportDetails from "./ReportDetails";
import styles from "./admin.module.css";

class Admin extends React.Component {
  state = {
    user: null,
    isAdmin: false,
    comments: null,
    posts: null,
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
    try {
      const { data } = await axios.get(config + "/api/posts");
      let filtered = data.filter((post) => post.report.length > 0);
      console.log(filtered);
      this.setState({ posts: filtered });
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
      let urlSegment;
      if (comment.timePosted) {
        urlSegment = "/api/posts/delete";
        const response = await axios.post(config + urlSegment, commentID);
        console.log(response);
      } else {
        urlSegment = "/api/comments/delete";
        const response = await axios.post(config + urlSegment, commentID);
        console.log(response);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  unreport = async () => {
    const { highlighted, selectedReport } = this.state;
    let unreportObj = { id: highlighted._id, index: selectedReport };
    try {
      let urlSegment = highlighted.timePosted ? "posts" : "comments";
      const response = await axios.post(
        config + `/api/${urlSegment}/unreport`,
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

  mapPosts = () => {
    return this.state.posts.map((post) => {
      return (
        <ReportedComment
          highlightFunc={this.highlightComment}
          key={post._id}
          post={post}
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
        <div className={styles.wrapper}>
          <div className={styles.descriptions}>
            <h1 className={styles.h1}>Report Details</h1>
            {this.state.highlighted && this.mapReports()}
          </div>
          <div className={styles["reported-comments"]}>
            <h1 className={styles.h1}>Reported Comments</h1>
            {this.state.comments && this.mapComments()}
          </div>
          <div className={styles["reported-posts"]}>
            <h1 className={styles.h1}>Reported Posts</h1>
            {this.state.posts && this.mapPosts()}
          </div>
          <div className={styles["admin-buttons"]}>
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
