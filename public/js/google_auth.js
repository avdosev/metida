
const key="297808610716-d3tfkjmtcub79kbn9vio640u23hcpenv.apps.googleusercontent.com"

function init() {
    const _onInit = auth2 => {
        console.log('init OK', auth2)
    }

    const _onError = err => {
        console.log('error', err)
    }
    window.gapi.load('auth2', () => {
        window.gapi.auth2.init({ 
            client_id: key
        }).then(_onInit, _onError)
    })
}




function googleBtnClick() {
    const auth2 = window.gapi.auth2.getAuthInstance()
    let isAutorized = auth2.isSignedIn.get()
    if(!isAutorized) {
        auth2.signIn().then(googleUser => {
            // try {
            //     fetch("/register").then()
            // } catch (e) {
            //     try {
            //         fetch("/sign_In").then()
            //     }
            //     catch (e) {
            //         throw new Error("Google account not exists")
            //     }
            // }
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
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signOut().then( () => {
            console.log('User signed out.')
        }).then( () => {
            window.location.replace("/")

        })
    }
    console.log("are u autorized with google - ", isAutorized)
}


export { init, googleBtnClick }