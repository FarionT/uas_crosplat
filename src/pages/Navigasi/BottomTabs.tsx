import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { barChart, mailOutline, personCircleOutline, restaurant, videocamOutline } from "ionicons/icons"
import { Redirect, Route } from "react-router"
import CatatanHarian from "../Catatan/CatatanHarian"
import Kalori from "../Laporan/Kalori"
import Profile from "../Profile/ProfileUser";

const BottomTabs: React.FC = () =>{
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/mail" />
                <Route exact path="/tabs/mail" component={CatatanHarian}/>
                <Route exact path="/tabs/profile" component={Profile} />
                <Route exact path="/tabs/laporan" component={Kalori} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="ion-content-center">
                <IonTabButton tab="mail" href='/tabs/mail'>
                    <IonIcon icon={restaurant} />
                    <IonLabel>Catatan Harian</IonLabel>  
                </IonTabButton>   
                <IonTabButton tab="laporan" href='/tabs/laporan'>
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

export default BottomTabs;