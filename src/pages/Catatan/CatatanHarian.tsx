import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonMenuButton, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, addOutline, colorFill, searchOutline } from "ionicons/icons";
import { MouseEventHandler } from "react";
import "./CatatanHarian.css";

export const MAIL_DATA = [
    {id: 'sp', subject: 'Sarapan', calori:'0'},
    {id: "ms", subject: 'Makan Siang', calori:'0'},
    {id: 'mm', subject: 'Makan Malam', calori:'0'},
    {id: 'sc', subject: 'Camilan / Snack', calori:'0'}
]

const CatatanHarian: React.FC = () => {
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

export default CatatanHarian;