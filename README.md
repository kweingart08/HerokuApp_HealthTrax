# HealthTRAX
  HealthTRAX is an app that was created to be able to store all of your doctors information in one place. Every doctor seems to have their own website that you need to go to and log-in to be able to see who your doctor is, when you saw them last, and what their contact information in. This is great if you want all of the details of all of your appointments, but sometimes all you need is a simple reminder of when you saw your doctor last, and when you should see them again as well as their simple contact information.

  This app creates a solution to that problem. Here a user can register and log in and begin adding their doctors. This allows them to add both doctors and dentists all in one site. It creates a doctor show page that will show the user all the important information including the doctor's contact information, when they last visited, the URL to visit for more information and any notes.   
## Getting Started
  The information below will present any installations needed, and tell you what technologies were used to create the application.
### Installation Instructions
  To Use the Site:

    Google Chrome - [https://www.google.com/chrome/?brand=CHBD&gclid=CjwKCAjwma3ZBRBwEiwA-CsblPyvpR22B4RBmScNdFsqzR9hq_NR4nT8yE9sKUWpPhPRTU6JPPvV-RoCpfMQAvD_BwE&gclsrc=aw.ds&dclid=CNiA3IWs5dsCFQ4EaQodm50Pyw]

### Technologies Used
  Technologies Used While Building the App:

    Atom:
      - CSS
      - Javascript
      - Node.Js
      - Mongoose
      - express
      - EJS

    Heroku:
      - Heroku was used to deploy the app online.


### Details on the App:
  The App consists of an MVC framework:
  - Models:
    - Doctors - There is a doctor model schema used to create the different doctors in the database.  
    - Users - There is a user model schema used to create the different users for the database.
  - Views:
    - There are multiple views that were created for the different routes that are taken while using the app. The main view is the index view or the homepage of the website.
    - The views are divided into different directories (users, sessions, partials).
      - The user views consists of the different views coming from the users routes.
      - The sessions views consists of the different views coming from the sessions routes.
      - Partials were  used for the head and the navigation bar to more easily use the same head and nav parts for all of the views.
    - Controllers:
      - Sessions - The sessions controller connects the models and the views for all of the routes that a logged in user would take.
      - Users - The users controller connects the models and the views for all of the routes that someone would take when registering to be a user.

    The App uses the 7 RESTful routes for basic operations and for reading and manipulating the collection of data.

    The routes below can be found in the sessions controller:
    Index  : GET    '/'                                    1/7
    Show   : GET    '/sessions/user/:id'                   2/7(user)
    Show   : GET    '/sessions/doctor/:userid/:doctorid'   2/7(doctor)
    New    : GET    '/sessions/new'                        3/7(user)
    New    : GET    '/sessions/user/:id/newdoctor'         3/7(doctor)
    Create : POST   '/sessions'                            4/7(user)
    Create : POST   '/sessions/user/:id/newdoctor'         4/7(doctor)
    Edit   : GET    '/sessions/:userid/:doctorid/edit'     5/7(doctor)
    Update : PUT    '/sessions/:userid/:doctorid'          6/7(doctor)
    Delete : DELETE '/sessions'                            7/7(user)
    Delete : DELETE '/sessions/doctor/:userid/:doctorid'   7/7(doctor)

    The routes below can be found in the users controller:
    New: GET  "/users/new"
    Create: POST "/users"

## Development
  These development notes will describe the approach that was taken when building the application as well as some of the unsolved problems.

### Approach Taken
  - As stated within the technology section, this is a full-stack application built using node.js, mongoose, express, and ejs. It using the MVC file structure and includes a sessions model with all 7 RESTful routes and full CRUD(Create, Read, Update, Delete).
  - This app was created one route at a time and one view at a time walking through the different options and flow that a user would go through.

  - The user flow for this app:
    - User is sent to the homepage at the beginning. Options are to register or to log in.
    - User registers and is automatically logged in.
    - User can either log out or add a doctor.
    - If the user adds a doctor, they are directed to a form to complete.
    - The added doctor is rendered on the users index page.
    - In order to see all of the doctor details, the user clicks "view details" on the doctors div button. This new rendered view gives the option to edit the details.
    - Doctors can be deleted from the users index page.
    - User logs out until next time :)

### Unsolved Problems / Additional Items Not Added
  Some additional items that I would like to add to the app:

  - Create an archive button to archive any old doctors that are no longer being seen by that user.
  - Create an archive of information/dates visited for the doctor. So when someone edits the dates or notes, the old data is pushed to an archive database for that user under that doctor.
  - Add a search function from the users index route so that they can search for doctors that are within the database and add them to their doctors array.
  - Add a users setting tab so that the user can go in and update their username and password and possibly add additional information.

  Items that were not solved:

  - Right now, if the doctor is edited from the user's page, the doctor is also edited in the database. These should be separated, and the user based data (appointment dates and notes) should within the users model. Then the doctor's model would only include the doctor's contact information.
  - Mobile nav links - tried to create hamburger and roll down links, but didn't complete that.
## Link to Live Site
  Here is the link to the live site so you can use the app!
  [https://thawing-reef-79440.herokuapp.com/]
