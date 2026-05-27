# gmap-vue

A Vue 3 + TypeScript example app using [`@gmap-vue/v3`](https://diegoazh.github.io/gmap-vue/docs/vue-3-version/) to display an interactive Google Map with markers and info windows.

## Prerequisites

- Node.js 18+
- A [Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key) with the **Maps JavaScript API** enabled
- A [Map ID](https://developers.google.com/maps/documentation/get-map-id) (required for advanced markers)

## Setup

1. **Install dependencies**

   ```bash
   yarn install
   ```

2. **Configure environment variables**

   Copy the example file and fill in your credentials:

   ```bash
   cp .env.example .env.local
   ```

   `.env.local`:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   VITE_GOOGLE_MAPS_MAP_ID=your_map_id_here
   ```

## Running the app

| Command | Description |
|---|---|
| `yarn dev` | Start the dev server at `http://localhost:5173` |
| `yarn build` | Type-check and build for production |
| `yarn preview` | Preview the production build locally |
