# HTML-camera React & Express

## The project

A fullstack web app working with the html getusermedia-method in React, using canvas for capturing a frame of the web-or mobile camera, sending it to the backend, converting it to pdf and sending the pdf as attachment via mail. This feature was part of a coding challenge.


## Installation instructions
to clone and run the project

* $ git clone https://github.com/MattStaudinger/html5_camera-react-express.git
* $ cd html5-camera-test
* $ npm install
* $ cd server
* $ touch .env
* necessary enviromental-variables in the .env-file:
 
    PORT
    
    GMAIL_MAIL (the mail from where the pdf will be sent)
    
    GMAIL_PW (the password of the mail-account)
    
    MAILTO (the mailadress which receives the pdf)
    



## Improvement Ideas for the future
* Making the canvas (which captures the picture) and the pdf conversion more precise in terms of pixels and camera-settings for the best outcome
* Automatical testing of sending mail
* Automatical testing of capturing and sending image to server and the conversion to pdf
