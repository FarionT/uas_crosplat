import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, mailOutline, settings, videocamOutline, warning } from 'ionicons/icons'

import { useEffect } from 'react';
import { App as CapacitorApp } from '@capacitor/app';
import { useHistory } from 'react-router-dom';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import BottomTabs from './pages/Navigasi/BottomTabs';
import SearchPage from './pages/Catatan/SearchPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RegisterData from './pages/Register/RegisterData';
import ProfileUser from './pages/Profile/ProfileUser';
import Kalori from './pages/Laporan/Kalori';
import AddPhoto from './pages/Profile/AddPhoto';


setupIonicReact();

const App: React.FC = () => {
  const history = useHistory();
  let backButtonListener: any; // Menyimpan referensi listener

  useEffect(() => {
    const backButtonHandler = () => {
      try {
        if (history.length > 1) {
          history.goBack();
        } else {
          CapacitorApp.exitApp();
        }
      } catch (error) {
        console.error('Error in backButtonHandler:', error);
        // Mencegah eksekusi lebih lanjut atau tambahkan pernyataan log tambahan.
      }
    }
  
    try {
      backButtonListener = CapacitorApp.addListener('backButton', backButtonHandler);
    } catch (error) {
      console.error('Error creating backButtonListener:', error);
      // Mencegah eksekusi lebih lanjut atau tambahkan pernyataan log tambahan.
    }
  
    // Cleanup listener when the component unmounts
    return () => {
      try {
        // Pastikan backButtonListener adalah objek yang dapat dihapus sebelum memanggil remove
        backButtonListener?.remove && backButtonListener.remove();
      } catch (error) {
        console.error('Error removing backButtonListener:', error);
        // Mencegah eksekusi lebih lanjut atau tambahkan pernyataan log tambahan.
      }
    };
  }, [history]);
  

  return(
    <IonApp>
      <IonReactRouter>
          <IonRouterOutlet id="main">
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route  path="/register-data" component={RegisterData} />
            <Route exact path="/home" component={BottomTabs} />
            <Route exact path="/search" component={SearchPage}/>
            {/* <Route exact path="/add-photo" component={AddPhoto} /> */}
            {/* <Route exact path="/profile" component={ProfileUser} />
            <Route exact path="/laporan" component={Kalori} /> */}
          </IonRouterOutlet> 
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
