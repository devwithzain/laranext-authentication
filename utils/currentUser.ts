import axios from 'axios';
export const getUserData = async (token: string | undefined | null) => {
   try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_LARAVELA_URL}/user`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
   }
};