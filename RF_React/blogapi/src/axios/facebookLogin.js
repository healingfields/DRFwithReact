import axios from 'axios'

const facebookLogin = (accessToken) => {
    console.log(accessToken);

    axios
        .post('http://127.0.0.1:8000/auth/convert-token',{
            token:accessToken,
            backend:'facebook',
            grant_type:'convert_token',
            client_id:'Z4bAkGwhhJATtS9ajFMDJwWlOk4Tg04zjqAJz7yk',
            client_secret:'jFs7OJ40GBgLEXgNomJMvGruk8NcF32qOrKddlLq5hJsgtJUn6iWWjS4yMSCncS5jKdE30UcWfAyKgAvlPjte9qxxnX3Cer09zamRXNrmxCw7fh5hECegNzrpHadinuD',
        })
        .then((res)=>{
            localStorage.setItem('access_token',res.data.accessToken);
            localStorage.setItem('refresh_token',res.data.refresh_token);
        });
};
export default facebookLogin;