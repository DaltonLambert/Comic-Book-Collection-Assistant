<template>
  <div>
    <div v-for="(row, index) in rows" :key="index" class="row">
      <div v-for="(comic, index) in row" :key="index" class="comicsAPI" @click="comic.flip = !comic.flip" v-bind:flip="comic.flip">
        <img v-if="!comic.flip" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Comic book thumbnail">
        <div v-else>
          <h1>{{ comic.title }}</h1>
          <h2>Issue #{{ comic.issueNumber }}</h2>
          <p>{{ comic.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      comics: [],
      rows: [],
    };
  },

  mounted() {
    const endpoint = "http://gateway.marvel.com/v1/public/comics?limit=100&apikey=4d4fb7a8ee589aa8a41ea7bac53ff77c&ts=1671576398321&hash=dd5a754afd936ea1557909caf99bab72";

    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        for (const comic of data.data.results) {
          if (comic.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" && comic.images.length > 0) {
this.comics.push({
title: comic.title,
issueNumber: comic.issueNumber,
description: comic.description,
thumbnail: comic.thumbnail,
flip: false,
});
}
}
     // split comics into rows of 6 comics
     while (this.comics.length > 0) {
      this.rows.push(this.comics.splice(0, 6));
    }
  })
  .catch(error => {
    console.error(error);
  });
  },
  computed: {
    cleanImageUrl(url) {
      return url.replace(/.jpg$/i, '/clean.jpg');
    },
  },
};
</script>

<style>
  .comicsAPI {
    border: 3px solid black;
    height: 400px;
    width: 264px;
    margin: 10px 10px 10px 10px;
    padding: 10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    position: relative;
    transition: transform 0.6s;
    transform-style: preserve-3d;
    float: left;
  }

  .comicsAPI img {
    height: 100%;
    width: auto;
  }

  .comicsAPI span {
    position: absolute;
    height: 100%;
    width: 100%;
    backface-visibility: hidden;
  }

  .comicsAPI span:nth-child(1) {
    z-index: 2;
  }

  .comicsAPI span:nth-child(2) {
    transform: rotateY(180deg);
  }

  .comicsAPI.flipped {
    transform: rotateY(180deg);
  }

  .row {
  clear: both;
}
</style>


  
  