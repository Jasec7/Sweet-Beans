from flask import request, make_response
from flask_restful import Resource

from config import app, db, api
from marshmallow import ValidationError
from models import  User, Store, Bean, Coffee
from schemas import UserSchema, StoreSchema, BeanSchema, CoffeeSchema

@app.route('/')
def index():
    return '<h1>Coffee Time</h1>'

class UserResource(Resource):
    def get(self):
        users = User.query.all()

        return UserSchema(many=True).dump(users), 200
    
    def post(self):
        try:
            data = UserSchema().load(request.get_json())
            
            new_user = User(
                name = data['name'])
            
            new_user.password_hash = data["password"]

            db.session.add(new_user)
            db.session.commit()

            return UserSchema().dump(new_user), 201
        
        except ValidationError as err:
            return {"errors": err.messages}, 400

    
class StoreResource(Resource):
    def get(self):
        stores = Store.query.all()
        
        return StoreSchema(many=True).dump(stores), 200

    def post(self):
        try:
            data = StoreSchema().load(request.get_json())
            
            new_store = Store(
                name = data['name'],
                address = data['address'],
                phone_number = data['phone_number'])
            
            db.session.add(new_store)
            db.session.commit()

            return StoreSchema().dump(new_store), 201
        
        except ValidationError as err:
            return {"errors": err.messages}, 400

class BeanResource(Resource):
    def get(self):
        beans = Bean.query.all()

        return BeanSchema(many=True).dump(beans), 200

    def post(self):
        try:
            data = BeanSchema().load(request.get_json())
            
            new_bean = Bean(
                roast = data['roast'],
                origin = data['origin'])
            
            db.session.add(new_bean)
            db.session.commit()

            return BeanSchema().dump(new_bean), 201
        
        except ValidationError as err:
            return {"errors": err.messages}, 400

class CoffeeResource(Resource):
    def get(self):
        coffees = Coffee.query.all()

        return CoffeeSchema(many=True).dump(coffees), 200
    
    def post(self):
        try:
            data = CoffeeSchema().load(request.get_json())
            
            new_coffee = Coffee(
                brand = data['brand'],
                presentation = data['presentation'],
                price = data['price'],
                user_id = data['user_id'],
                store_id = data['store_id'],
                bean_id = data['bean_id'])
            
            db.session.add(new_coffee)
            db.session.commit()

            return StoreSchema().dump(new_coffee), 201
        
        except ValidationError as err:
            return {"errors": err.messages}, 400


class CoffeeResourceId(Resource):
    def patch(self, id):
        coffee = Coffee.query.get(id)

        if not coffee:
            return {"error": "Coffee not found"}, 404

        try:
            data = CoffeeSchema(partial=True).load(request.get_json())

            for key, value in data.items():
                setattr(coffee, key, value)

            db.session.commit()

            return CoffeeSchema().dump(coffee), 200

        except ValidationError as err:
            return {"errors": err.messages}, 400

    def delete(self, id):
        coffee = Coffee.query.filter_by(id=id).first()

        if not coffee:
            return {"error": "Coffee not found"}, 404


        db.session.delete(coffee)
        db.session.commit()

        return "", 204
        
    
api.add_resource(UserResource,'/users')
api.add_resource(StoreResource,'/stores')
api.add_resource(BeanResource,'/beans')
api.add_resource(CoffeeResource,'/coffees')
api.add_resource(CoffeeResourceId,'/coffees/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)