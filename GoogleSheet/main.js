const API_key = 'AIzaSyDp62whMzhljQkJHUsJn53ovIros385yeo';
const SheetID = '1Bvdah21gDf0Iqg8hdoWb789-2gQGwuiHiwNyqncQtuE';
const range = 'Sheet1!A2:C';
const url = `https://sheets.googleapis.com/v4/spreadsheets/${SheetID}/values/${range}`;




  
let sheety_url = 'https://api.sheety.co/47ac78e82878b8ee52ccc3293ef8c182/bookList/sheet1';
let body = {
    sheet1: {
        bookname: 'FLOWERS',
        author: 'yaya',
        rate:   '4.8'
  }
};
fetch(sheety_url, {
  method: 'POST',
  headers:{
    'Content-type': 'application/json'
  },
  body: JSON.stringify(body)
})
.then((response) => {
    console.log(response);
    return response.json();
}).then( data => console.log(data) );
  // POST https://sheets.googleapis.com/v4/spreadsheets/SPREADSHEET_ID/values/Sheet1!A1:E1:append?valueInputOption=VALUE_INPUT_OPTION

// 使用 fetch 打 API

// fetch(url+`?key=${API_key}`)
//   .then((response) => response.json())
//   .then((data) => {
//     data.values = data.values.map( ([book, author, rate])=> ({'book': book, 'author': author, 'rate': rate}) );
//     console.log(data);
//   })
//   .catch((error) => console.error("Error:", error));


  // 使用 fetch append