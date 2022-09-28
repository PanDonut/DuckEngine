export default function GetLoginData() {
    if (localStorage.getItem("mail") == null || localStorage.getItem("name") == null || localStorage.getItem("uid") == null) {
        return null
    } else {
        return {
            mail: localStorage.getItem("mail"),
            name: localStorage.getItem("name"),
            uid: localStorage.getItem("uid")
        }
    }
}