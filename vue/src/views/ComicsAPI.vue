<template>
  <div class="container">
    <!-- Sidebar -->
    <div class="sidebar">
      <h2 class="collection-title">Collections</h2>
      <div class="new-collection-button" @click="createNewCollection">
        <div class="plus-sign">+</div>
        <div class="button-label">Create New Collection</div>
      </div>
      <div v-if="showPopup" class="popup">
        <div class="popup-header">Enter A Name For Your Collection</div>
        <form class="collection-form" @submit.prevent="submitCollectionName">
          <input type="text" v-model="collectionName" placeholder="Collection Name">
          <button type="submit">Submit</button>
        </form>
      </div>
     

      <div v-for="(collection, index) in collections" :key="index" class="collection" @dragover.prevent @drop="drop($event, collection)" @click="openPopup(collection)" >
        <div class="collection-name">{{ collection.name }}</div>
      </div>
    </div>

    <!-- Main area -->
    <div class="main-area">
      <div v-for="(row, index) in rows" :key="index" class="row">
        <div v-for="(comic, index) in row" :key="index" class="comicsAPI" @click="comic.flip = !comic.flip" v-bind:flip="comic.flip" draggable @dragstart="dragStart($event, comic)">
          <img v-if="!comic.flip" :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Comic book thumbnail">
          <div v-else>
            <h1 class="title">{{ comic.title }}</h1>
            <h2 class="issueNumber">Issue #{{ comic.issueNumber }}</h2>
            <p class="description">{{ comic.description }}</p>
          </div>
        </div>
      </div>
    </div>


    <div v-if="showCollectionPopup" class="popup">
  <div class="popup-header">Comics in Collection: {{ selectedCollection.name }}</div>
  <div class="comic-list">
    <div v-for="(comic, index) in selectedCollection.comics" :key="index" class="comic">
      {{ comic.title }} (Issue #{{ comic.issueNumber }})
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
      showPopup: false,
      collectionName: '',
      collections: [],
      selectedCollection: null,
    showCollectionPopup: false,
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
      this.rows.push(this.comics.splice(0, 5));
    }
  })
  .catch(error => {
    console.error(error);
  });
  },
  methods: {
    createNewCollection() {
      this.showPopup = true;
    },
    submitCollectionName() {
      this.collections.push({ name: this.collectionName, comics: [] });
      this.showPopup = false;
      this.collectionName = '';
    },
    dragStart(event, comic) {
    event.dataTransfer.setData('comic', JSON.stringify(comic));
  },
  drop(event, collection) {
    const comic = JSON.parse(event.dataTransfer.getData('comic'));
    collection.comics.push(comic);
  },
  openPopup(collection) {
    this.selectedCollection = collection;
    this.showCollectionPopup = true;
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
    overflow: hidden;
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

.title {
  font-size: 20px;
  font-family: Arial, sans-serif;
  margin: 0;
  text-align: center;
  overflow-wrap: break-word; /* wrap text if it is too long to fit on one line */
  word-wrap: break-word; /* same as above */
}

.issueNumber {
  font-size: 16px;
  font-family: Arial, sans-serif;
  margin: 0;
  text-align: center;
  overflow-wrap: break-word; /* wrap text if it is too long to fit on one line */
  word-wrap: break-word; /* same as above */
}

.description {
  font-size: 14px;
  font-family: Arial, sans-serif;
  margin: 0;
  text-align: center;
  overflow-wrap: break-word; /* wrap text if it is too long to fit on one line */
  word-wrap: break-word; /* same as above */
}

.container {
  display: flex;
  flex-direction: row;
}

.sidebar {
  flex: 0 0 25%; /* This will set the width of the sidebar to 25% of the container */
  height: 100%; /* This will make the sidebar the same height as the container */
  order: 2; /* This will move the sidebar to the right side of the main area */
}

.main-area {
  flex: 0 0 75%; /* This will set the width of the main area to 75% of the container */
  height: 100%; /* This will make the main area the same height as the container */
  order: 1; /* This will move the main area to the left side of the sidebar */
}

.collection-title {
  display: inline-block;
}

.collection-button {
  display: inline-block;
  margin-left: 10px;
}

.new-collection-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    height: 150px;
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
  }

  .plus-sign {
    font-size: 70px;
    line-height: 70px;
  }

  .button-label {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .popup-header {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .collection-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .collection-form input[type="text"] {
    width: 200px;
    height: 30px;
    font-size: 18px;
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .collection-form button[type="submit"] {
    width: 100px;
    height: 30px;
    font-size: 18px;
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .collection {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;
    height: 150px;
    background-color: white;
    border: 2px solid black;
    border-radius: 5px;
    margin-top: 10px;
  }

  .collection-name {
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }

</style>


  
  