import api from '../axios';

export const sendContactMessage = async (dto: {
  name: string;
  email: string;
  message: string;
}): Promise<{ message: string }> => {
  const response = await api.post('/api/Contact', dto);
  return response.data;
};