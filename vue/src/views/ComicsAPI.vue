<template>
  <div class="container">
    <!-- Sidebar -->
    <div class="fixed-sidebar" style="z-index: 2">
    <div class="sidebar">
      <h2 class="collection-title">Collections</h2>
      <div class="new-collection-button" @click="createNewCollection">
        <div class="plus-sign">+</div>
        <div class="button-label">Create New Collection</div>
      </div>
      <div v-if="showPopup" class="popup" style="z-index: 1" >
        <div class="popup-header">Enter A Name For Your Collection</div>
        <form class="collection-form" @submit.prevent="submitCollectionName">
          <input type="text" v-model="collectionName" placeholder="Collection Name">
          <button type="submit">Submit</button>
        </form>
      </div>
     

      <div v-for="(collection, index) in collections" :key="index" class="collection" @dragover.prevent @drop="drop($event, collection)" @click="openPopup(collection)" >
        <div class="collection-name">{{ collection.name }} ({{ collection.count }})</div>
      </div>
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


    <div v-if="showCollectionPopup" class="collectionPopup">
  <div class="popup-header">Comics in Collection: {{ selectedCollection.name }}</div>
  <button @click="closePopup">X</button>
  <div class="comic-list">
    <div v-for="(comic, index) in selectedCollection.comics" :key="index" class="comic">
      <img :src="comic.thumbnail.path + '.' + comic.thumbnail.extension" alt="Comic book thumbnail"> 
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
      this.collections.push({ name: this.collectionName, comics: [], count: 0, });
      this.showPopup = false;
      this.collectionName = '';
    },
    dragStart(event, comic) {
    event.dataTransfer.setData('comic', JSON.stringify(comic));
  },
  drop(event, collection) {
    const comic = JSON.parse(event.dataTransfer.getData('comic'));
    collection.comics.push(comic);
    collection.count++;
    
  },
  openPopup(collection) {
    this.selectedCollection = collection;
    this.showCollectionPopup = true;
  },
  closePopup() {
      this.showCollectionPopup = false;
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
  overflow-wrap: break-word;
  word-wrap: break-word; 
}

.issueNumber {
  font-size: 16px;
  font-family: Arial, sans-serif;
  margin: 0;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word; 
}

.description {
  font-size: 14px;
  font-family: Arial, sans-serif;
  margin: 0;
  text-align: center;
  overflow-wrap: break-word; 
  word-wrap: break-word; 
}

.container {
  display: flex;
  flex-direction: row;
}

.sidebar {
  flex: 0 0 25%; 
  height: 100%; 
  order: 2; 
}

.main-area {
  flex: 0 0 75%; 
  height: 100%;
  order: 1; 
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

  .collectionPopup,
.popup {
  background-color: #ccc;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 70%;
  height: 50%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.collectionPopup .popup-header,
.popup .popup-header {
  text-align: center;
  margin-bottom: 20px;
}

.collectionPopup .comic-list,
.popup .collection-form {
  width: 80%;
  height: 80%;
  overflow: scroll;
}

.collectionPopup .comic,
.popup .collection {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.collectionPopup .comic-list {
  /* Add a flex layout to the comic-list element */
  display: flex;
  flex-wrap: wrap;
}

.collectionPopup .comic {
  /* Add some additional styling to the comics in the collection */
  width: 10%; /* Adjust the width of the comics to control how they are laid out */
  margin: 10px;
}

.fixed-sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  /* Other styles for the fixed sidebar here */
  right: 0;
}
</style>


  
  