# @cjsx React.DOM

Page = require("components/Page")

App = React.createClass({
  displayName: "App",
  render: ->
    return (
      <Page />
    )
})

React.render(<App />, document.body);
