# React app - Adviters challenge

## Instalación

Instalación de los paquetes de noede en la aplicación.

```bash
npm install
```

Antes de poder usar la aplicación hay que cambiar el `VITE_APIKEY`. Para ello duplicamos el archivo `.env` a `.env.local` y cambiamos el valor de `VITE_APIKEY`.

### Ejecución de la app

```bash
npm run dev
```

Abrir [localhost:3000](http://localhost:3000/) en el navegador.

---

## FYI

Si se ve un mensaje de error, es por el [`<StrictMode>`](https://es.react.dev/reference/react/StrictMode) de React. Si se borra este elemento del `main.tsx` dejará de aparecer.
