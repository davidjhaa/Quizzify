import axios from "axios";
const backendUrl = `http://localhost:3001/user`;

export const registerAdmin = async ({ email, password, mobile, name }) => {
    try {
        const reqUrl = `${backendUrl}/signUp`;
        const response = await axios.post(reqUrl, {
            name,
            password,
            mobile,
            email,
        });
        return response;
    } 
    catch (error) {
        console.log(error);
    }
};

export const loginAdmin = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            password,
            email,
        });
        if (response.status === 200 && response.data?.token) {
            const { token, name, userId } = response.data;
            localStorage.setItem("token",token);
            localStorage.setItem("name", JSON.stringify(name));
            localStorage.setItem("userId", JSON.stringify(userId));
        }
        return response;
    } 
    catch (error) {
        console.log("error");
    }
};
