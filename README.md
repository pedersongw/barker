  This project is a full-stack web app for a dogpark featuring a post/comment based community forum. Its ReactJS front-end is served from within an Express/Node.js back-end, and uses MongoDB atlas as a cloud database.


  The web app takes advantage of:
  
    -separate CSS modules and components to compartmentalize components with their related CSS styles
    -separate mobile and desktop versions
    -React Router to provide a multi-page experience from within an inherently single-page app
    -user authentication and permissions
    -password encryption
    -an admin page for user content review
    -Nodemailer for email capability
    -object validation with Joi for Node.js
    
  
  
  The Home page is the landing page for the web app, and consists of simple descriptive elements and images styled with CSS grid.
  
  The Donate page features a four panel infinite carousel with rotating images on each panel. This is accomplished entirely with CSS and javascript. Users can use directional arrow icons on either side of the viewport to navigate the panels, while the images rotate without user interaction.
  
  
  The Contact page uses a simple form and the Nodemailer library to send emails when a user submits the form.
  
  The Forum page is the crown jewel of the project. It provides a conversational space for the community where users can post content, sort posts by certain criteria, and reply to posts. Replies can be endlessly nested and are recursively populated and sorted. 
  
  The Forum page uses:
  
    -a form where users can log in or sign up
    -user permissions for interactivity with content when user is signed in
    -initial authentication email with Nodemailer requiring users to click a link to activate their account
    -form validation with Joi for Node.js
    -collapsible menu for Forum specific actions
    -pagination of posts
    -sorting of posts using certain criteria
    -endlessly nested comments using recursion
    -a like feature for posts
    -reply and report features for posts and comments
    -a separate admin page for reviewing and deleting reported comments
    
  Future versions of this project will take advantage of react-spring for smoother physics based animations, postgreSQL database instead of the current NoSQL database, and an more seamless visual design.
