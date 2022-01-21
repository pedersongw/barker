import React, { Component } from "react";

class ReplyModal extends React.Component {
  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-content" id="reply-modal-content">
            <div className="modal-header">
              <span className="close" onClick={() => this.props.closeModal()}>
                &times;
              </span>
              <h2>Reply</h2>
            </div>
            <div className="modal-body">
              <form className="form">
                <label htmlFor="body" className="label">
                  {this.props.comment.body}
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="body"
                  name="body"
                  placeholder="reply"
                ></input>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" onClick={() => this.props.onSubmit()}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReplyModal;
