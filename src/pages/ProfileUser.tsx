import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, addOutline, colorFill, searchOutline } from "ionicons/icons";


const ProfileUser: React.FC = () => {
    
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        (Logo) + NamaApp
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>INI ADALAH PAGE USER</h1>
            </IonContent>
        </IonPage>
    )
}

export default ProfileUser;