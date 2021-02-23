import '../styles/global.css';

//arquivo para reaproveitar componentes para todas as paginas, porém é recalculado

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
