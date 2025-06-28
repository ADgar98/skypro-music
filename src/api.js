export const fetchSignIn = (email, password) => {
  fetch('https://webdev-music-003b5b991590.herokuapp.com/user/login/', {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      'content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
};

export const fetchMusic = async () => {
  const response = await fetch('https://webdev-music-003b5b991590.herokuapp.com/catalog/track/all/',  {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Ошибка при загрузке треков');
  }

  const data = await response.json();
  return data.data; 
};