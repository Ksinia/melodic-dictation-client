import React, { Component } from "react";

class DictationInfoContainer extends Component {
  melodyId = this.props.match.params.id;

  componentDidMount() {
    this.props.dispatch;
  }

  render() {
    return <div>Info about previous tries with this melody for this user</div>;
  }
}

const mapStateToProps = state => ({
  dictation: state.dictation
});

export default connect(mapStateToProps)(DictationInfoContainer);
