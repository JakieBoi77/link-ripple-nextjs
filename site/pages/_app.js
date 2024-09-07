import "../styles/globals.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import NProgress from 'nprogress';
import '../public/nprogress.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import UserContext from "../components/context/userContext";


export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [userData, setUserData]= useState({
    name: '',
    role: '',
    avatar: '',
    handle: '', 
  })

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, []);

  return(
    <div className="flex flex-col min-h-screen">
      <NavBar/>
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-WYTYXQXVK6`} />
      <Script strategy="lazyOnload">
                  {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-WYTYXQXVK6', {
                      page_path: window.location.pathname,
                      });
                  `}
      </Script>
      <UserContext.Provider value= {{userData, setUserData}}>
        {/* <main className="flex flex-grow flex-col justify-center items-center"> */}
          <Component {...pageProps} />
        {/* </main> */}
      </UserContext.Provider>
      <ToastContainer />
      {isLoading && <div className="nprogress-custom-parent"><div className="nprogress-custom-bar"/></div>}

    </div>
  ) 
}
