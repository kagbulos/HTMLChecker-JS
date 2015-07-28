Documentation for Javascript HTML Checker
---------------------------

Contact
-------
Email:kagbulos1@gmail.com

Date
----
7/27/15

Description
-----------
This is a singlepage Javascript application that checks if a HTML file adheres to the Udacity style guidelines (http://udacity.github.io/frontend-nanodegree-styleguide/). When the application finds an error, the error is printed on the same line as the error. A comprehensive sample file (index.html in the folder labeled test html) is provided in the repository and can be used with the application to see what errors are found as well as the format of the output.

How to use
-----------
To run the application, open up index.html
Click the choose file button and select the HTML file you wish you check

Installion
----------
Pull the project from github and find index.html

Additional Notes
----------------
There are some cases which I cannot solve within the style guide because of the time it would take to implement. For instance, there is a case are cases where the user could use illegal
tags that I dont know about any my program wouldn't mark them as incorrect. Additionally, there are things like the semantics section of the style guide which could be improved within
my program because I am not sure of all the variations of good semantics (<a href="recommendations/">All recommendations</a>) vs bad semantics (<div onclick="goToRecommendations();">All recommendations</div>).

Prospective Changes
-------------------
-Add bootstrap and other required technologies such as offline.js in order to make this more professional
-Potentially incorporate Knockout and implement a MVVM model
-Change the CSS to make it more aesthetically pleasing
