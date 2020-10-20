# ey-go, a slideshow activity builder for language teachers

## Thanks for checking out ey-go!

### What is ey-go?

ey-go is a slideshow activity builder built for English language teachers in Japan who do a lot of sentence structure activities. Users can create their own slideshows of sentences. Translations for each phrase/word are automatically generated using the unofficial Jisho.org API, https://github.com/mistval/unofficial-jisho-api. During slideshow mode, sentences are cut into words and/or phrases with their order randomized. Users can show off their understanding of sentence structures by dragging and dropping the words and/or phrases into the correct order. There is built-in answer feedback and a drawing function.

ey-go is built with Vue.js, a fork of cors-anywhere, and Firebase.

### I want to make my own version of ey-go!

1. Clone or fork this repo.
2. Setup your own server or cors-anywhere backend for translation fetches with the proper whitelist information. https://www.npmjs.com/package/cors-anywhere. I followed a StackOverflow response and got a cors-anywhere server running in about 5 minutes.
3. Create a new Firebase project and replace the Firebase config found in App.vue with your own config information.
4. Deploy and have fun!

### Future plans
I plan to include other types of slides, like basic sentence slides and picture slides. I'd like to also create a system to share the slides with students on their own devices or so teachers can assign questions to complete on individual devices and check that everyone has completed the task before moving on with their slideshow.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
