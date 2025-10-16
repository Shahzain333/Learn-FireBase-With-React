import './App.css'
import { getFirestore, collection, addDoc, doc, getDoc, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'
import {app} from './firebase'

const firestore = getFirestore(app)

function App() {
  
  const writeData = async () => {
    try {

      const result = await addDoc(collection(firestore, "cities"), {
        name: 'Karachi',
        pinCode: 1234,
        lat: 123,
        lon: 456
      })

      console.log("Result : ",result)

    } catch (error) {
      console.error("Error adding document: ", error);
    }
    
  }

  const makeSubCollection = async () => {
     try {

      const result = await addDoc(collection(firestore, "cities/ID/places"), {
        name: 'This is a Place',
        desc: 'Awsm Desc',
        date: Date.now()
      })

      console.log("Result : ",result)

    } catch (error) {
      console.error("Error adding document: ", error);
    }
    
  }

  const getDocument = async () => {
    
    const ref = doc(firestore,"cities","ID");
    const snapshot = await getDoc(ref);

    console.log(snapshot.data());
  }

  const getDocumentsByQuery = async () => {

    const collectionRef = collection(firestore,'users');
    const Query = query(collectionRef, where("isMale", "==", true));

    const snapShot = await getDocs(Query);

    snapShot.forEach((data) => console.log(data.data()));
  }

  const updateDocument = async () => {
    const docRef = doc(firestore, 'cities', 'ID');
    await updateDoc(docRef, {
      name: 'New karachi'
    })
  }

  const delDocument = async () => {
    await deleteDoc(doc(firestore, "cities", "ID")); 
  }
  
  return (
    <div className='App'>
      <h1>FireBase DB</h1>
      <button onClick={writeData}>Put Data</button>
      <button onClick={makeSubCollection}>Sub Put Data</button>
      <button onClick={getDocument}>Get Doc</button>
      <button onClick={getDocumentsByQuery}>Get Docs By Query</button>
      <button onClick={updateDocument}>Update</button>
      <button onClick={delDocument}>Delete</button>
    </div>
  )
}

export default App
