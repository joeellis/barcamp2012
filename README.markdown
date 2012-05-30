WELCOME TO BARCAMPNOLA 2012 WEBSITE
=============

Hello, and thank you for possibly thinking about contributing to our BarCampNOLA 2012 website.  


The Goal (in order)
-------------

1. Try and get people who normally keep to themselves to come out and help contribute to a singular project.  

2. To see new faces around the New Orleans tech circles and make some connections.

3. Use a lot of dinosaurs and video game text for seemingly no reason.


Rules
-----

  - Keep your racism / pornography / racy stuff to yourself
  - The site must not be slow to run / load
  - Anything added to the site must not immediately interfere
    with the BarCampNOLA event info on load (if someone triggers an event that does so though, it's ok)


Questions
---------

**Q: How do I set this thing up on development?**

This app is the absolute most basic ruby app that I could make, but it is in fact a Ruby app.
If you know Ruby, then all you need to do is run the following:

  gem install bundler
  bundle install
  rackup

Then just go to `localhost:9292` and you should see the site up and in action.


### What if I don't have Ruby installed?

No problem, come see Joe Ellis at Hack Night on Tuesdays at 7pm at Launchpad and I will help you get setup.  It's not terribly difficult, but much easier than writing it out.

**Q: What's the best way to submit a contribution?**

Please use this repro and submit all contributions on a separate branch via Github's Pull Request feature.
If you have no idea what this means at all, then come see me, Joe Ellis, at Hack Night on Tuesdays at 7pm at Launchpad and I will help you through it.


**Q: How can I contribute to the design?**

Under `/src`, we have the main `building.psd` file that you can use a a template to help add to the design of the building / surrounding area.
To contribute please make your design ON A SEPARATE LAYER and email the psd file to `joe@joeellis.la` wherein myself or another contributer will make sure it gets added into the main building layer.
This may sound ridiculous but as git cannot merge images nicely, this way makes sure no one's work gets overwritten.
