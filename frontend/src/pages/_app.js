import "@/styles/globals.css";
import Footer from "@/components/Footer";
function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  );
}
export default MyApp;
