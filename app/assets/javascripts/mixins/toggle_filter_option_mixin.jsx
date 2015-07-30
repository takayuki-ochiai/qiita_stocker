var ToggleFilterOption = {
  getInitialState() {
    return {
      isRevealed: true
    }
  },
  toggleFilterOption(){
    this.setState({
      isRevealed: !this.state.isRevealed
    });
  }
};

module.exports = ToggleFilterOption;
