import tmdbClient from '../api/axiosConfig';
import type { PersonDetails } from '@/types';

const BASE_URL = '/person';

export const personService = {
  async getDetails(id: number): Promise<PersonDetails> {
    const response = await tmdbClient.get(
      `${BASE_URL}/${id}?language=es-ES&append_to_response=movie_credits,tv_credits,images,external_ids`
    );
    return response.data;
  },
};
