import React from "react";
import axios from "axios";
import { config } from "../../URLs.jsx";
import { isExpired, decodeToken } from "react-jwt";
import Post from "./Post";
import PostModal from "../Modals/PostModal";
import TopMobileNavBar from "../Navs/TopMobileNavBar";
import ForumMobileNav from "../Navs/MobileNav";
import Pagination from "../Utilities/Pagination";
import ForumDesktopNav from "../Navs/DesktopNav";
import MobileLogin from "../Modals/MobileLogin";
import DesktopLogin from "./DesktopLogin";
import { FaSpinner } from "react-icons/fa";
import styles from "./Forum.module.css";

class Forum extends React.Component {
  state = {
    entries: [],
    entriesDisplayed: false,
    comments: [],
    width: window.innerWidth,
    dbWasContacted: false,
    postModalOpen: false,
    mobileLoginOpen: false,
    user: null,
    createModalError: "",
    currentPage: 1,
    sort: "old",
    pageSize: 5,
    numberOfPages: 0,
  };

  beforeUnload = () => {
    let sort = sessionStorage.getItem("sort");
    if (sort === "old") {
      return;
    } else {
      sessionStorage.removeItem("page");
      sessionStorage.removeItem("sort");
    }
  };

  async componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    window.addEventListener("keypress", () => console.log(this.state));
    window.onbeforeunload = this.beforeUnload;
    window.onpagehide = this.beforeUnload;
    let sessionPage = sessionStorage.getItem("page");
    if (sessionPage) {
      this.setState({ currentPage: sessionPage });
    }
    let sort = sessionStorage.getItem("sort");
    if (!sort) {
      sessionStorage.setItem("sort", "old");
    }
    window.addEventListener("keydown", () =>
      console.log(sessionStorage, this.state)
    );
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
      const { data: entries } = await axios.get(config + "/api/posts");
      if (entries.length > 0) {
        this.chunkifyEntries(entries);
        this.setState({ entries });
        this.setState({ dbWasContacted: true });
      } else if (entries.length === 0) {
        this.setState({ dbWasContacted: "empty" });
        console.log("Database empty");
      }
    } catch (error) {
      console.log("Couldn't reach the server", error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  isAdmin = () => {
    return this.state.user.isAdmin ? true : false;
  };

  updateEntriesFromDatabase = async () => {
    try {
      const { data: entries } = await axios.get(config + "/api/posts");
      console.log("updateEntriesFromDatabase called");
      this.chunkifyEntries(entries);
      this.setState({ comments: [] });
    } catch (error) {
      console.log("Couldn't reach the server", error);
    }
  };

  chunkifyEntries = (entries) => {
    let otherArr = [...entries];
    const res = [];
    while (otherArr.length > 0) {
      const chunk = otherArr.splice(0, this.state.pageSize);
      res.push(chunk);
    }
    let arrLength = res.reduce((acc, val) => acc.concat(val), []);
    this.setState({ numberOfPages: arrLength.length });
    this.setState({ entriesDisplayed: res });
  };

  displayMyPosts = () => {
    sessionStorage.setItem("sort", "my");
    sessionStorage.removeItem("page");
    this.setState({ currentPage: 1, sort: "my" });
    const unsorted = [...this.state.entries];
    const sorted = unsorted.filter(
      (entry) => entry.username[0]["_id"] === this.state.user["_id"]
    );
    this.chunkifyEntries(sorted);
  };

  displayPostsSortedByNew = () => {
    sessionStorage.setItem("sort", "new");
    sessionStorage.removeItem("page");
    this.setState({ currentPage: 1, sort: "new" });
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(b.timePosted) - new Date(a.timePosted);
    });
    this.chunkifyEntries(sortedEntries);
  };

  displayPostsSortedByOld = () => {
    sessionStorage.setItem("sort", "old");
    sessionStorage.removeItem("page");
    this.setState({ currentPage: 1, sort: "old" });
    const sortedEntries = this.state.entries.sort((a, b) => {
      return new Date(a.timePosted) - new Date(b.timePosted);
    });
    this.chunkifyEntries(sortedEntries);
  };

  displayPostsSortedByPopular = () => {
    sessionStorage.setItem("sort", "popular");
    sessionStorage.removeItem("page");
    this.setState({ currentPage: 1, sort: "popular" });
    const sortedEntries = this.state.entries.sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
    this.chunkifyEntries(sortedEntries);
  };

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  resetStateFormInfoHolders = () => {
    this.setState({
      createModalError: "",
      postTitle: "",
      postBody: "",
      userEmail: "",
      userPassword: "",
    });
  };
  openPostModal = () => {
    this.setState({ postModalOpen: true });
    this.resetStateFormInfoHolders();
  };

  closePostModal = () => {
    this.setState({ postModalOpen: false });
    this.resetStateFormInfoHolders();
  };

  serverStatus = () => {
    const { dbWasContacted, user } = this.state;
    const firstPart = user === null ? "Please log in" : `Welcome ${user.name}`;
    const secondPart =
      dbWasContacted === "empty" ? ", the database is empty" : "";
    if (!dbWasContacted) {
      return "Couldn't reach server";
    } else {
      return firstPart + secondPart;
    }
  };

  logOut = () => {
    localStorage.clear();
    this.setState({ user: null });
    window.location = "/forum";
  };

  renderPostsInListGroup = () => {
    if (this.state.entriesDisplayed.length < 1) {
      return <h2 className={styles.nothing}>No posts found</h2>;
    }

    return this.state.entriesDisplayed[this.state.currentPage - 1].map(
      (entry) => {
        return (
          <Post
            key={entry._id}
            id={entry._id}
            title={entry.title}
            body={entry.body}
            likes={entry.likes}
            timePosted={entry.timePosted}
            username={entry.username}
            onDelete={this.onDelete}
            onLike={this.onLike}
            userLoggedIn={this.state.user}
          />
        );
      }
    );
  };

  updateCurrentPage = (newPage) => {
    this.setState({ currentPage: newPage });
    sessionStorage.setItem("page", newPage);
    window.scrollTo(0, 0);
  };

  incrementPage = (num) => {
    this.setState({ currentPage: num });
  };

  year = () => {
    let date = new Date();
    return date.getFullYear().toString();
  };

  handleMobileLogin = () => {
    this.setState({
      mobileLoginOpen: !this.state.mobileLoginOpen,
    });
  };

  render() {
    const { currentPage, pageSize } = this.state;

    return (
      <div className={styles.wrapper}>
        <TopMobileNavBar page="forum" />
        {this.state.width > 800 ? (
          <div className={styles.desktopHeaderSpacer}></div>
        ) : (
          <div className={styles.MobileHeaderSpacer}></div>
        )}
        <header></header>
        <PostModal
          closeModal={this.closePostModal}
          isOpen={this.state.postModalOpen}
          value={this.state.postModalOpen}
          updateView={this.updateEntriesFromDatabase}
          width={this.state.width}
          user={this.state.user}
        />

        <div
          className={this.state.width < 800 ? styles.main : styles.mainLarge}
        >
          {this.state.width > 800 && this.state.user && (
            <ForumDesktopNav
              openPostModal={this.openPostModal}
              openUserModal={this.openUserModal}
              sortMyPosts={this.displayMyPosts}
              sortPopular={this.displayPostsSortedByPopular}
              sortByNew={this.displayPostsSortedByNew}
              sortByOld={this.displayPostsSortedByOld}
              logOut={this.logOut}
              userLoggedIn={this.state.user}
              user={this.state.user}
              updateView={this.updateEntriesFromDatabase}
              sort={this.state.sort}
              status={this.serverStatus}
            />
          )}
          {this.state.width > 800 && !this.state.user && <DesktopLogin />}

          {!this.state.entriesDisplayed && (
            <div className={styles.spinnerDiv}>
              <FaSpinner className={styles.spinner} />
            </div>
          )}
          {this.state.entriesDisplayed && (
            <div className={styles.postsDiv}>
              {this.renderPostsInListGroup()}
              <Pagination
                currentPage={Number(currentPage)}
                totalCount={Number(this.state.numberOfPages)}
                siblingCount={1}
                pageSize={pageSize}
                updateCurrentPage={this.updateCurrentPage}
                incrementPage={this.incrementPage}
                sort={this.state.sort}
              />
            </div>
          )}
          {this.state.width < 800 && (
            <div className={styles.mobileNav}>
              <ForumMobileNav
                openPostModal={this.openPostModal}
                openUserModal={this.openUserModal}
                sortByNew={this.displayPostsSortedByNew}
                sortByOld={this.displayPostsSortedByOld}
                sortMyPosts={this.displayMyPosts}
                sortByPopular={this.displayPostsSortedByPopular}
                updateView={this.updateEntriesFromDatabase}
                logOut={this.logOut}
                logIn={this.handleMobileLogin}
                userLoggedIn={this.state.user}
                sort={this.state.sort}
              />
              <MobileLogin
                isOpen={this.state.mobileLoginOpen}
                handle={this.handleMobileLogin}
                width={this.state.width}
              />
            </div>
          )}
        </div>
        <footer>
          <small className={styles.small}>
            © {this.year()} Barker Field Dog Park
          </small>
        </footer>
      </div>
    );
  }
}

export default Forum;
