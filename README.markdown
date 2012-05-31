WELCOME TO BARCAMPNOLA 2012 WEBSITE
=============

Hello, and thank you for possibly thinking about contributing to our BarCampNOLA 2012 website.  The whole goal of this project is to try and get people to contribute to a larger project so they can feel happy and proud of themselves that they made something great.  The other goal is to use a lot of dinosaurs and video game text for seemingly no reason.

Rules
-------------
- Keep your racism / sexism / infantilism / pornography / racy stuff to yourself.  If you aren't sure whether or not something should be added in, it means it shouldn't be added in.  Just use good judgement! 
- The site must not be slow to run / load
- Anything added to the site must not immediately interfere with the BarCampNOLA event info on load (if someone triggers an event that does so though, it's ok)


Questions
-------------

### How do I set this thing up on development?

The app runs in production on Ruby, but can be run straight from the filesystem. Just open public/index.html.

#### HTML

To make changes to the HTML, just edit `public/index.html`.

#### Stylesheets

To make changes to the styles, edit `public/css/styles.scss` and re-compile the stylesheet using [SASS](http://sass-lang.com/). We'd love a contribution for how to do this on windows.

#### Javascript

To edit javascript, just edit what's in public. Boom!

#### Is there a way to access each window on the building?

There is a grid of absolutely positioned divs that overlay each window. There are 22 rows, and 7 columns. To set the contents of a window pane, put your HTML element inside the ```windowPanes``` div, and set the ```data-pane-id``` to ```pane-x-y``` based on the row and column index of the pane, like so:
```html
<div id="paneContents">
  <div id="helloWorld" data-pane-id="pane-0-6">
    Hello,<br/>World!
  </div>
</div>
```
In this case, the Javascript will scoop up the ```helloWorld``` element and stuff it into the window pane element that is in the first row and seventh column.

#### I can do the Rubies

Then you can `rackup config.ru`, can't you? Visit localhost:9292 to join in the fun.

### What's the best way to submit a contribution?

Please use this repro and submit all contributions on a separate branch via Github's Pull Request feature.  If you have no idea what this means at all, then come see me, Joe Ellis, at Hack Night on Tuesdays at 7pm at Launchpad and I will help you through it.

### How can I contribute to the design?

Under /src, we have the main building.psd file that you can use a a template to help add to the design of the building / surrounding area.  To contribute, please make your design ON A SEPARATE LAYER, and email the psd file to joe@joeellis.la , wherein myself or another contributer will make sure it gets added into the main building layer.  This may sound ridiculous but as git cannot merge images nicely, this way makes sure no one's work gets overwritten.

### 
