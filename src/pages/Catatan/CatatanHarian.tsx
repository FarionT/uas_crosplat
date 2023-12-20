import { IonAlert, IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonIcon, IonImg, IonMenuButton, IonModal, IonPage, IonSearchbar, IonTitle, IonToolbar } from "@ionic/react";
import { addCircleOutline, addOutline, colorFill, searchOutline, trash, trashBin, trashOutline } from "ionicons/icons";
import { MouseEventHandler, useEffect, useState } from "react";
import "./CatatanHarian.css";
import { collection, getDoc, getDocs, getFirestore } from "firebase/firestore";
import 'react-calendar/dist/Calendar.css';
import '../../firebaseConfig';
import { render } from "react-dom";
import Calendar from 'react-calendar';
import { doc, deleteDoc } from "firebase/firestore";
import logo from '../../images/logo-no-background.png'
import { useHistory } from "react-router";


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const MAIL_DATA = [
    {id: 'sp', subject: 'Sarapan', calori:'0'},
    {id: "ms", subject: 'Makan Siang', calori:'0'},
    {id: 'mm', subject: 'Makan Malam', calori:'0'},
    {id: 'sc', subject: 'Camilan / Snack', calori:'0'}
]

const CatatanHarian: React.FC = () => {
    const [value, onChange] = useState<Value>(new Date());
    const [pageTitle, setPageTitle] = useState<string>("");
    const [confirm, setConfirm] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [foodNow, setFoodNow] = useState('');
    const history = useHistory();

    const [toastMessage, setToastMessage] = useState('');
    // const [userNow, setUserNow] = useState<UserData | undefined>();

    console.log(value?.toString().substring(4, 15));
    const handleSearchIcon = () => {
        console.log("Searching...");
    };

    const db = getFirestore();

    const [food, setFood] = useState<Array<any>>();
    
    // untuk mengambil data makanan yang telah dimakan dari firestore
    useEffect(()=>{
        async function getData(){
            const querySnapshot = await getDocs(collection(db, "users-food"));
            console.log('querySnapshot: ', querySnapshot);
            setFood(querySnapshot.docs.map((doc)=>( {...doc.data(), id:doc.id})));
            // setFood(food?.filter(x => x.email == localStorage.getItem("loginEmail")));
            // const dataBaru = food?.filter(x => x.email == localStorage.getItem("loginEmail"));
            // setFood(dataBaru);
            console.log(food);
        
            querySnapshot.forEach((doc)=>{
                console.log(`${doc.id}=> ${doc.data()}`);
                console.log('doc: ', doc);
            })
            console.log(food);
        }
    
        getData();
        updatePageTitle();
    }, [value]);

    // untuk melakukan update pada judul di tengah atas page
    const updatePageTitle = () => {
        if (value instanceof Date) {
            setPageTitle(`${value.toLocaleString('id-ID', { weekday: 'long' })}, ${value.getDate()} ${value.toLocaleString('id-ID', { month: 'long' })} ${value.getFullYear()}`);
        }
    };
    
    // untuk delete makanan
    const deleteFood = async () => {
        try {
          // const userRef = doc(db, 'users', userNow.id);
          await deleteDoc(doc(db, 'users-food', foodNow));
      
          // Fetch the updated user data from Firebase
          // const updatedUserSnapshot = await getDoc(userRef);
          // const updatedUser = { ...(updatedUserSnapshot.data() as UserData), id: updatedUserSnapshot.id };
      
          // console.log('Deleted user food from Firebase:', updatedUser);
      
          // Update the userNow state with the updated data    
          showToastMessage('Makanan berhasil dihapus');
      
          // Update the food state after deletion
          const updatedFood = food?.filter((item) => item.id !== foodNow);
          setFood(updatedFood);
      
          // Navigate back to the profile page
          history.replace('/home');
        } catch (error: any) {
          console.error('Error updating username:', error.message);
          showToastMessage('Terjadi kesalahan. Coba lagi nanti.');
        }
        setConfirm(false);
      };

    // untuk menampilkan pesan toast
    const showToastMessage = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
      };

    const openHandler = () => {
        console.log(foodNow);
        setConfirm(true);
    }

    // untuk close alert
    const confirmHandler = () => {
        setConfirm(false);
    }

    return(
        <IonPage >
            <IonAlert isOpen={confirm}
                header="Are you sure?"
                message="Do you want to delete this food? This cannot be undone"
                buttons={[
                {text:'No', role:'cancel', handler: () => {confirmHandler()}},
                {text:'Yes', handler: () => {deleteFood()}},
                ]}
            />
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonImg slot="start" className="logo-catatan" src={logo} alt="Healthu" />
                    <IonButton className="button-search" slot="end" onClick={handleSearchIcon} color="primary" href="/search">
                        <IonIcon icon={searchOutline} /> 
                    </IonButton>
                    <IonTitle className="title-catatan">
                        {pageTitle}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color="light">
            <div className="kalender-wrapper">
                <Calendar
                    onChange={onChange}
                    value={value}
                    className="kalender"
                />
            </div>
                <IonCard className="breakfast-category">
                    <IonCardContent className="card">
                        <h2>Breakfast</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'bf' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                        <IonIcon
                                            slot="end"
                                            icon={trash}
                                            onClick={() => {
                                            setFoodNow(makanan.id);
                                            openHandler();
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
                <IonCard className="lunch-category">
                    <IonCardContent className="card">
                        <h2>Lunch</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'lh' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                        <IonIcon
                                            slot="end"
                                            icon={trash}
                                            onClick={() => {
                                            setFoodNow(makanan.id);
                                            openHandler();
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
                <IonCard className="dinner-category">
                    <IonCardContent className="card">
                        <h2>Dinner</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'dn' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                        <IonIcon
                                            slot="end"
                                            icon={trash}
                                            onClick={() => {
                                            setFoodNow(makanan.id);
                                            openHandler();
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
                <IonCard className="snack-category">
                    <IonCardContent className="card">
                        <h2>Snack</h2>
                        {food && food?.map((makanan) => {
                            if(makanan.category == 'sc' && makanan.email == localStorage.getItem("loginEmail") && makanan.tanggal == value?.toString().substring(4, 15)){
                                return(
                                    <div className="content-card-isi" key={makanan.id}>
                                        <p>{makanan.foodName}</p><br/>
                                        <p>{makanan.totalEaten} g</p>
                                        <IonIcon
                                            slot="end"
                                            icon={trash}
                                            onClick={() => {
                                            setFoodNow(makanan.id);
                                            openHandler();
                                            }}
                                        />
                                    </div>
                                )
                            }
                        })}
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}

export default CatatanHarian;

function setPageTitle(arg0: string) {
    throw new Error("Function not implemented.");
}
