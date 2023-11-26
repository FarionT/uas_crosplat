import { IonAvatar, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import { addCircleOutline, addOutline, chevronForward, colorFill, searchOutline } from "ionicons/icons";
import spiderman from '../../images/spiderman.png';
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import '../../firebaseConfig';

const ProfileUser: React.FC = () => {
    const db = getFirestore();
    const [user, setUser] = useState<Array<any>>();
    const [userData, setUserData] = useState<Array<any>>();
    const [userNow, setUserNow] = useState();

    useEffect(()=>{
        async function getData(){
          const querySnapshot = await getDocs(collection(db, "users"));
          console.log('querySnapshot: ', querySnapshot);
          setUser(querySnapshot.docs.map((doc)=>( {...doc.data(), id:doc.id})));
    
          querySnapshot.forEach((doc)=>{
            console.log(`${doc.id}=> ${doc.data()}`);
            console.log('doc: ', doc);
          })
        }
    
        getData()
      }, [])

      useEffect(() => {
        if (user) {
            const currentUser = user.find(user => user.email === localStorage.getItem("loginEmail"));
            setUserNow(currentUser);
        }
    }, [user]);

    //   console.log(user);
    //   console.log(user?.find(x=>x.email==localStorage.getItem("loginEmail")));
    // const userNow = user?.map(x => x.email == localStorage.getItem("loginEmail"));
    // const userNowData = user?.map(x => x.email == localStorage.getItem("loginEmail"));
    
    // console.log(localStorage.getItem("loginEmail"))
    // console.log(userNow);
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
                <div className="ion-text-center ion-margin-bottom" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <IonAvatar>
                        <IonImg src={spiderman} alt="Avatar" />
                    </IonAvatar>
                    {/* <h2>{userNow.nama}</h2>
                    <p>{userNow.email}</p> */}
                    {userNow && (
                        <div>
                            <h2>{userNow.nama}</h2>
                            <p>{userNow.email}</p>
                            {/* Other components that use userNow */}
                        </div>
                    )}
                </div>
                <IonRow>
                    <IonCol>
                        <h2>Setting Umum</h2>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Berat Saya</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Update berat badan awal dan tujuan berat badan</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon icon={chevronForward} style={{ float: 'right' }} />
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Album Foto</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Berisikan kumpulan foto baik foto diri maupun makanan harian</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon icon={chevronForward} style={{ float: 'right' }} />
                        </IonCard>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Pengingat</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Tempat untuk mengatur pengingat atau Notif untuk user</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon icon={chevronForward} style={{ float: 'right' }} />
                        </IonCard>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <h2>Akun</h2>
                        <IonCard>
                            <IonCardHeader>
                                <IonCardTitle>Pengelolaan Akun</IonCardTitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <IonCardSubtitle>Mengubah Email, username, dan hapus akun</IonCardSubtitle>
                            </IonCardContent>
                            <IonIcon icon={chevronForward} style={{ float: 'right' }} />
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default (ProfileUser);