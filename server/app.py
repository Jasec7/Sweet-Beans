from flask import request, make_response
from flask_restful import Resource

from config import app, db, api
from models import  User, Store, Bean, Coffee
from schemas import UserSchema, StoreSchema, BeanSchema, CoffeeSchema

@app.route('/')
def index():
    return '<h1>Coffee Time</h1>'

class UserResource(Resource):
    def get(self):
        users = User.query.all()

        return UserSchema(many=True).dump(users), 200
    
class StoreResource(Resource):
    def get(self):
        stores = Store.query.all()
        
        return StoreSchema(many=True).dump(stores), 200

    def post(self):
        pass

class BeanResource(Resource):
    def get(self):
        beans = Bean.query.all()

        return BeanSchema(many=True).dump(beans), 200

    def post(self):
        pass

class CoffeeResource(Resource):
    def get(self):
        coffees = Coffee.query.all()

        return CoffeeSchema(many=True).dump(coffees), 200


class CoffeeResourceId(Resource):
    def patch(self, id):
        pass

    def delete(self, id):
        pass
    
api.add_resource(UserResource,'/users')
api.add_resource(StoreResource,'/stores')
api.add_resource(BeanResource,'/beans')
api.add_resource(CoffeeResource,'/coffees')


if __name__ == '__main__':
    app.run(port=5555, debug=True)