import axios from "axios";


type authInputs = {
  email: string;
  password: string;
  username?: string;
};

type idType = string;


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
  const res = await axios.get(`https://webdev-music-003b5b991590.herokuapp.com/catalog/selection/ ${id}/`,{
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return res.data
}
