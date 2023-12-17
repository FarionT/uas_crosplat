import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react"
import { barChart, mailOutline, personCircleOutline, restaurant, videocamOutline } from "ionicons/icons"
import { Redirect, Route } from "react-router"
import CatatanHarian from "../Catatan/CatatanHarian"
import Kalori from "../Laporan/Kalori"
import Profile from "../Profile/ProfileUser";
import { IonReactRouter } from "@ionic/react-router"
import Album from "../Profile/Album"
import AddPhoto from "../Profile/AddPhoto"
import kelolaAkun from "../Profile/PengelolaanAkun"


const BottomTabs: React.FC = () =>{
    return(
        <IonReactRouter>
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/home" to="/catatan" />
                <Route exact path="/catatan" component={CatatanHarian}/>
                <Route exact path="/profile" component={() => <Profile />} />
                <Route exact path="/laporan" component={Kalori} />
                <Route exact path="/album" component={Album} />
                <Route exact path="/add-photo" component={AddPhoto} />
                <Route exact path="/kelolaAkun" component={kelolaAkun} />

            </IonRouterOutlet>
            <IonTabBar slot="bottom" className="ion-content-center">
                <IonTabButton tab="catatan" href='/catatan'>
                    <IonIcon icon={restaurant} />
                    <IonLabel>Catatan Harian</IonLabel>  
                </IonTabButton>   
                <IonTabButton tab="laporan" href='/laporan'>
                    <IonIcon icon={barChart} />
                    <IonLabel>Laporan</IonLabel>  
                </IonTabButton>
                <IonTabButton tab="profile" href='/profile'>
                    <IonIcon icon={personCircleOutline} />
                    <IonLabel>Saya</IonLabel>  
                </IonTabButton>
            </IonTabBar> 
        </IonTabs>
        </IonReactRouter>
    )
}

export default BottomTabs;