import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonLabel, IonMenuButton, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar, withIonLifeCycle } from "@ionic/react";
import { addCircleOutline, addOutline, arrowBackOutline, camera, chevronForward, colorFill, searchOutline } from "ionicons/icons";
import man from '../../images/man.png';
import { useEffect, useState } from "react";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import '../../firebaseConfig';
import {getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useHistory } from "react-router";
import logo from "../../images/logo-no-background.png";

const AddPhoto: React.FC = () => {
    const db = getFirestore();
    const storage = getStorage();
    const history = useHistory();
    const [takenPhoto, setTakenPhoto] = useState<{
        path:string | undefined,
        preview:string
    }>();
    const [updateData, setUpdateData] = useState(false);

    // FUNCTION UNTUK MENGAMBIL FOTO
    const takePhotoHandler = async() => {

        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality:80,
            width:500
        })
        console.log(photo);

        if(!photo || /*!photo.path ||*/ !photo.webPath){
            return;
        }

        setTakenPhoto({
            path:photo.path,
            preview: photo.webPath
        })
    }

    // function untuk memasukkan foto ke dalam storage
    const insertHandler = async() => {
        const fileName = new Date().getTime() + '.jpeg';
        const photoBlob = await fetch(takenPhoto!.preview).then((res) => res.blob());
        const storageRef = ref(storage, fileName);

        // Mengunggah foto ke dalam storage
        uploadBytes(storageRef, photoBlob as Blob).then((snapshot)=>{
          console.log('upload file success');

          // Mendapatkan URL download foto setelah diunggah
          getDownloadURL(ref(storage, fileName)).then((url)=>{
            // Memanggil fungsi untuk menambahkan foto ke dalam Firestore
            addPhotoHandler(url);
          })
        })
      }

    // function untuk menambahkan 
    const addPhotoHandler = async(url:String) => {
        // if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType){
        //     return;
        // }
        // const url = "http://localhost/week10_lab_tugas/insert_new_memory.php";
        const jam = new Date();
        console.log(jam.toString().substring(4, 15));
        try{
            const docRef = await addDoc(collection(db, "users-album"), {
              email: localStorage.getItem("loginEmail"),
              date: jam.toString().substring(4, 15),
              foto: url
            });
            console.log("Document written with ID: ", docRef.id);

            setUpdateData(true);
        }catch(e){
            console.log("error adding document", e);
        }
        history.replace('/album');
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        {/* <IonBackButton style={{display: 'block'}} text="" icon={arrowBack}></IonBackButton> */}
                        <IonButton routerLink='/album'>
                            <IonIcon icon={arrowBackOutline} />
                        </IonButton>
                    </IonButtons>
                    <IonImg slot="start" src={logo} alt="Healthu" style={{ paddingLeft: '10px', width: '85px' }} />
                    <IonTitle className="add-photo-title">
                        Add Photo
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="light">
                <IonRow className='ion-text-center'>
                    <IonCol className="ion-align-items-center">
                        <div className="image-preview">
                            {!takenPhoto && <h3>No photo chosen.</h3>}
                            {takenPhoto && <img src={takenPhoto.preview} alt="preview" />}
                        </div>
                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera} />
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton onClick={insertHandler}>Add Photo</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )
}

export default (AddPhoto);