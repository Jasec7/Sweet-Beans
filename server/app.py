from flask import request, make_response
from flask_restful import Resource

from config import app, db, api
from models import  User, Store, Bean, Coffee

@app.route('/')
def index():
    return '<h1>Coffee Time</h1>'




if __name__ == '__main__':
    app.run(port=5555, debug=True)