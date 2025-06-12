import { createApp } from "vue";
import App from "@/App.vue";
import router from "@router/index";
import "uno.css";
import "./assets/styles/base.css";

const app = createApp(App);
app.use(router);
app.mount("#app");
