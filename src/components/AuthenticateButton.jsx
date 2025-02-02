import GrayButton from './GrayButton'
import { redirectToAuth } from "../js/OAuth"

export default function AuthenticateButton({ imageId, redirectUri }) {
  //<!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
  const unsplashIcon = <svg width='16' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M448 230.2V480H0V230.2H141.1V355.1H306.9V230.2zM306.9 32H141.1V156.9H306.9z" /></svg>;
 
    return (
    <GrayButton text={'Login'} icon={unsplashIcon} callback={() => { redirectToAuth(imageId, redirectUri) }} />
  )
}
