import React from "react";

export default class PostModal extends React.Component {
  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-content" id="post-modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => this.props.closePostModal()}
              >
                &times;
              </span>
              <h2>Create New Post</h2>
            </div>
            <div className="modal-body">
              <form className="form">
                <label htmlFor="title" className="label">
                  title
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="title"
                  name="title"
                  placeholder="title"
                  onChange={(event) => this.props.onTitleChange(event)}
                ></input>
                <label htmlFor="body" className="label">
                  body
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="body"
                  name="body"
                  placeholder="body"
                  onChange={(event) => this.props.onBodyChange(event)}
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
