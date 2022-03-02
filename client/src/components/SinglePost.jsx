import React from "react";
import Comment from "./comment";
import DateComponent from "./date";
import ReportModal from "./ReportModal";
import ReplyModal from "./ReplyModal";
import jwtDecode from "jwt-decode";
import TopMobileNavBar from "./TopMobileNavBar";
import { config } from "../URLs.jsx";
import axios from "axios";

class SinglePost extends React.Component {
  state = {
    reply: "",
    post: null,
    comments: null,
    replyModalOpen: false,
    reportModalOpen: false,
    viewedComment: null,
    user: null,
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    this.setState({ user: user });
    try {
      const { data } = await axios.get(config + "/api/posts/single", {
        params: {
          _id: this.props.id,
        },
      });
      console.log(data);
      this.setState({ post: data });
    } catch (error) {
      console.log("Couldn't reach the server", error);
    }
    try {
      let searchParam = { parentPost: `${this.props.id}` };
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
    } catch (error) {
      console.log("catch block called", error);
    }
  }

  renderCommentsInListGroup = () => {
    return this.state.comments.map((comment) => {
      return (
        <Comment
          depth={0}
          key={comment._id}
          openReplyModal={this.openReplyModal}
          openReportModal={this.openReportModal}
          id={comment._id}
          comment={comment}
          parentPost={comment.parentPost}
        />
      );
    });
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
    console.log(container, event.target);
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
    window.addEventListener("click", this.handleClickOutsideReportModal);
    this.setState({ reportModalOpen: true });
  };

  closeReportModal = () => {
    window.removeEventListener("click", this.handleClickOutsideReportModal);
    this.setState({ reportModalOpen: false });
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
    const { post, comments } = this.state;
    return (
      <React.Fragment>
        <ReplyModal
          closeModal={this.closeReplyModal}
          isOpen={this.state.replyModalOpen}
          comment={this.state.viewedComment}
          post={this.state.post}
          width={this.state.width}
          user={this.state.user}
        />
        <ReportModal
          closeModal={this.closeReportModal}
          isOpen={this.state.reportModalOpen}
          comment={this.state.viewedComment}
          post={this.state.post}
          width={this.state.width}
          user={this.state.user}
        />
        <TopMobileNavBar />
        <div className="posts-spacer">
          <div className="posts-div">
            <div className="viewed-post-wrapper">
              {this.state.comments && this.state.post && (
                <React.Fragment>
                  <div className="viewed-post">
                    <h3 className="viewed-post-title">{post.title}</h3>
                    <p className="viewed-post-user">
                      posted by {post.username[1]}
                    </p>
                    <p className="viewed-post-body">{post.body}</p>
                    <p className="viewed-post-likes">
                      {post.likes.length.toString() +
                        (post.likes.length === 1
                          ? " person liked this"
                          : " people liked this")}
                    </p>
                    <div className="viewed-post-time">
                      <DateComponent time={post.timePosted} />
                    </div>
                    <div className="viewed-post-reply-div">
                      <button
                        type="submit"
                        className="post-reply-button"
                        onClick={() => this.openReplyModal()}
                      >
                        Reply
                      </button>
                    </div>
                  </div>

                  <div>{this.renderCommentsInListGroup()}</div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SinglePost;
