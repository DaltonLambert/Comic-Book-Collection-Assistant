<template>
  <div class="home">
    
    <div class="title-wrapper title">
      <div class="comics-title-container">
        <h1 class="comics-title">Welcome!</h1>
      </div>
    </div>

    <div class="statistics">
      <h2>Site Statistics</h2>
      <ul>
        <li>Our Website has 100 Comics!  <img src="https://static.thenounproject.com/png/7433-200.png" alt="comic book icon" class="comic-book-icon" /></li>
        <li>Our Website has {{usersCount}} current Users! Get in on the ground floor while you still can! <img src="https://cdn-icons-png.flaticon.com/512/33/33308.png" alt="comic book icon" class="comic-book-icon" /></li>
        <li>Our Website has {{collectionCount}} different collections! Such Variety! <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bimetrical_icon_folder_black.svg/1024px-Bimetrical_icon_folder_black.svg.png" alt="comic book icon" class="comic-book-icon" /></li>
        <li>Our Website has comics from {{authorCount}} different authors! <img src="https://camo.githubusercontent.com/a50d5bd3ee846fc94720056bf6db040681809512df69e8764fe5406f5ed8b462/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f363132303433312f313639333233352f62373337366163382d356538622d313165332d393135382d6661313961313263663133612e706e67" alt="comic book icon" class="comic-book-icon" /></li>
      </ul>
    </div>
    
    <div class="picture">
      <h2>Latest Issue</h2>
      <img src="http://i.annihil.us/u/prod/marvel/i/mg/6/20/5b464dc1c4517/clean.jpg" alt="Marvel Comic Heroes" />
    </div>

    <div class="featured-collection">
      
      <h2>Check out these featured Collections!</h2>
      <comic-book-collection />
    </div>
    
  </div>
</template>

<script>
import ComicBookCollection from '../components/ComicBookCollection.vue'
import ComicService from "../services/ComicService"

export default {
  components: { 
    ComicBookCollection
  },
  data(){
    return{
      comicCount: "",
      usersCount: "",
      collectionCount: "",
      authorCount: ""
    }
  },
  name: "home",
  created(){
    ComicService.getComicCount().then((response) => {
      this.comicCount = response.data
    }),
    ComicService.getUsersCount().then((response) => {
      this.usersCount = response.data
    }),
    ComicService.getCollectionCount().then((response) => {
      this.collectionCount = response.data
    }),
    ComicService.getAuthorCount().then((response) => {
      this.authorCount = response.data
    })
  },
  //TO Be DELETED vv
  computed: {
    featuredCollection(){
      return this.$store.state.comics; 
    },
    onlyFeaturedComics(){
      return this.comicCount.filter((comic) => {
        return comic.collectionId === 1;
      });
    }
  }
}
</script>

<style scoped>
div.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "statistics picture"
    "featured-collection featured-collection"
    ;
    
}
div.title {
  grid-area: title;
  text-align: center;
  border-bottom: 1px solid white;
  margin-bottom: 10px;
  color: black;
  font-family: monospace, serif;
  font-size: 20px;
  height: 200px;
}
div.statistics {
  grid-area: statistics;
  border: 2px solid black;
  margin: 10px 10px 10px 10px;
  font-family: monospace, serif;
}
div.picture {
  grid-area: picture;
  margin: 10px 10px 10px 10px;
  border: 2px solid black;
}
div.featured-collection {
  grid-area: featured-collection;
  
  margin: 10px 10px 10px 10px;
  font-family: monospace, serif;
   border: 2px solid black;
}
div.featured-collection h2 {
  text-align: center;
 
}
/* this will style the image itself. currently it is centering the image. might not be necessary*/
div.picture img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 75%;
}
div.statistics {
  grid-area: statistics;
  
  margin: 10px 10px 10px 10px;
  font-family: monospace, serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
  
}
.comic-book-icon {
  height: 50px;
  width: 50px;
   vertical-align: middle;
}
li {
margin: 10px 0;
padding: 10px 0;
list-style-type: none;
margin-right: 210px;
}
h2 {
text-align: center;
font-family: monospace, serif;
text-shadow: 1px 1px 1px rgba(0,0,0,0.5);
}
.picture > img:hover {
    box-shadow: 0 0 20px 10px #2F4858;
  }
  .statistics {
  background-image: url('https://4kwallpapers.com/images/wallpapers/spider-man-marvel-superheroes-red-background-marvel-comics-2560x2560-7494.jpg');
  background-size: cover;
  background-position: left;
  color: #fff;
  
}
</style>

