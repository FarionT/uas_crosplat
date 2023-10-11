import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, addOutline, colorFill, searchOutline } from "ionicons/icons";
import { MouseEventHandler } from "react";
import "./Calorie.css";

export const MAIL_DATA = [
    {id: 'sp', subject: 'Sarapan'},
    {id: "ms", subject: 'Makan Siang'},
    {id: 'mm', subject: 'Makan Malam'},
    {id: 'sc', subject: 'Camilan / Snack'}
]

const Mail: React.FC = () => {
    const handleSearchIcon = () => {
        console.log("Searching...");
    };
    

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonButton slot="end" onClick={handleSearchIcon} color="dark" href="/tabs/search">
                        <IonIcon icon={searchOutline} /> 
                    </IonButton>
                    <IonTitle>
                        Tanggal/Hari/Kalender
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {MAIL_DATA.map(mail=>(
                    <IonCard key={mail.id}>
                        <IonCardContent className="card">
                            <h2>{mail.subject}</h2>
                            <IonButton color="dark" href="/tabs/search">
                                <IonIcon icon={addOutline} />
                            </IonButton>
                        </IonCardContent>
                    </IonCard>
                ))}
            </IonContent>
        </IonPage>
    )
}

export default Mail;