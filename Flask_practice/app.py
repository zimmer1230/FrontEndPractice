from flask import Flask
import random

app=Flask(__name__)

# 建立網站首頁回應方式
@app.route("/")

# 回覆內容函式
def index():    
    
    return "Hello flask, you are " + str(random.randrange(0,100)) + " member"

app.run()