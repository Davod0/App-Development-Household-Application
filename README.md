# Household Management Application

This is a household management app built with React Native, Expo, and TypeScript.
The project uses Redux with redux-thunk to manage asynchronous operations like API requests. Continuous Integration (CI) is handled through GitHub Actions, which run tests and build the app to ensure everything works correctly before merging pull requests. It also
includes a custom logo and app icon.
It uses Firebase as the backend service but is not currently deployed.

Users can sign up or log in, create or join households using a code and manage their membership. Household owners can review and approve join requests, assign and manage chores, while all members can track and complete them.

Each user has a profile with a unique avatar, name and customizable theme settings, and can switch between multiple households.
Chores are displayed in a daily overview that shows who completed them, when they were last done, and whether they are overdue.
The app also includes statistics on chore distribution across members, with both weekly and monthly breakdowns.




## Build and Run the Application

To run the app, clone it and run `npm install` in the terminal, then start it with `npm start`.
You also have to connect it to your own Firebase project by replacing the config in `firebase.ts` with your own configuration.





