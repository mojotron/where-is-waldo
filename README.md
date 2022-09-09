# A Photo Tagging App - Where is Waldo

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-where-s-waldo-a-photo-tagging-app) Curriculum.

Goal of project is to make game where user can choose a photograph with tons of stuff going on and they are meant to locate several familiar characters.

[Play Where is Waldo](https://mojotron.github.io/where-is-waldo/). Try out and end result of the project.

## Part 1 Admin Dashboard (not for users eyes)

From the start of the project I wanted to make a admin page(dashboard) to make creating a new game level easy, in couple of clicks. Here I have hit first roadblock with react router protected route and authentication context. Had to learn those concepts first. Great resource for understanding this is [Shaun | TheNetNinja](https://www.youtube.com/TheNetNinja) tutorial [Build Web Apps with React & Firebase](https://www.udemy.com/course/build-web-apps-with-react-firebase/).

Dashboard have a simple functions, to upload level image, to upload character icon image and to create a level. Creating level have four steps. Simulating simple html form. Add level name, choose level image. Display that image and put OverlayGrid component over image. Select coordinates on the image to create target(tag). Final step is creating firebase document with all information about level.

Target rectangle and OverlayGrid component, first version was to make grid of little squares. With this approach making tags was more complicated then it should be. When target is spanning over multiple squares, there was need for array to store all squares on which target is displayed. This made level document complex. Second problem is performance issues with creating all square element. After this I moved from squares to simple math. Creating tag is simple two click on the grid, making rectangle with top left and bottom right coordinates. With this approach there is no need for complex level data. Checking if user have found tag is simple if checks, is click inside target rectangle.

Getting coords from clicking on the OverlayGrid is in percentages, for easier communication between grid used in creating level and grid when playing level.

## Part 2 User Interface and game app

UI is simple, on initial page load app sends request to get all levels data. After getting data display levels as card, showing level name, image thumbnail amd all targets user must find to complete level.
Selecting level game starts, when user finds all targets winning message pop up with game time.
To select target after finding it, click on target and popup window will show with all targets left to find.

Targets popup are calculating position on grid using parent ref to get width/height and self width/height. Goal of this calculation to keep popup not spilling of level grid.

## Part 3 testing app

Initial goal was to go with TDD approach but i lost my way when need for mocking firebase come along.
Test will be added and project refactored as my testing learning continues.

## what have I learned?

- React context and useContext hook for providing firebase authentication
- Better understatement of useRef, useEffect, and useReducer hooks
