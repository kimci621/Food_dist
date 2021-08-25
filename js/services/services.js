//Функция с async/await для 'POST' fetch запроса
const PostData = async (serverURL, dataOut) => {
  const response = await fetch(serverURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: dataOut
  });
  return await response.json();
};

export {
  PostData
};

//Функция с async/await для 'GET' fetch запроса
const getData = async (serverURL) => {
  const response = await fetch(serverURL);
  if (!response.ok) {
    // new Error(текст); вывод ошибки с текстом 
    throw new Error(`Could not fetch ${serverURL}, status ${response.status}`);
    // throw - вывод, выпадание, отображение
  }
  return await response.json();
};

export {
  getData
};