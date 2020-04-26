# Project 2

Web Programming with Python and JavaScript

Building a chat application with socket.io.

The first step was to build the index.html. As this is a single page application, everything takes place on one page simultaneously.
The page is divided into four sections.The first section contains a text for with id 'displayname'.The value entered into this displayName form is stored in a javascript localstorage variable.There is also an option to logout incase the name entered is wrong (personal touch).If no name is entered, displayname is set to 'anonymous (personal touch).

The second section contains a text for for channelname.This is connected to a socket event.Onload of page, a socket event is done 
such that all the existing values in the 'channels' dictionary in the app.py is displayed.Then, onsubmit of channelname form, another socket event is sent so as to add to the 'channels' dictionary and to update the list (all happening in real time!)

The third section has a list displaying all the channels in real time.

The fourth section is a bootstrap jumbotron which will have all the messaging features and message view. (with message delete and emojis as personal touch).

App.py has the global variables and socket end set.

