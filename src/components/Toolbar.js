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
    return (
      <div className="toolbar">
        <Link to="/melody">List of melodies</Link>
        {!this.props.user && <Link to="/signup">Sign up</Link>}

        {this.props.user && <Link to="/account/">{this.props.user.name}</Link>}

        {!this.props.user && <Link to="/login">Log in</Link>}

        {this.props.user && <span onClick={this.handleClick}>Log out</span>}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Toolbar);
