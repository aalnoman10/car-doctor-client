import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const SocailLogin = () => {

    const { googleLogin, facebookLogin } = useContext(AuthContext)

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
            })
            .catch(er => {
                console.log(er);
            })
    }
    const handleFacebookLogin = () => {
        facebookLogin()
            .then(() => {
            })
            .catch(er => {
                console.log(er);
            })
    }

    return (
        <div>
            <hr />
            <div className="flex justify-center items-center p-5 gap-3">
                <button onClick={handleGoogleLogin} className="btn">G</button>
                <button className="btn">H</button>
                <button onClick={handleFacebookLogin} className="btn">F</button>
                <button className="btn">T</button>
            </div>
        </div>
    );
};

export default SocailLogin;