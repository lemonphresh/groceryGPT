This project is deployed on [Vercel](https://vercel.com) at [this location](https://grocery-gpt.vercel.app/).

## Get Started

Run `npm i`.

This project is closely tied with [the project that contains the server](https://github.com/lemonphresh/groceryGPT_server). Head over there and get that running first. 

You're gonna wanna generate your own [OpenAI](https://openai.com/) API key because I'm too poor to have a team one. You may have already done this if you followed my direct instructions by going and setting up the server project before carrying on with this one. If you haven't, how dare you. (It's fine, but you won't be able to do anything cool yet once you get this up and running.)

When you have generated your own OpenAI API key, run `echo 'REACT_APP_OPENAI_API_KEY=[your_api_key]' > .env` in the root of the directory. 

You'll also want to run `echo 'REACT_APP_SERVER_URL=http://localhost:5000' >> .env` after that.

Carry on to the next steps.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the front end in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm start server`

Runs the server in development mode.
The server runs on [http://localhost:5000](http://localhost:5000).

We may or may not extract this into a separate repo.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
