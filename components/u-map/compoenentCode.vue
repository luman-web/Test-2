<template>
  <div class="root">
    <div class="panel">
      <input
        v-model="query"
        class="input"
        type="text"
        placeholder="Search place…"
        @input="onInput"
        @keydown.down.prevent="move(1)"
        @keydown.up.prevent="move(-1)"
        @keydown.enter.prevent="choose(activeIndex)"
        @blur="onBlur"
      />

      <ul v-if="open && suggestions.length" class="dropdown">
        <li
          v-for="(s, i) in suggestions"
          :key="s.placePrediction && s.placePrediction.placeId ? s.placePrediction.placeId : i"
          class="item"
          :class="{ active: i === activeIndex }"
          @mousedown.prevent="choose(i)"
        >
          <div class="main">
            {{ (s.placePrediction && s.placePrediction.structuredFormat && s.placePrediction.structuredFormat.mainText && s.placePrediction.structuredFormat.mainText.text)
                || (s.placePrediction && s.placePrediction.text && s.placePrediction.text.text)
                || 'Unknown place' }}
          </div>

          <div class="secondary">
            {{ (s.placePrediction && s.placePrediction.structuredFormat && s.placePrediction.structuredFormat.secondaryText && s.placePrediction.structuredFormat.secondaryText.text)
                || '' }}
          </div>
        </li>
      </ul>
    </div>

    <div ref="map" class="map"></div>
  </div>
</template>

<script>
module.exports = {
  data() {
    return {
      map: null,
      marker: null,

      // NEW Places API
      AutocompleteSuggestion: null,

      query: "",
      open: false,
      suggestions: [],
      activeIndex: 0,

      t: null, // debounce
    };
  },

  methods: {
    async init() {
      if (!window.google?.maps || !(this.$refs.map instanceof Element)) return;

      // Load new places classes (v=weekly required)
      const placesLib = await google.maps.importLibrary("places");
      this.AutocompleteSuggestion = placesLib.AutocompleteSuggestion;

      console.log(this.$refs.map, '<<<')

      // Map (use Marker for simplicity; AdvancedMarkerElement needs mapId)
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat: 40.749933, lng: -73.98633 },
        zoom: 13,
        mapTypeControl: false,
      });

      this.marker = new google.maps.Marker({ map: this.map });
    },

    onInput() {
      clearTimeout(this.t);

      const q = this.query.trim();
      if (q.length < 2) {
        this.open = false;
        this.suggestions = [];
        return;
      }

      this.t = setTimeout(() => this.fetchSuggestions(q), 200);
    },

    async fetchSuggestions(input) {
  if (!this.AutocompleteSuggestion) return;

  try {
    const res = await this.AutocompleteSuggestion.fetchAutocompleteSuggestions({ input });
    const suggestions = res?.suggestions || [];

    // Normalize to safe fields for the template
    this.suggestions = suggestions.map((s) => {
      const p = s.placePrediction;
      const main =
        p?.structuredFormat?.mainText?.text ||
        p?.text?.text ||
        p?.text ||
        "";
      const secondary =
        p?.structuredFormat?.secondaryText?.text || "";

      return {
        placePrediction: p,
        _main: main,
        _secondary: secondary,
      };
    });

    this.activeIndex = 0;
    this.open = this.suggestions.length > 0;
  } catch (e) {
    console.error("fetchAutocompleteSuggestions error:", e);
    this.open = false;
    this.suggestions = [];
  }
},

    async choose(i) {
      const s = this.suggestions[i];
      if (!s) return;

      this.query = s.placePrediction.text?.text || this.query;
      this.open = false;
      this.suggestions = [];

      try {
        const place = s.placePrediction.toPlace();
        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location", "viewport"],
        });

        if (place.viewport) this.map.fitBounds(place.viewport);
        else if (place.location) {
          this.map.setCenter(place.location);
          this.map.setZoom(17);
        }

        if (place.location) this.marker.setPosition(place.location);
      } catch (e) {
        console.error("place.fetchFields error:", e);
      }
    },

    move(delta) {
      if (!this.open || !this.suggestions.length) return;
      const n = this.suggestions.length;
      this.activeIndex = (this.activeIndex + delta + n) % n;
    },

    onBlur() {
      setTimeout(() => (this.open = false), 150);
    },
  },

  mounted() {
    setTimeout(() => this.init(), 1000);
  },

  beforeDestroy() {
    clearTimeout(this.t);
  },
};
</script>

<style>
.root { width: 100%; height: 100%; position: relative; }
.map { height: 100%; }

.panel {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 360px;
  z-index: 10;
}

.input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  background: #fff;
}

.dropdown {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  max-height: 280px;
  overflow: auto;
}

.item { padding: 10px 12px; cursor: pointer; }
.item.active { background: #f2f5ff; }

.main { font-weight: 600; }
.secondary { font-size: 12px; opacity: 0.75; margin-top: 2px; }
</style>
