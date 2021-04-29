# ClothManager

This is a Cloth Management API made with Node.js + Express.js + MongoDB. This API contains all the functionality like Login And Registration with roles and permission , CRUD on Clothes with image upload , Clothes can be shared with other users and many more.

My Approach : 

I started with the very basic setup by connecting the server to the mongoDB Cluster and making it up and running. then i started designing my users and cloth Data Model by using Mongoose Schema and Models after i was done with that i switched to implement Authentication routes that is /signin and /signup routes. In the /signin route i used the jsonwebtoken module to check user is authentic or not.
with this done i started doing /cloths routes and implemented CRUD functionality. A logedIn user can retrive his or her cloths and also can do CRUD Operation on it unless he is Admin. next i implemented the Auth Middleware and based upon the token i retrive the user data and passed them to the protected routes.I created another /share route that can set the isShared boolean to true in the cloth data model and based upon this boolean the cloth will be displayed as the shared cloths.
