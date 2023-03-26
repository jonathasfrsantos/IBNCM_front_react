import axios from "axios";

const baseUrl = "http://localhost:3000/lancamentos"; // criar uma constante da URL da API servidor

export const api = {
  async getAll() {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async create(data) {
    try {
      const response = await axios.post(`${baseUrl}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async delete(id) {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  
  async update(id, data){
    try {
      const response = await axios.put(`${baseUrl}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      
    }
  }
};