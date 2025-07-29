import axios from 'axios';

type authInputs = {
  email: string;
  password: string;
  username?: string;
};

type idType = string;

type tokenType = {
  refresh: string;
  access: string;
};

export const fetchSignIn = (data: authInputs) => {
  return axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/login/',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const fetchMusic = async () => {
  const response = await fetch(
    'https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/',
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('Ошибка при загрузке треков');
  }

  const data = await response.json();
  return data.data;
};

export const fetchSignUp = (data: authInputs) => {
  return axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/signup/ ',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

export const fetchCategoryMusic = async (id: idType) => {
  const res = await axios.get(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/ ${id}/`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return res.data;
};

export const getToken = async (data: authInputs): Promise<tokenType> => {
  const res = await axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/token/',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return res.data;
};

export const refreshToken = async (
  refresh: string,
): Promise<{ access: string }> => {
  const res = await axios.post(
    'https://webdev-music-003b5b991590.herokuapp.com/user/token/refresh/',
    refresh,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  return res.data;
};

export const addLike = async (access: string, id: number) => {
  return await axios.post(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`, {},
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const removeLike = async (access: string, id: number) => {
  return await axios.delete(
    `https://webdev-music-003b5b991590.herokuapp.com/catalog/track/${id}/favorite/`,
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  );
};

export const favoriteTracks = async (access: string) => {
  const res = await axios.get("https://webdev-music-003b5b991590.herokuapp.com/catalog/track/favorite/all/",
    {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
  )
  return res.data
}