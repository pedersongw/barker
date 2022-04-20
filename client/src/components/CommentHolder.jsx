import React from "react";
import Comment from "./comment";
import ReplyModal from "./ReplyModal";
import ReportModal from "./ReportModal";
import MobileReplyMenu from "./MobileReplyMenu";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { config } from "../URLs.jsx";

class CommentHolder extends React.Component {
  state = {
    replyModalOpen: false,
    reportModalOpen: false,
    mobileReplyOpen: false,
    clickedComment: "",
    alreadyReported: false,
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

  openReplyModal = () => {
    this.setState({ mobileReplyOpen: false });
    this.setState({ replyModalOpen: true });
    setTimeout(
      () => window.addEventListener("click", this.handleClickOutsideReplyModal),
      500
    );
  };

  closeReplyModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReplyModal);
    this.setState({ clickedComment: false });
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

  openReportModal = () => {
    this.setState({ mobileReplyOpen: false });

    let obj = this.state.clickedComment;
    if (!obj) {
      obj = this.state.post;
    }
    console.log(obj);
    if (obj.report) {
      let reported = obj.report.filter(
        (obj) => obj.user._id === this.state.user._id
      );
      reported.length > 0
        ? this.setState({ alreadyReported: true })
        : console.log("not yet reported");
    } else {
      console.log("not yet reported");
    }

    window.addEventListener("click", this.handleClickOutsideReportModal);
    this.setState({ reportModalOpen: true });
  };

  closeReportModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReportModal);
    this.setState({ reportModalOpen: false });
    this.setState({ clickedComment: null });
    setTimeout(() => this.setState({ alreadyReported: false }), 250);
  };

  handleClickOutsideReportModal = (event) => {
    const container = document.getElementById("report-modal-content");
    if (
      container !== event.target &&
      !container.contains(event.target) &&
      event.target.id !== "comment-report-button"
    ) {
      console.log("clicked outside report modal");
      this.closeReportModal();
    } else {
      console.log("clicked inside report modal");
    }
  };

  openMobileReplyMenu = (comment) => {
    console.log("open mobile reply");
    if (!this.state.mobileReplyOpen) {
      this.setState({ mobileReplyOpen: true });
      this.setState({ clickedComment: comment });
      window.addEventListener(
        "mousedown",
        this.handleClickOutsideMobileReplyMenu
      );
    }
    document.body.style.overflow = "hidden";
  };

  closeMobileReplyMenu = () => {
    if (this.state.mobileReplyOpen) {
      this.setState({ mobileReplyOpen: false });
      this.setState({ clickedComment: null });
      window.removeEventListener(
        "mousedown",
        this.handleClickOutsideMobileReplyMenu
      );
    }
    document.body.style.overflow = "scroll";
  };

  handleClickOutsideMobileReplyMenu = (event) => {
    if (event.target.className !== "mobile-nav-button") {
      this.closeMobileReplyMenu();
    }
  };

  updateDeletedComment = async () => {
    const comment = this.state.clickedComment;
    let commentID = { _id: comment._id };
    try {
      const response = await axios.post(
        config + "/api/comments/delete",
        commentID
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  render() {
    const { result: comment } = this.state;
    return (
      <div className="comment-holder">
        {this.state.result && (
          <Comment
            depth={0}
            key={comment._id}
            openReplyModal={this.openReplyModal}
            openReportModal={this.openReportModal}
            id={comment._id}
            width={this.state.width}
            comment={comment}
            parentPost={comment.parentPost}
            handleMenu={this.openMobileReplyMenu}
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
          comment={this.state.clickedComment}
          post={this.state.viewedEntry}
          width={this.state.width}
          reported={this.state.alreadyReported}
          user={this.state.user}
        />
        <MobileReplyMenu
          openReportModal={this.openReportModal}
          openReplyModal={this.openReplyModal}
          delete={this.updateDeletedComment}
          open={this.state.mobileReplyOpen}
        />
      </div>
    );
  }
}

export default CommentHolder;
