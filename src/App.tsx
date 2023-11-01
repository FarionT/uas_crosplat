import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonMenuToggle, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { list, mailOutline, settings, videocamOutline, warning } from 'ionicons/icons'
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


setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonRouterOutlet id="main">
          <Route path="/tabs" component={BottomTabs} />
          <Route path="/tabs/search" component={SearchPage}/>
          <Redirect exact from="/" to="/tabs" />
        </IonRouterOutlet> 
    </IonReactRouter>
  </IonApp>
);

export default App;
