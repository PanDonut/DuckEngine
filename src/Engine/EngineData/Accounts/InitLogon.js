import { Start } from '../Splash';
import GetLoginData from './GetLogonData';
import LogonPage from './logon.html';

export default function InitializeLogon(_self) {
    const event = new Event('onGameLogin');
    window.onmessage = (e) => {
        window.dispatchEvent(event);
        window.ongamelogin()
        window.location.reload();
    }
    if (localStorage.getItem("mail") == null || localStorage.getItem("name") == null || localStorage.getItem("uid") == null) {
        var page = [LogonPage];
        window.open(LogonPage, '_blank', 'frame=false,width=500,height=600');
    } else {
        window.dispatchEvent(event)       
        window.ongamelogin()
    }
}