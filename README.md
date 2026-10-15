# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Appwrite storage permissions

Post submission uploads its featured image to the bucket configured by
`VITE_APPWRITE_BUCKET_ID`. In the Appwrite Console, open **Storage**, select
that bucket, and grant the **Create** permission to authenticated users. Do not
grant it to **Any** unless unauthenticated uploads are intended. Bucket
permissions are enforced by Appwrite and cannot be granted by the browser
client.
