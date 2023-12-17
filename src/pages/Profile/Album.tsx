import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import { addCircleOutline, addOutline, arrowBackOutline, chevronForward, colorFill, searchOutline } from "ionicons/icons";
import man from '../../images/man.png';
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import '../../firebaseConfig';
import logo from '../../images/logo-no-background.png';

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
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        {/* <IonBackButton style={{display: 'block'}} text="" icon={arrowBack}></IonBackButton> */}
                        <IonButton routerLink='/profile'>
                            <IonIcon icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonImg slot="start" src={logo} alt="Healthu" style={{ paddingLeft: '10px', width: '85px' }} />
                    <IonTitle>
                        Album
                    </IonTitle>
                    <IonButton slot="end" routerLink="/add-photo">
                        <IonIcon icon={addOutline} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="light">
                {album && album.map((isi) => {
                    if(isi.email == localStorage.getItem("loginEmail")){
                        return(
                            <IonCard style={{ backgroundColor: '#f4f5f8'}}>
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