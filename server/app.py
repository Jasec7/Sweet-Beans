from flask import request, make_response
from flask_restful import Resource

from config import app, db, api
from models import  User, Store, Bean, Coffee
from schemas import UserSchema, UserWithStoresSchema, UserWithBeansSchema, UserWithCoffeesSchema

@app.route('/')
def index():
    return '<h1>Coffee Time</h1>'

class UserResource(Resource):
    def get(self):
        users = User.query.all()

        return UserSchema(many=True).dump(users), 200
    
api.add_resource(UserResource,'/users')


if __name__ == '__main__':
    app.run(port=5555, debug=True)