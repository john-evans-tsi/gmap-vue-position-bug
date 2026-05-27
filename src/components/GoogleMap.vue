<script setup lang="ts">
import { ref } from "vue";

const mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

const center = ref({ lat: 47.376332, lng: 8.547511 });

const infoWindowPos = ref<{ lat: number; lng: number } | null>(null);
const infoWinOpen = ref(false);
const currentMidx = ref<number | null>(null);

const infoContent = ref("");

const markers = ref([
  {
    position: { lat: 47.376332, lng: 8.547511 },
    infoText: "Marker 1",
  },
  {
    infoText: "Marker 2",
    position: { lat: 47.374592, lng: 8.548867 },
  },
  {
    position: { lat: 47.379592, lng: 8.549867 },
    infoText: "Marker 3",
  },
]);

function toggleInfoWindow(
  marker: { position: { lat: number; lng: number }; infoText: string },
  idx: number,
) {
  infoWindowPos.value = marker.position;
  infoContent.value = marker.infoText;

  //check if its the same marker that was selected if yes toggle
  if (currentMidx.value == idx) {
    infoWinOpen.value = !infoWinOpen.value;
  }

  //if different marker set infowindow to open and reset current marker index
  else {
    infoWinOpen.value = true;
    currentMidx.value = idx;
  }
}
</script>

<template>
  <div class="map-container">
    <GmvMap
      :center="center"
      :zoom="15"
      :map-id="mapId"
      style="width: 100%; height: 500px"
    >
      <GmvInfoWindow
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
      >
        <h3>{{ infoContent }}</h3>
      </GmvInfoWindow>

      <GmvMarker
        :key="i"
        v-for="(m, i) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfoWindow(m, i)"
      />
    </GmvMap>
  </div>
</template>

<style scoped>
.map-container {
  width: 100%;
  max-width: 900px;
  margin: 2rem auto;
  overflow: hidden;
}
</style>
