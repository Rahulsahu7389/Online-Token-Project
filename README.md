# Online-Token-Project
This repository is used by the team NULL ptr in the hackathon Hack-with-Gujarat(2025)

Teammates-

RAHUL SAHU

SHOURYA SINHA

AKSHAT SHARMA


*How to start the project :-*

1.firstly install the nodemon and npm in your system along with the mongo db with compass(used in this project) or you can use mongodb atlast.

2.make sure to make the .env file
including :
  PORT=8080
  MONGO_URI="mongodb://localhost:<port>/<database-name>" -- replace the <port> with your port of mongodb and <database-name> with the database name
  JWT_SECRET= -- you can keep it anything
  
  TWILIO_ACCOUNT_SID = 
  TWILIO_AUTH_TOKEN = 
  TWILIO_PHONE_NUMBER=
  
NOTE-for TWILIO_ACCOUNT_SID ,TWILIO_AUTH_TOKEN ,TWILIO_PHONE_NUMBER you have to login to the twilio's official website to get these details
and since for this project we were using trail version of twilio, sms will be sent only to number which are already registered in twilio website!


3.now go to frontend folder and use command to run the frontend server --> npm run dev

4.now with the new terminal go to the backened folder and use the command to run the backened server --> nodemon index.js


