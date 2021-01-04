# STX Assignment Description

This project is built with Vue.js and TypeScript. I tried to use as much other Vue packages such as Vuex, Vuetify, Vuelidate and also Bootstrap.

Project contains 7 vue components and server-simulation-engine for simulation of API calls, done with Mirage JS (file src/server.js and all files in DATA folder). This was my first time of making engine for simulation of API calls…I always had  already prepared API calls and I was using AXIOS.

Main page is Home.vue. It contains 3 parts (components): Order.vue, Sellers.vue and Items.vue.

Order Details part is completely done. First you need to select client and then to select one of his contacts. Data validation is checked by using Vuelidate. If it is successful, Save order details data is working, too. Data are also saved in Store in orderDataAction object (Vuex).

Second part is Sellers. You need to full in and save Order details first.  Then to add seller(s) with +Seller button. Seller names are also got from API -mockup-engine. Total percentage of all selected sellers must be 100%. Save is also working.

Third part is Items. I made adding of Generic Items with +Generic button. Adding of Special Items and saving items is still to be done.

Error messages are done. Complete Order object is kept in Store and can be used in all other components, if needed…

You can see the project on:
https://stx-assignment-vesnasr.netlify.app/

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
