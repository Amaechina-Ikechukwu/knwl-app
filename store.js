import {create} from 'zustand'
const useStore = create((set) => ({
    isSignedIn:undefined,
    setIsSigned:(signedIn)=> set(() => ({
isSignedIn:signedIn
    }))
}))

export default useStore;