# Margaret Hamilton!

## Getting started:
1. run "npm start" to start the server.
2. run "node seed" to seed the database.

## Login/Signup
Both server-side routes and client-side views are protected by required authentication. You will have to sign up before you can access the rest of the project!
1. Signing up will automatically log you in. Fun extra: your password will be hashed using bcrypt-nodejs! Check out the code in ./db/models/user.js and ./server/api/users.js.
2. Logging out will clear client-side state. Only login/signup components will be viewable.
3. All campus/student API routes return 401 unless user is signed in.

## Functionality
- All spec functionality is implemented.

