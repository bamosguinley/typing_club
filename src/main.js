import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import ToggleSwitch from 'primevue/toggleswitch';

const app = createApp(App);
app.use(router);
// utilisation de la librairie de composants "PrimeVue"
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
// importation des composants
app.component("InputText", InputText);
app.component("Button", Button);
app.component("ToggleSwitch", ToggleSwitch);

app.mount("#app");
