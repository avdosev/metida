import {signIn, logout} from "../../store/actions";
import {IPublicUser} from "../../components/Organisms/IPrivateUser";
import {ChangeHeader} from "../../store/typings/actionType";

// provider


const signInAction = (state: {user: IPublicUser}) => {
    return {
        user: state.user,
    }
}

const logoutAction = () => {
    return {
        user: null,
    }
}

// это будет нужно только consumer
export interface ChangeHeaderInterface {
    signIn: (state: IPublicUser) => ChangeHeader,
    logout: () => ChangeHeader,
}
const mapDispatchToProps = {
    signIn, logout
}

export {signInAction, logoutAction, mapDispatchToProps}