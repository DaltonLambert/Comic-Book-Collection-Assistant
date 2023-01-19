<template>
  <div id="app">
    <body>
      
      <header> 
        <div id="nav">
          <router-link v-bind:to="{ name: 'home' }" class="router-link-nav">Home</router-link>&nbsp;&nbsp;
          <router-link v-bind:to="{ name: 'register' }" class="router-link-nav">Register</router-link>&nbsp;&nbsp;
          <router-link v-bind:to="{ name: 'comics' }" v-if="apiIsDown" class="router-link-nav">Comics</router-link>&nbsp;&nbsp;
          <router-link v-bind:to="{ name: 'login' }"  class="router-link-nav">Login</router-link>&nbsp;&nbsp;
          <router-link v-bind:to="{ name: 'profile' }" v-if="$store.state.token != ''" class="router-link-nav">Profile</router-link>&nbsp;&nbsp;
          <router-link v-bind:to="{ name: 'logout' }" v-if="$store.state.token != ''" class="router-link-nav">Logout</router-link>&nbsp;&nbsp;
          <router-link v-bind:to="{ name: 'comicsAPI' }" v-if="!apiIsDown && $store.state.token != ''" class="router-link-nav">ComicsAPI</router-link>
        </div>
      </header>
      
      <main>
        <router-view />
      </main>

      <footer>
        <footer-box />
      </footer>

    </body>
  </div>
</template>

<script>
import FooterBox from './components/FooterBox.vue'


export default {
  name: 'app',
  components: {
    FooterBox
  },
  data() {
    return {
      apiIsDown: false,
    }
  },
  mounted() {
    const endpoint = "http://gateway.marvel.com/v1/public/comics?limit=100&apikey=4d4fb7a8ee589aa8a41ea7bac53ff77c&ts=1671576398321&hash=dd5a754afd936ea1557909caf99bab72";

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          this.apiIsDown = true;
        }
      })
      .catch(error => {
        console.error(error);
        this.apiIsDown = true;
      });
  }

}
</script>

<style scoped>
#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer"
    ;
  
}

header {
  grid-area: header;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: radial-gradient(circle, rgba(5,6,3,1) 9%, rgba(20,39,130,1) 83%, rgba(30,60,210,1) 93%);
  font-family: monospace, serif;
  /*height: 3rem;*/
  height: 5vh
  
}

main {
  grid-area: main;
  background: linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(247,28,28,1) 14%, rgba(235,16,12,1) 87%, rgba(15,5,2,1) 99%);
}

footer {
  grid-area: footer;
  display: flex;
  align-items: center;
  background: radial-gradient(circle, rgba(30,60,210,1) 0%, rgba(5,6,3,1) 100%);
  width: 100%;
  /*height: 5rem;*/
  height: 7vh;
  font-family: monospace, serif;
  color: #fff;
  font-size: 12px;
}

#nav {
  text-align: center;
}

.router-link-nav {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  font-weight: 500;
  display: inline-block;
  width: 100px;
  transition: all 0.5s ease-in-out;
}

.router-link-nav:hover {
  color: #fddb3a;
}


</style>