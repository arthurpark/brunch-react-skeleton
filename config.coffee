path = (paths) ->
  # (\\/|\\\\) is (\|/), windows or unix-style directory separators
  paths.join && paths = paths.join('|')
  paths = paths.replace(/\//g, '(\\/|\\\\)')
  new RegExp('^' + paths)

exports.config =
  # conventions:
  #   assets: path('app/assets')

  modules2:
    definition: false
    wrapper: false

  paths:
    public: 'public'

  files:
    javascripts:
      joinTo:
        'js/vendor.js': /^vendor|bower_components/
        'js/app.js': /^app/
      order:
        before: [
          "bower_components/react/react-with-addons.js",
          "bower_components/react-async/react-async.js",
          "bower_components/react-router-component-bower/react-router-component.js"
        ]

    stylesheets:
      joinTo:
        'css/app.css': /^(app|vendor|bower_components)/

  plugins:
    react:
      autoIncludeCommentBlock: yes
      harmony: yes
