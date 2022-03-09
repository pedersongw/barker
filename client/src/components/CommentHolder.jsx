import React from "react";
import Comment from "./comment";
import ReplyModal from "./ReplyModal";
import ReportModal from "./ReportModal";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { config } from "../URLs.jsx";

class CommentHolder extends React.Component {
  state = {
    replyModalOpen: false,
    reportModalOpen: false,
    viewedComment: "",
    width: window.innerWidth,
    user: null,
    comments: [],
    result: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      window.location.reload();
    }
  }

  async componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user: user });
    } catch (ex) {
      this.setState({ user: null });
    }
    try {
      let searchParam = { parentPost: `${this.props.parentPost}` };
      const { data: comments } = await axios.post(
        config + "/api/comments/get",
        searchParam
      );
      const hashTable = Object.create(null);
      comments.forEach((comment) => (hashTable[comment._id] = { ...comment }));
      const dataTree = [];
      comments.forEach((comment) => {
        if (comment.parentComment)
          hashTable[comment.parentComment].children.push(
            hashTable[comment._id]
          );
        else dataTree.push(hashTable[comment._id]);
      });
      console.log(dataTree);
      this.setState({ comments: dataTree });
      this.searchTree(dataTree, this.props.id);
    } catch (error) {
      console.log("catch block called", error);
    }
  }

  searchTree = (element, matchingTitle) => {
    for (var k in element) {
      if (element[k]._id !== matchingTitle) {
        this.searchTree(element[k].children, matchingTitle);
      } else {
        this.setState({ result: element[k] });
        return element[k];
      }
    }
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  openReplyModal = (comment) => {
    console.log(comment);
    if (comment) this.setState({ viewedComment: comment });
    this.setState({ replyModalOpen: true });
    setTimeout(
      () => window.addEventListener("click", this.handleClickOutsideReplyModal),
      500
    );
  };

  closeReplyModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReplyModal);
    this.setState({ viewedComment: false });
    this.setState({ replyModalOpen: false });
  };

  handleClickOutsideReplyModal = (event) => {
    const container = document.getElementById("reply-modal-content");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      event.target.className !== "post-reply-button" &&
      event.target.className !== "comment-button"
    ) {
      console.log("clicked outside reply modal");
      this.closeReplyModal();
    } else {
      console.log("clicked inside reply modal");
    }
  };

  openReportModal = (comment) => {
    console.log(comment);
    if (comment) this.setState({ viewedComment: comment });
    window.addEventListener("click", this.handleClickOutsideReportModal);
    this.setState({ reportModalOpen: true });
  };

  closeReportModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReportModal);
    this.setState({ reportModalOpen: false });
    this.setState({ viewedComment: false });
  };

  handleClickOutsideReportModal = (event) => {
    const container = document.getElementById("report-modal-content");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      event.target.className !== "comment-report-button"
    ) {
      console.log("clicked outside report modal");
      this.closeReportModal();
    } else {
      console.log("clicked inside report modal");
    }
  };

  render() {
    const { result: comment } = this.state;
    return (
      <div>
        {this.state.result && (
          <Comment
            depth={0}
            key={comment._id}
            openReplyModal={this.openReplyModal}
            openReportModal={this.openReportModal}
            id={comment._id}
            comment={comment}
            parentPost={comment.parentPost}
          />
        )}

        <ReplyModal
          closeModal={this.closeReplyModal}
          isOpen={this.state.replyModalOpen}
          comment={this.state.viewedComment}
          post={this.state.viewedEntry}
          width={this.state.width}
          user={this.state.user}
        />
        <ReportModal
          closeModal={this.closeReportModal}
          isOpen={this.state.reportModalOpen}
          comment={this.state.viewedComment}
          post={this.state.viewedEntry}
          width={this.state.width}
          user={this.state.user}
        />
      </div>
    );
  }
}

export default CommentHolder;
