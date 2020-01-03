

function init() {
    const _onInit = auth2 => {
        console.log('init OK', auth2)
    }

    const _onError = err => {
        console.log('error', err)
    }

    window.gapi.load('auth2', () => {
        window.gapi.auth2.init({ 
            client_id: "297808610716-d3tfkjmtcub79kbn9vio640u23hcpenv.apps.googleusercontent.com"
        }).then(_onInit, _onError)
    
    })
}




function googleBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance()
    if(auth2.isAuthorized()) {
        auth2.signIn().then(googleUser => {
    
            const profile = googleUser.getBasicProfile()
            console.log('ID: ' + profile.getId()) // не посылай подобную информацию напрямую, на ваш сервер!
            console.log('Full Name: ' + profile.getName())
            console.log('Given Name: ' + profile.getGivenName())
            console.log('Family Name: ' + profile.getFamilyName())
            console.log('Image URL: ' + profile.getImageUrl())
            console.log('Email: ' + profile.getEmail())
      
            const id_token = googleUser.getAuthResponse().id_token
            console.log('ID Token: ' + id_token)
          }).then( () => {
              window.location.replace("/")
          })
    }
    else {
        signOut = () => {
            const auth2 = window.gapi.auth2.getAuthInstance()
            auth2.signOut().then( () => {
                console.log('User signed out.')
            }).then( () => {
                window.location.replace("/")
            })

        }
    }


}


export { init, googleBtnClick }