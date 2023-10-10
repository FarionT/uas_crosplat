import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";

const Spam: React.FC = () =>{
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        Spam
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>This is spam</h2>
            </IonContent>
        </IonPage>
    )
}

export default Spam;