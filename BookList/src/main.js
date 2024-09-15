import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import App from './App.js'

const app = createApp(App)

app.mount('#app')

const apiKey = "AIzaSyDp62whMzhljQkJHUsJn53ovIros385yeo";
const sheetId = "1Bvdah21gDf0Iqg8hdoWb789-2gQGwuiHiwNyqncQtuE";
// Sheets 中要取得的資料範圍，格式如下
const range = "Sheet1!A:C";
// Sheets API 的 URL
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
 
// 使用 fetch 打 API
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error:", error));