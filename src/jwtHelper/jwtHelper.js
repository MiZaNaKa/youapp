import AsyncStorage from "@react-native-async-storage/async-storage"

class jwtHelper{
    async UserInfo(){
        var user=await AsyncStorage.getItem("userInfo")
        return JSON.parse(user);
    }

    async jwt(){
        var jwt=await AsyncStorage.getItem("jwt")
        return jwt;
    }

    async deleteJWT(){
        await AsyncStorage.removeItem("userInfo");
        return await AsyncStorage.removeItem("jwt");
    }
}

export default new jwtHelper()