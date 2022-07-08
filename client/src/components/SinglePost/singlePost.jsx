import React from "react";
import styles from "./singlePost.module.css";
import { isExpired, decodeToken } from "react-jwt";
import { config } from "../../URLs.jsx";
import axios from "axios";

import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import Comment from "../Comment/Comment";
import DateComponent from "../Utilities/date";
import ReportModal from "../Modals/ReportModal";
import ReplyModal from "../Modals/ReplyModal";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import MobileReplyMenu from "../Navs/MobileReplyMenu";
import PleaseLogin from "../Modals/PleaseLogin";
import MobileLogin from "../Modals/MobileLogin";

class SinglePost extends React.Component {
  state = {
    postId: null,
    reply: "",
    post: null,
    comments: null,
    replyModalOpen: false,
    reportModalOpen: false,
    mobileReplyOpen: false,
    mobileLoginOpen: false,
    pleaseLoginOpen: false,
    alreadyReported: false,
    clickedComment: null,
    isLiked: false,
    user: null,
    width: window.innerWidth,
  };

  constructor(props) {
    super(props);
    const postId = sessionStorage.getItem("postId");
    if (!postId) {
      window.location = "/forum";
      return;
    }
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    window.addEventListener("resize", this.handleWindowSizeChange);

    const postId = sessionStorage.getItem("postId");
    console.log(postId);
    this.setState({ postId: postId });
    if (!postId) {
      return;
    } else {
      try {
        const jwt = localStorage.getItem("token");
        const user = decodeToken(jwt);
        this.setState({ user: user });
      } catch (ex) {
        this.setState({ user: null });
        const jwt = localStorage.getItem("token");

        console.log("no user", jwt);
      }
      try {
        const { data } = await axios.get(config + "/api/posts/single", {
          params: {
            _id: postId,
          },
        });
        this.setState({ post: data });
      } catch (error) {
        console.log("Couldn't reach the server", error);
      }
      try {
        console.log(postId);
        let searchParam = { parentPost: `${postId}` };
        const { data: comments } = await axios.post(
          config + "/api/comments/get",
          searchParam
        );

        const hashTable = Object.create(null);
        comments.forEach(
          (comment) => (hashTable[comment._id] = { ...comment })
        );
        const dataTree = [];
        comments.forEach((comment) => {
          if (comment.parentComment)
            hashTable[comment.parentComment].children.push(
              hashTable[comment._id]
            );
          else dataTree.push(hashTable[comment._id]);
        });

        this.setState({ comments: dataTree });
      } catch (error) {
        console.log("catch block called", error);
      }
    }
  }

  logToken = () => {
    console.log(this.state);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
    window.removeEventListener("keypress", () => this.logToken());

    document.body.style.overflow = "scroll";
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

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
          width={this.state.width}
          handleMenu={this.openMobileReplyMenu}
        />
      );
    });
  };

  updatePost = async () => {
    const { data } = await axios.get(config + "/api/posts/single", {
      params: {
        _id: this.state.postId,
      },
    });
    console.log(data);
    this.setState({ post: data });
  };

  isLiked = () => {
    const { post } = this.state;
    if (!this.state.user) {
      return false;
    }
    const userID = this.state.user._id;
    let isAlreadyLiked = false;
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i]["_id"] === userID) {
        isAlreadyLiked = true;
      }
    }
    return isAlreadyLiked;
  };

  onLike = async () => {
    if (!this.state.user) {
      this.handlePleaseLogin();
      return;
    }
    let id = this.state.postId;
    const userID = this.state.user._id;
    const data = {
      _id: id,
      user: { ...this.state.user },
    };
    let post = this.state.post;
    let isAlreadyLiked = false;
    for (let i = 0; i < post.likes.length; i++) {
      if (post.likes[i]["_id"] === userID) {
        isAlreadyLiked = true;
      }
    }
    console.log(isAlreadyLiked);

    if (!isAlreadyLiked) {
      try {
        console.log("like try block called");
        const response = await axios.put(config + "/api/posts/like", data);
        console.log(response);
        this.updatePost();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        console.log("unlike try block called");
        const response = await axios.put(config + "/api/posts/unlike", data);
        console.log(response);
        this.updatePost();
      } catch (error) {
        console.log(error);
      }
    }
  };

  openReplyModal = () => {
    if (!this.state.user) {
      this.handlePleaseLogin();
      document.body.style.overflow = "scroll";
      return;
    }
    this.setState({ mobileReplyOpen: false });
    this.setState({ replyModalOpen: true });
    document.body.style.overflow = "hidden";
  };

  closeReplyModal = () => {
    this.setState({ clickedComment: null });
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
    const { post } = this.state;
    return (
      <React.Fragment>
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
        <ReplyModal
          closeModal={this.closeReplyModal}
          isOpen={this.state.replyModalOpen}
          comment={this.state.clickedComment}
          post={this.state.post}
          width={this.state.width}
          user={this.state.user}
        />
        <ReportModal
          closeModal={this.closeReportModal}
          isOpen={this.state.reportModalOpen}
          comment={this.state.clickedComment}
          reported={this.state.alreadyReported}
          post={this.state.post}
          width={this.state.width}
          user={this.state.user}
        />
        <MobileReplyMenu
          openReportModal={this.openReportModal}
          openReplyModal={this.openReplyModal}
          delete={this.updateDeletedComment}
          handlePleaseLogin={this.handlePleaseLogin}
          comment={this.state.clickedComment}
          open={this.state.mobileReplyOpen}
          close={this.closeMobileReplyMenu}
          user={this.state.user}
        />
        <TopMobileNavBar />
        <div className={styles.postsSpacer}>
          <div className="posts-div">
            <div
              className={styles.viewedPostWrapper}
              onClick={() => this.setState({ pleaseLoginOpen: false })}
            >
              {this.state.comments && this.state.post && (
                <React.Fragment>
                  <div className={styles.viewedPost}>
                    <h3 className={styles.viewedPostTitle}>{post.title}</h3>
                    <p className={styles.viewedPostUser}>
                      posted by {this.state.width < 800 && <br />}
                      {post.username[1]}
                    </p>
                    <p className={styles.viewedPostBody}>{post.body}</p>
                    <p className={styles.viewedPostLikes}>
                      {post.likes.length.toString() +
                        (post.likes.length === 1
                          ? " person liked this"
                          : " people liked this")}
                    </p>
                    <div className={styles.viewedPostTime}>
                      <DateComponent time={post.timePosted} />
                    </div>
                    <div className={styles.viewedPostReplyDiv}>
                      <div
                        className={styles.likesHeart}
                        onClick={(event) => event.stopPropagation()}
                      >
                        {this.isLiked() ? (
                          <FaHeart
                            className={styles.heartIcon}
                            onClick={() => this.onLike()}
                          />
                        ) : (
                          <FaRegHeart
                            className={styles.heartIcon}
                            onClick={() => this.onLike()}
                          />
                        )}
                      </div>
                      <div
                        className={styles.postReplyHolder}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button
                          type="submit"
                          className={styles.postReplyButton}
                          onClick={() => this.openReplyModal()}
                        >
                          Reply
                        </button>
                      </div>
                      <div
                        className={styles.postReportHolder}
                        onClick={(event) => event.stopPropagation()}
                      >
                        <small
                          className={styles.report}
                          id="post-report"
                          onClick={() => this.openReportModal()}
                        >
                          report
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className={styles.commentWrapper}>
                    {this.renderCommentsInListGroup()}
                  </div>
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
