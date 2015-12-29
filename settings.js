module.exports = {
  "Name": "IonView",
  "Description": "Ion view",
  "Repository": "git@bitbucket.org:ionicreact/ion-view.git",
  "AtomicDeps": [
    {
      "Name": "Layout",
      "Description": "Layout",
      "Author": "Jason Villalon",
      "Repository": "git@bitbucket.org:generator-react-component/ac-layout.git",
      "cssVariables": {
        "$baseline-grid": "8px",
        "$layout-breakpoint-sm": "600px",
        "$layout-breakpoint-md": "960px",
        "$layout-breakpoint-lg": "1200px",
        "$layout-gutter-width": "$baseline-grid * 2"
      }
    },
    {
      "Name": "WindowResize",
      "Description": "Window resize",
      "Author": "Jason Villalon",
      "Repository": "git@bitbucket.org:generator-react-component/windowresize.git"
    }
  ]
};
