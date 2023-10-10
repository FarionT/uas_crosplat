import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { ban, banSharp, create, trash } from "ionicons/icons";
import { useRef } from "react";
import hulk from '../images/hulk.jpg';
import ironman from '../images/ironman.jpeg';
import spiderman from '../images/spiderman.png';
import './meet.css';

export const FRIENDS_DATA =  [
    {id: 'f1', name: 'John Thor', img:hulk},
    {id: 'f2', name: 'John Ness', img:ironman},
    {id: 'f3', name: 'John Doe', img:spiderman}
]

const Meet:React.FC = () =>{
    
    const callFriendHandler = () =>{
        console.log("Calling...");
    }
    
    const slidingOptionRef = useRef<HTMLIonItemSlidingElement>(null);
    const blockFriendHandler = () =>{
        slidingOptionRef.current?.closeOpened();
        console.log("Blocking...");
    }
    const deleteFriendHandler = () =>{
        slidingOptionRef.current?.closeOpened();
        console.log("Deleting...");
    }
    const editFriendHandler = () =>{
        slidingOptionRef.current?.closeOpened();
        console.log("Editing...");
    }

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        Ionic Meet
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {FRIENDS_DATA.map(friend=>(
                        <IonItemSliding key={friend.id} ref={slidingOptionRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon slot="icon-only" icon={ban} />
                                </IonItemOption>
                                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                    <IonIcon slot="icon-only" icon={trash} />
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItem key={friend.id} lines="full" button onClick={callFriendHandler}> 
                                <IonImg src={friend.img} className="foto-orang" />
                                <IonLabel>{friend.name}</IonLabel>
                            </IonItem>
                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={editFriendHandler}>
                                    <IonIcon slot="icon-only" icon={create} />
                                </IonItemOption>
                            </IonItemOptions>
                        </IonItemSliding>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    )
}

export default Meet;