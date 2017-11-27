const ButtonFile = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    onFileSelected: React.PropTypes.func,
    id: React.PropTypes.string,
  },

  render: function() {
    return React.DOM.div({
      className: "button-file",
    }, [
      React.DOM.input({
        id: this.props.id,
        type: "file",
        onChange: this.handleClick,
      }),
      React.DOM.label({
          for: this.props.id,
        },
        this.props.title
      ),
    ]);
  },

  handleClick: async function(event) {
    event.stopPropagation();
    try {
      let files = event.target.files;
      if ( files.length === 0 ){
        return "No file selected..."
      }
      const jsonContent = await StorageManager.File.readJsonFile(files[0]);
      console.log(jsonContent);
      this.props.onFileSelected(jsonContent);
    } catch ( e ){
      let msg = "ButtonFile.handleClick failed: " + e;
      console.error(msg);
      return msg;
    }
  }

});
