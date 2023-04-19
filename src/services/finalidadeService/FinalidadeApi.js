import axios from "axios";

const baseUrl = "http://localhost:8080/finalidades";

export const FinalidadeApi = {
    async getAll(){
        try {
            const response = await axios.get(`${baseUrl}`);
      return response.data;
        } catch (error) {
             console.error(error);
        }
    }

}