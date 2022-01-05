import React from "react";
import { FaWrench } from "react-icons/fa";

class ForumNavIcon extends React.Component {
  state = {
    isHoveredOrTouched: false,
  };

  render() {
    return (
      <div
        className="forum-nav-icon"
        id={this.state.isHoveredOrTouched ? "forum-nav-icon-hovered" : null}
        onClick={() => console.log("forum nav icon clicked")}
        onMouseOver={() =>
          this.setState({ isHoveredOrTouched: !this.state.isHoveredOrTouched })
        }
        onMouseOut={() =>
          this.setState({ isHoveredOrTouched: !this.state.isHoveredOrTouched })
        }
        onTouchStart={() =>
          this.setState({ isHoveredOrTouched: !this.state.isHoveredOrTouched })
        }
        onTouchEnd={() =>
          this.setState({ isHoveredOrTouched: !this.state.isHoveredOrTouched })
        }
      >
        <FaWrench />
      </div>
    );
  }
}

export default ForumNavIcon;
