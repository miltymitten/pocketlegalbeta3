# pocketlegalbeta3
All of our project files and code can be found in our GitHub repository: https://github.com/miltymitten/pocketlegalbeta3. These files can be downloaded, and the next series of instructions below can be used to run the web application locally. 

While our working demo can be found running at https://pocketlegal.herokuapp.com/ , here are a series of instructions to run the working files through an integrated development environment (IDE) like Visual Studio Code.

1. After downloading Visual Studio Code on your computer, and our working file. Right click on the file and select the ‘Open with Visual Studio Open.
2. With Visual Studio Open, using the top menu bar, select Terminal then ‘New Terminal’.
3. The new Terminal will open from within Visual Studio. Make the user the correct path the working files exist, where ‘\pocketlegalbeta3’ happens to be the end of the working path.
4. If this is your first time using the Node.js library, type ‘npm install’. Otherwise, type, ‘npm start’  
5. The terminal will run any necessary files required to run the application locally, before an internet browser window opens with the application. 

A few notes:
- The folder structures should not be changed. Currently, the backend exists in the root folder and the frontend exists in the "frontend" folder. Changing this structure in any way will cause the app to crash because some files depend on this structure. If this needs to be changed, make changes to path references throughout the app.
- There is a script in package.json in the root folder (i.e. package.json for the backend) that is essential to the app's deployment on Heroku. The script that starts with "heroku-postbuild" is what installs the necessary dependencies and runs the frontend of the app after Heroku initially runs the backend. 
- I had to locally run `npm build` while inside the frontend for the folder called "build" to be created. From what I understand, this is essential to getting the app to deploy successfully on Heroku.
