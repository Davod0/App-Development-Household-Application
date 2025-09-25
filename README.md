# Household Management Application

This is a household management app built with React Native, Expo and TypeScript.
The project uses Redux with redux-thunk to manage asynchronous operations like API requests. Continuous Integration (CI) is handled through GitHub Actions, which run tests and build the app to ensure everything works correctly before merging pull requests. It also
includes a custom logo, splash screen, and app icon.
Firebase is used as the backend service, and the app is not hosted or deployed anywhere.

Users can sign in or create an account.
Users can also create or join households with a code and manage their membership.
Household owners can handle join requests and manage chores while all members can track and complete tasks.

Each user has a profile with a unique avatar, name and theme settings and can switch between multiple households. Chores are listed in a daily overview showing who did what, when it was last done, and if it’s overdue. The app also provides statistics on chore distribution across members with weekly and monthly breakdowns.



## Build and Run the Application

To run the app, clone it and run `npm install` in the terminal, then start it with `npm start`.
You also have to connect it to your own Firebase project by replacing the config in `firebase.ts` with your own configuration.





