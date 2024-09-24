const socket = new WebSocket('wss://api.fugle.tw/marketdata/v1.0/stock/streaming');
const API_KEY = 'OTNkZWFjMTYtYWVhYS00NmRhLWExYjktNjczNWY1NTUzOGU4IGEyMmFkYjAxLWIyYjAtNGZiOC1iNmViLTI0YzI1NmM4OWFlYw=='

socket.onopen = () => {
  socket.send(
    JSON.stringify({
      event: 'auth',
        data: {
          apikey: API_KEY,
      },
    }),
  );

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data);

    if (data.event === 'authenticated') {
      socket.send(
        JSON.stringify({
          event: 'subscribe',
          data: {
            channel: 'trades',
            symbol: '2330',
          },
        }),
      );
    }

    console.log(data);
  };
};