import React from "react";

export default class NewUserModal extends React.Component {
  render() {
    return (
      <div>
        <div className="modal">
          <div className="modal-content" id="user-modal-content">
            <div className="modal-header">
              <span
                className="close"
                onClick={() => this.props.closeUserModal()}
              >
                &times;
              </span>
              <h2>Create New User</h2>
            </div>
            <div className="modal-body">
              <form className="form">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-input"
                  id="username"
                  name="username"
                  placeholder="username"
                  onChange={(event) => this.props.onEmailChange(event)}
                ></input>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-input"
                  id="password"
                  name="password"
                  placeholder="password"
                  onChange={(event) => this.props.onPasswordChange(event)}
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
