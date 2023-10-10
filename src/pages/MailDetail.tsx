import { useParams } from "react-router";
import { MAIL_DATA } from "./Mail";
import { IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const MailDetail: React.FC = () => {
    const mId = useParams<{mailId: string}>().mailId;
    const selectedMail = MAIL_DATA.find(m => m.id === mId);
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start" />
                    <IonTitle>
                        {selectedMail ? selectedMail?.subject: 'No mail found'}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>Mail ID: {mId}</h2>
            </IonContent>
        </IonPage>
    )
}

export default MailDetail;