# typing_club

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

@font-face {
font-family: "Playwrite";
src: url("@/assets/fonts/Playwrite_NG_Modern/PlaywriteNGModern-VariableFont_wght.ttf") format("trueType");
font-weight: bold;
font-style: normal;
}

#app {
display: flex;
justify-content: center;
align-items: center;
}

a,
.green {
text-decoration: none;
color: hsla(160, 100%, 37%, 1);
transition: 0.4s;
padding: 3px;
}

@media (hover: hover) {
a:hover {
background-color: hsla(160, 100%, 37%, 0.2);
}
}

@media (min-width: 1024px) {
body {
/_ display: flex;
place-items: center; _/
}

#app {

}
}
