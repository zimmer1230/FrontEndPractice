from flask import Flask
from flask import request
import random

app=Flask(__name__, static_folder="public", static_url_path="/www")

# 建立網站首頁回應方式
@app.route("/")
def index():
    print("Method: ", request.method )
    print("Protocal: ",request.scheme )
    print("HostName:", request.host)
    print("Path", request.path)
    print("Agent:", request.headers.get("user-agent"))
    print("Language preference:", request.headers.get("accept-language"))
    print("Referrer: ", request.headers.get("referrer"))
    lang = request.headers.get("accept-language")
    if lang.startswith("en"):
        return "Hello frisk... no flask."
    else:
        return "你好 "

@app.route("/hello")
def hello():
    return "It seems you find my secret!"

@app.route("/user/<username>")
def handlerUser(username):
    return "hello! " + username
app.run()