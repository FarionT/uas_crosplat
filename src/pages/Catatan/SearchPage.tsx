import React, { useEffect, useRef, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonImg,
} from '@ionic/react';

import { MAIL_DATA } from './CatatanHarian';
import { arrowBack, arrowBackOutline, search } from 'ionicons/icons';
import axios from 'axios';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { useHistory } from 'react-router';
import '../../firebaseConfig';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import logo from '../../images/logo-no-background.png';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const SearchPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('bf'); // State untuk dropdown
  const [searchTerm, setSearchTerm] = useState<string>(''); // State untuk input pencarian
  const inputFood = useRef<HTMLIonSearchbarElement>(null);
  const totalRef = useRef<HTMLIonInputElement>(null);
  const foodRef = useRef<HTMLIonSelectElement>(null);
  const [food, setFood] = useState();
  const [value, onChange] = useState<Value>(new Date());
  console.log(value);

  // function untuk mengambil data dari api berdasarkan input makanan dari user
  const searchFood = () => {
    const inputFood2 = inputFood.current?.value;
    console.log(inputFood2);
    if(inputFood != null){
        const response =  axios.get(
          `https://api.api-ninjas.com/v1/nutrition?query=${inputFood2}&X-Api-Key=RWS47gtQxSvJIDrkMggYIA==mMJvEYseqZhfqZuN`
        ).then((response) =>{
          setFood(response.data[0]);
          console.log(response.data[0]);
        })
    }
  }

  const history = useHistory();
  const db = getFirestore();

  // function untuk menambahkan makanan yang dimakan user ke firestore
  const addFoodToDatabase = async() => {
    console.log(value);
    const currEmail = localStorage.getItem("loginEmail");
    const totalFood = totalRef.current?.value;
    const foodCategory = foodRef.current?.value;
    try{
        const docRef = await addDoc(collection(db, "users-food"), {
          email: currEmail,
          category: foodCategory,
          foodName: food!.name,
          foodCalory: (food!.calories / food!.serving_size_g).toFixed(3),
          totalEaten: totalFood,
          tanggal: value?.toString().substring(4, 15)
        });
        console.log("Document written with ID: ", docRef.id);
        history.replace('/home')
        }catch(e){
          console.log("error adding document", e);
    }
    
  }

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar color="secondary">
                <IonButtons slot="start">
                    {/* <IonBackButton style={{display: 'block'}} text="" icon={arrowBack}></IonBackButton> */}
                    <IonButton routerLink='/home'>
                      <IonIcon icon={arrowBackOutline} />
                    </IonButton>
                </IonButtons>
                <IonImg slot="start" src={logo} alt="Healthu" style={{ paddingLeft: '10px', width: '85px' }} />
                <IonTitle>Search Page</IonTitle>
                {/* <IonSelect
                slot='end'
                placeholder= "Options"
                value={selectedCategory}
                >
                    <IonSelectOption value='bf'>Breakfast</IonSelectOption>
                    <IonSelectOption value='lh'>Lunch</IonSelectOption>
                    <IonSelectOption value='dn'>Dinner</IonSelectOption>
                    <IonSelectOption value='sc'>Snack</IonSelectOption>
                </IonSelect> */}
            </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
            <IonToolbar>
                <IonSearchbar
                    value={searchTerm}
                    placeholder="Cari makanan"
                    onIonChange={(e) => setSearchTerm(e.detail.value!)}
                    ref={inputFood}
                    style={{ marginTop: '20px'}}
                />
                <IonButton onClick={searchFood} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                  Search
                </IonButton>
            </IonToolbar>
            <IonCard style={{ backgroundColor: '#f4f5f8'}}>
                {food &&  (
                <IonCardContent>
                  <IonCardTitle>{food.name}</IonCardTitle>
                  <IonCardSubtitle>{food.calories / food.serving_size_g} per g</IonCardSubtitle>
                  <IonSelect
                  slot='end'
                  placeholder= "Options"
                  value={selectedCategory}
                  ref={foodRef}
                  >
                      <IonSelectOption value='bf'>Breakfast</IonSelectOption>
                      <IonSelectOption value='lh'>Lunch</IonSelectOption>
                      <IonSelectOption value='dn'>Dinner</IonSelectOption>
                      <IonSelectOption value='sc'>Snack</IonSelectOption>
                  </IonSelect>
                  <IonItem>
                      <IonLabel position="floating">Amount eaten (g)</IonLabel>
                      <IonInput type="number" ref={totalRef}/>
                  </IonItem>
                  <Calendar onChange={onChange} value={value} className="kalender" />
                  <IonButton slot='end' onClick={addFoodToDatabase}>
                    Add
                  </IonButton>
                </IonCardContent>
                )}
            </IonCard>
            {/* <IonCard>
              <IonCardContent>
                <IonCardTitle>Ayam Goreng</IonCardTitle>
                <IonCardSubtitle>500 kalori / 100g</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Kentang Goreng</IonCardTitle>
                <IonCardSubtitle>800 kalori / 100g</IonCardSubtitle>
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonCardContent>
                <IonCardTitle>Nasi Goreng</IonCardTitle>
                <IonCardSubtitle>700 kalori / 100g</IonCardSubtitle>
              </IonCardContent>
            </IonCard> */}
      </IonContent>
    </IonPage>
  );
}

export default SearchPage;
