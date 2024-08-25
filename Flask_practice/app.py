from flask import Flask
import random

app=Flask(__name__, static_folder="public", static_url_path="/www")

# 建立網站首頁回應方式

@app.route("/hello")
def hello():
    return "It seems you find my secret!"

@app.route("/user/<username>")
def handlerUser(username):
    return "hello! " + username
app.run()