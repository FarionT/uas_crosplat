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
import Mail from './pages/Mail';
import MailDetail from './pages/MailDetail';
import Meet from './pages/Meet';
import MailTabs from './pages/MailTabs';
import Settings from './pages/Settings';
import SearchPage from './pages/SearchPage';
import ProfileUser from './pages/ProfileUser';
import Kalori from './pages/Kalori';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
        <IonMenu contentId="main">
          <IonHeader>
              <IonToolbar>
                  <IonTitle>
                      NAMA APLIKASI
                  </IonTitle>
              </IonToolbar>
            </IonHeader>
          <IonContent>
            <IonList>
              <IonMenuToggle>
                <IonItem button routerLink="/tabs/mail">
                  <IonIcon slot="start" icon={list}/>
                  <IonLabel>Catatan Kalori Harian</IonLabel>
                </IonItem>
                <IonItem button routerLink="/tabs/spam">
                  <IonIcon slot="start" icon={warning}/>
                  <IonLabel>Spam</IonLabel>
                </IonItem>
                <IonItem button routerLink="/tabs/settings">
                  <IonIcon slot="start" icon={settings}/>
                  <IonLabel>Settings</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route path="/tabs" component={MailTabs} />
          <Route path="/mail/:mailId" component={MailDetail} />
          <Route path="/tabs/settings" component={Settings}/>
          <Route path="/tabs/search" component={SearchPage}/>
          <Redirect exact from="/" to="/tabs" />
        </IonRouterOutlet> 
    </IonReactRouter>
  </IonApp>
);

export default App;
