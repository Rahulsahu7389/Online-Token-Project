# Online-Token-Project
This repository is used by the team NULL ptr in the hackathon Hack-with-Gujarat(2025)

Teammates-

RAHUL SAHU

SHOURYA SINHA

AKSHAT SHARMA


*QTrack - Smart Queue Management System*
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
and since for this project we were using trial version of twilio, sms will be sent only to number which are already registered in twilio website!

3.now go to frontend folder and use command to run the frontend server --> npm run dev

4.now with the new terminal go to the backened folder and use the command to run the backened server --> nodemon index.js




*Purpose and Working of the site:-*

 Purpose: 
QTrack helps users avoid long physical queues by allowing them to book tokens, track their position in real-time, and receive SMS alerts when it's their turn.

Key Features
 1. Token Generation 

Users book tokens online with name and phone number.

 2. Real-Time Queue Tracking 

Users can view their live queue status and estimated wait time.

 3. Admin Dashboard 
Admins manage tokens: mark as serving, skipped, or completed.

 4. SMS Notifications (via Twilio API) 
Users get SMS updates.

5. Service Categories
Different queues for services like General, Priority, etc.

* How It Works (Tech Stack: MERN + Twilio)

 1. Frontend (React) 
User: Book & track token
Admin: Manage tokens

 2. Backend (Node.js + Express) 
API handles token logic and SMS triggers

3. Database (MongoDB) 
Stores tokens, user details, queue status

 4. SMS API (Twilio) 
Sends real-time alerts on token updates


