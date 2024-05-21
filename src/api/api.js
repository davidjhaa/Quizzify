import axios from "axios";
const backendUrl = `http://localhost:3001/api/v1/auth`;

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
            const { token, name, adminId } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("name", name);
            localStorage.setItem("adminId", adminId);
        }
        return response;
    } 
    catch (error) {
        console.log("error");
    }
};
