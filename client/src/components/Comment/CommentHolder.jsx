import React from "react";
import Comment from "./Comment";
import ReplyModal from "../Modals/ReplyModal";
import ReportModal from "../Modals/ReportModal";
import MobileReplyMenu from "../Navs/MobileReplyMenu";
import axios from "axios";
import { config } from "../../URLs.jsx";
import { isExpired, decodeToken } from "react-jwt";
import styles from "./CommentHolder.module.css";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import PleaseLogin from "../Modals/PleaseLogin";
import MobileLogin from "../Modals/MobileLogin";

class CommentHolder extends React.Component {
  state = {
    replyModalOpen: false,
    reportModalOpen: false,
    mobileReplyOpen: false,
    pleaseLoginOpen: false,
    mobileLoginOpen: false,
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
    window.scrollTo(0, 0);
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("keypress", () => this.logToken());

    try {
      const jwt = localStorage.getItem("token");
      const user = decodeToken(jwt);
      this.setState({ user: user });
    } catch (ex) {
      this.setState({ user: null });
      const jwt = localStorage.getItem("token");

      console.log("no user", jwt);
    }

    const sessionStorageId = sessionStorage.getItem("postId");

    try {
      let searchParam = { parentPost: `${sessionStorageId}` };
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
      this.setState({ comments: dataTree });
      this.searchTree(dataTree, this.props.id);
    } catch (error) {
      console.log("catch block called", error);
    }
  }

  logToken = () => {
    console.log(this.state);
  };

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
    window.removeEventListener("keypress", () => this.logToken());
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  openReplyModal = () => {
    if (!this.state.user) {
      this.handlePleaseLogin();
      document.body.style.overflow = "scroll";
      return;
    }
    console.log("reply modal open called");
    this.setState({ mobileReplyOpen: false });
    this.setState({ replyModalOpen: true });
    document.body.style.overflow = "hidden";
  };

  closeReplyModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReplyModal);
    this.setState({ clickedComment: false });
    this.setState({ replyModalOpen: false });
    document.body.style.overflow = "scroll";
  };

  openReportModal = () => {
    if (!this.state.user) {
      this.handlePleaseLogin();
      document.body.style.overflow = "scroll";
      return;
    }
    console.log("report modal open called");
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
    this.setState({ reportModalOpen: true });
    document.body.style.overflow = "hidden";
  };

  closeReportModal = () => {
    this.setState({ reportModalOpen: false });
    this.setState({ clickedComment: null });
    setTimeout(() => this.setState({ alreadyReported: false }), 250);
    document.body.style.overflow = "scroll";
  };

  openMobileReplyMenu = (comment, depth) => {
    let obj = comment;
    comment.depth = depth;
    if (!this.state.mobileReplyOpen) {
      this.setState({ mobileReplyOpen: true });
      this.setState({ clickedComment: obj });
    }
    document.body.style.overflow = "hidden";
  };

  closeMobileReplyMenu = () => {
    if (this.state.mobileReplyOpen) {
      this.setState({ mobileReplyOpen: false });
    }
    document.body.style.overflow = "scroll";
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

  handlePleaseLogin = (event) => {
    console.log("handle please login called");
    this.setState({
      pleaseLoginOpen: !this.state.pleaseLoginOpen,
      mobileReplyOpen: false,
    });
  };

  handleMobileLogin = () => {
    this.setState({
      pleaseLoginOpen: false,
      mobileLoginOpen: !this.state.mobileLoginOpen,
    });
  };

  render() {
    const { result: comment } = this.state;
    return (
      <React.Fragment>
        <TopMobileNavBar />
        <PleaseLogin
          isOpen={this.state.pleaseLoginOpen}
          handleMobile={this.handleMobileLogin}
          close={this.handlePleaseLogin}
          width={this.state.width}
        />
        <MobileLogin
          isOpen={this.state.mobileLoginOpen}
          handle={this.handleMobileLogin}
        />

        <div
          className={styles.wrapper}
          onClick={() => this.setState({ pleaseLoginOpen: false })}
        >
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
            comment={this.state.clickedComment}
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
            close={this.closeMobileReplyMenu}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default CommentHolder;
