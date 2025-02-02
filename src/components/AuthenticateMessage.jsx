import Description from "./Description";
import AuthenticateButton from "./AuthenticateButton";
import { useAuthStore } from "../zustandstore/store";

export default function AuthenticateMessage({ imageId, redirectUri }) {
  const setDisplayAuthMessage = useAuthStore(state => state.setDisplayAuthMessage);
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen fixed bg-ntrl-clr-200 bg-opacity-40 inset-0">
      <div className="absolute inset-0 bg-ntrl-clr-200 bg-opacity-40 inset-0" onClick={() => {setDisplayAuthMessage(false)}}></div>
        <div className={'flex flex-col gap-4 aspect-square items-center justify-center absolute text-center w-4/5 sm:w-4/12 p-4  bg-white rounded-[0.5rem] shadow-lg'}>
          <button
            className="absolute top-4 right-4 p-2"
            onClick={() => setDisplayAuthMessage(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="16" height="16">
              <path d="M310.6 361.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L160 245.3 54.6 361.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L114.7 200 9.4 94.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 154.7 265.4 49.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L205.3 200l105.3 105.4z" />
            </svg>
          </button>
          <Description text='Login using unsplash to view and manage your collections' />
          <AuthenticateButton imageId={imageId} redirectUri={redirectUri}/>
        </div>
      </div>

    </>
  )
}
