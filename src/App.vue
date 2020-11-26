
<template>
  <div id="app">
    <Navbar 
      v-bind:user="user"
      :loading="loading"
      v-on:show-set-editor="showSetEditor($event)"
      v-on:show-slideshow="showSlideshow($event)"
    />
    <SetEditor
      v-if="editing"
      v-on:save="saveSet($event)"
      v-on:show-slideshow="showSlideshow($event)"
      :set="setInEditor"
      :key="setInEditor.id"
      v-bind:loading="loading.sets"
    />
    <Slideshow
      v-else
      :set="slideshowSet"
      :key="`${slideshowSet.id}-app`"
      v-bind:loading="loading.sets"
    />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SetEditor from './components/SetEditor.vue';
import Slideshow from './components/Slideshow';
import uniqid from 'uniqid';
import axios from 'axios';
// import JishoAPI from 'unofficial-jisho-api';
import { EventBus } from './event-bus';

//Firebase initialization
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDqjXSIdtzDO9UCk-sC5ziMG2s5YPgpC_U",
    authDomain: "ey-go-d3cd0.firebaseapp.com",
    databaseURL: "https://ey-go-d3cd0.firebaseio.com",
    projectId: "ey-go-d3cd0",
    storageBucket: "ey-go-d3cd0.appspot.com",
    messagingSenderId: "749591697074",
    appId: "1:749591697074:web:6cfaf7544368aee5e05bab"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

//Jisho.org Client
// const jisho = new JishoAPI();

export default {
  name: 'App',
  components: {
    Navbar,
    SetEditor,
    Slideshow
  },
  data: function () {
    return {
      editing: true,
      loading: {
        login: false,
        create: false,
        sets: false,
      },
      setInEditor: {
            name: '',
            textbook: '',
            program: '',
            lesson: '',
            timestamp: '',
            id: uniqid(),
            isEditCopy: false,
            slides: [{
              input: '',
              answer: '',
              items: []
            }],
      },
      slideshowSet:{},
      user: {
        sets: null
      }
    }
  },
  created() {
    this.loading.login = true;

    EventBus.$on('login', formData => {
      // console.log('called via global login')
      this.login(formData.username, formData.pass);
    })
    EventBus.$on('create', formData => {
      // console.log('called create via global bus');
      this.createFirebaseAccount(formData.username, formData.pass);
    })
    EventBus.$on('logout', () => {
      this.logout();
    })

    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus: async function () {
      
      try {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // User is signed in.
            const user = firebase.auth().currentUser;
            const splitUsername = user.email.split('@')
            const username = splitUsername[0];
            const uid = user.uid;

            this.user = {
              username: username,
              uid: uid,
              unsubscribe: null,
            }

            this.listenToFirebaseSets(uid);
            this.loading.login = false;
          } else {
            // No user is signed in.
            this.user = {
              sets: []
            }
            this.loading.login = false;
            return;
          }
        });

      } catch (err){
        console.log(err);
      }
      
    },
    login: async function (username, pass) {
      this.loading.login = true;

      const email = `${username}@${username}.${username}`

      try {
        const res = await firebase.auth().signInWithEmailAndPassword(email, pass);

        const uid = res.user.uid;

        this.listenToFirebaseSets(uid);

        this.user = {
          username: username,
          uid: uid,
          sets: [],
          unsubscribe: null
        }
        this.loading.login = false;
      } catch (err) {
        // console.log(err);
      }

    },
    createFirebaseAccount: async function (desiredName, pass) {

      this.loading.create = true;
      
      const email = `${desiredName}@${desiredName}.${desiredName}`
      
      try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, pass);

        const uid = res.user.uid;

        const userObj = {
          username: desiredName,
          uid: uid,
          sets: [],
          unsubscribe: null
        }

        db.collection(uid).doc('Your first set!').set({
            name: 'Your first set!',
            textbook: '',
            program: '',
            lesson: '',
            timestamp: '',
            id: uniqid(),
            isEditCopy: false,
            slides: [{
              input: 'Type/questions/like/this.',
              answer: 'Type questions like this',
              items: [
                {id: `${0}-${1}-${'Type'}`, text: 'Type'},
                {id: `${0}-${2}-${'questions'}`, text: 'questions'},
                {id: `${0}-${3}-${'like'}`, text: 'like'},
                {id: `${0}-${4}-${'this.'}`, text: 'this.'},
              ]
            }],
        });

        this.listenToFirebaseSets(uid);

        this.loading.create = false;
        this.user = {...userObj};
      } catch (err) {
        // console.log(err)
      }
    },
    logout: async function () {
      try {
        await this.user.unsubscribe();
        console.log('unsubscribed');
        await firebase.auth().signOut();
        console.log('logged out');
      } catch (err) {
        console.log(err);
      }
    },
    showSetEditor: function (set) {
      if (set) {
        const editCopy = {...set};
        
        editCopy.isEditCopy = true;

        this.setInEditor = {...editCopy};
      } else {
        this.setInEditor = {
            name: '',
            textbook: '',
            program: '',
            lesson: '',
            timestamp: '',
            id: uniqid(),
            isEditCopy: false,
            slides: [{
              input: '',
              answer: '',
              items: []
            }],
        }
      }
      
      this.editing = true;
    },
    showSlideshow: function (set) {
      // console.log('setting to slideshow display');
      this.slideshowSet = set;
      this.editing = false;
    },
    saveSet: async function (next) {

      this.loading.sets = true;

      // let ind;

      // if (this.setInEditor.isEditCopy) {
      //   ind = this.user.sets.findIndex(set => {
      //     return set.id === this.setInEditor.id;
      //   });

      // //   // const setsArr = [...this.user.sets]
      // //   // const objCopy = {...this.setInEditor}

      // //   // setsArr[ind] = {...objCopy}

      // //   await this.fetchTranslations(ind);
      // } else {

      //   ind = this.user.sets.length;

      //   console.log(this.user.sets);

      //   console.log(ind);

      //   // this.user.sets.push(this.setInEditor);
      // //   await this.fetchTranslations(ind);
      // }

      await this.fetchTranslations();

      //update Firebase sets
      const userRef = db.collection(this.user.uid).doc(this.setInEditor.name)

      const setToSave = {...this.setInEditor};
        
      await userRef.set(setToSave);

      this.loading.sets = false;

      //show success message
      // console.log('success', res);


      if (next === 'slideshow') {
        const newSlideshowSet = {...this.setInEditor};
        // console.log(next);
        this.showSlideshow(newSlideshowSet);
      } else {
        return;
      }
    },
    listenToFirebaseSets: function (uid) {
      const userRef = db.collection(uid);

      try {
        const unsubscribe = userRef.onSnapshot( (collection) => {
        this.loading.sets = true;

          // console.log('Your data: ', collection.docs);

          const setsArr = [];

          collection.docs.forEach(doc => {
            setsArr.push(doc.data());
            // console.log('doc: ', doc.data());
          });

          this.user.sets = [...setsArr];
          this.user.unsubscribe = unsubscribe;
          this.loading.sets = false;
        })
      } catch (err) {
        console.log(err);
      }

      
    },
    async fetchTranslations() {

      function hasNumber(myString) {
        return /\d/.test(myString);
      }

      await Promise.all(this.setInEditor.slides.map (async (slide) => {
        await Promise.all(slide.items.map(async (item) => {
          let text = item.text.replace('?', '').replace(',', '').replace('.', '').replace(';', '').replace(':', '').replace('/', '').toLowerCase();
          console.log("making req for this text:", text);

          try {
            let response = await axios.post(`https://boiling-harbor-07938.herokuapp.com/jisho.org/api/v1/search/words?keyword=${text}`);

            const translationsArr = [];

            console.log(response);

            response.data.data.forEach(translation => {
              if (hasNumber(translation.slug)) {
                translation.slug = 'Error. Sorry!';
              }

              translationsArr.push({original: text, text: translation.slug});
              console.log(`${text} in Japanese is: `, translation.slug)
            });

            // const translations = [...res.data.translations];

            item.translations = [...translationsArr.slice(0, 5)];

            console.log(`${text} translations array set to`, item.translations);

          } catch (err) {
            console.log(err);
          }
        }));
      }))
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
