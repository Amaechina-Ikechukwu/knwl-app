import { View, Text, FlatList, TouchableOpacity, useColorScheme } from 'react-native'
import React,{useState} from 'react'
import VersalBox from '../../../constants/VersalBox'
import { Avatar, Box, PresenceTransition, VStack } from 'native-base'
import BrandButton from '../../../constants/BrandButton'
import BrandText from '../../../constants/BrandText'



  

const AddPhoto = () => {
const colors =['background','accent','success','error']
const [selectedId, setSelectedId] = useState(undefined);
const colorScheme = useColorScheme()
const [createAvatar,setCreateAvatar]=useState(false)
  return (
    <VersalBox> <VStack w={'full'}  h='full' space={5} alignItems={'center'} justifyContent={'center'}>
        <BrandText text={'Add a photo'} size={30} />
     <Avatar  bg={colorScheme+'.'+colors[selectedId] || 'light.accent'} alignSelf="center" size="2xl" w={300} h={300} source={{
        uri: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80"
      }}></Avatar>  
      
      
<BrandButton text={'Open Gallery'} textcolor={'dark.text'} />
<BrandButton disabled={createAvatar} color={colorScheme+'.success'} textcolor={'dark.text'} text={'Create Avatar With Your Photo'}/>
       </VStack>
    
    </VersalBox>
  )
}

export default AddPhoto