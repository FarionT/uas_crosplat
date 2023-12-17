import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import { addCircleOutline, addOutline, chevronForward, colorFill, searchOutline } from "ionicons/icons";
import man from '../../images/man.png';
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import '../../firebaseConfig';

const Album: React.FC = () => {
    const db = getFirestore();
    const [album, setAlbum] = useState<Array<any>>();
    useEffect(()=>{
        async function getData(){
          const querySnapshot = await getDocs(collection(db, "users-album"));
          console.log('querySnapshot: ', querySnapshot);
          setAlbum(querySnapshot.docs.map((doc)=>( {...doc.data(), id:doc.id})));
    
          querySnapshot.forEach((doc)=>{
            console.log(`${doc.id}=> ${doc.data()}`);
            console.log('doc: ', doc);
          })
        }
    
        getData()
      }, [])
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        {/* <IonBackButton style={{display: 'block'}} text="" icon={arrowBack}></IonBackButton> */}
                        <IonButton routerLink='/profile'>Back</IonButton>
                    </IonButtons>
                    <IonTitle>
                        (Logo) + NamaApp
                    </IonTitle>
                    <IonButton slot="end" routerLink="/add-photo">
                        <IonIcon icon={addOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {album && album.map((isi) => {
                    if(isi.email == localStorage.getItem("loginEmail")){
                        return(
                            <IonCard>
                                <img src={isi.foto} className="foto-album"/> 
                                <p>{isi.date}</p>
                            </IonCard>
                        )
                    }
                })}
            </IonContent>
        </IonPage>
    )
}

export default (Album);