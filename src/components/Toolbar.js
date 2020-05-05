import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../actions/authorization";
import "./Toolbar.css";

class Toolbar extends Component {
  handleClick = () => {
    const action = logOut();
    this.props.dispatch(action);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="toolbar">
        <Link to="/melody">List of melodies</Link>
        {!user && <Link to="/signup">Sign up</Link>}

        {user && <span>Welcome {user.name}!</span>}

        {!user && <Link to="/login">Log in</Link>}

        {this.props.user && (
          <span className="logout" onClick={this.handleClick}>
            Log out
          </span>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Toolbar);
