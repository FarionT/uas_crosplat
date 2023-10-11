import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { barChart, mailOutline, personCircleOutline, restaurant, videocamOutline } from "ionicons/icons"
import { Redirect, Route } from "react-router"
import Mail from "./Mail"
import Meet from "./Meet"
import Spam from "./Spam"
import Profile from "./ProfileUser";

const MailTabs: React.FC = () =>{
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/mail" />
                <Route exact path="/tabs/mail" component={Mail}/>
                <Route exact path="/tabs/meet" component={Meet}/>
                <Route exact path="/tabs/spam" component={Spam}/>
                <Route exact path="/tabs/profile" component={Profile} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="ion-content-center">
                <IonTabButton tab="mail" href='/tabs/mail'>
                    <IonIcon icon={restaurant} />
                    <IonLabel>Catatan Harian</IonLabel>  
                </IonTabButton>   
                <IonTabButton tab="meet" href='/tabs/meet'>
                    <IonIcon icon={barChart} />
                    <IonLabel>Laporan</IonLabel>  
                </IonTabButton>
                <IonTabButton tab="profile" href='/tabs/profile'>
                    <IonIcon icon={personCircleOutline} />
                    <IonLabel>Saya</IonLabel>  
                </IonTabButton>
            </IonTabBar> 
        </IonTabs>
    )
}

export default MailTabs;