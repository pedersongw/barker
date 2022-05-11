import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopMobileNavBar.module.css";

class TopMobileNavBar extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.link} id={styles.nav1}>
          {this.props.page === "home" ? (
            <Link to="/" onClick={() => console.log("already on that page")}>
              Home
            </Link>
          ) : (
            <Link to="/">Home</Link>
          )}
        </div>
        <div className={styles.link} id={styles.nav2}>
          {this.props.page === "donate" ? (
            <Link
              to="/donate"
              onClick={() => console.log("already on that page")}
            >
              Donate
            </Link>
          ) : (
            <Link to="/donate">Donate</Link>
          )}
        </div>
        <div className={styles.link} id={styles.nav3}>
          {this.props.page === "contact" ? (
            <Link
              to="/contact"
              onClick={() => console.log("already on that page")}
            >
              Contact
            </Link>
          ) : (
            <Link to="/contact">Contact</Link>
          )}
        </div>
        <div className={styles.link} id={styles.nav4}>
          <Link to="/forum/1/all">Forum</Link>
        </div>
      </div>
    );
  }
}

export default TopMobileNavBar;
