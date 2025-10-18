import './App.css'
import { useEffect } from 'react'
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';

function App() {

  async function requestNotificationpermission() {
    const permission = await Notification.requestPermission();
    if(permission === 'granted') {
      // Generate token or perform actions upon permission granted
      const token = await getToken(messaging, {
        vapidKey: 'BELve1xXPeTSgCv2hBmRzA_t7adT_9erYQqynSrcWr5dRMp3NOYi8CgvJk4V17kZylD7YLIDnrFfGGl_KLdQYvA'
      });
      console.log('Token generated: ', token);
      // Send this token to server or save (DB)
      
    }else if(permission === 'denied') {
      //new Notification('Notification permission denied!')
      alert('You denied for the notification');
    }
  }

  useEffect(() => {
    // Request user for notification permission on component mount
    requestNotificationpermission();
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
