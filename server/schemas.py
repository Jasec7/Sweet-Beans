from config import ma
from models import User, Store, Bean, Coffee
from marshmallow import validate, pre_load

class UserSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field(dump_only=True)
        name = ma.auto_field(required=True,
             validate=validate.Length(min=2, max=50, error="Name must be between 2 and 50 characters"))
        password = ma.auto_field(load_only=True,
                required=True,
                validate=validate.Length(min=8, error="Password must be at least 8 characters long"))

        class Meta:
             model = User
             load_instance = True

class StoreSchema(ma.SQLAlchemyAutoSchema):  
        id = ma.auto_field(dump_only=True)
        name = ma.auto_field(required=True,
             validate=validate.Length(min=2, max=50, error="Name must be between 2 and 50 characters"))
        address = ma.auto_field( required=True,
                validate=validate.Length(min=5, max=200))
        phone_number = ma.auto_field(required=True,
                     validate=validate.Regexp(
                           r'^[\d\-\+\(\)\s]{7,20}$',
                           error="Phone number must be valid"))

        class Meta:
             model = Store
             load_instance = True


class BeanSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field(dump_only=True)
        roast = ma.auto_field(required=True,
                validate=validate.OneOf(
                ["light", "medium", "dark"],
                error="Roast must be one of: light, medium, dark"))
        origin = ma.auto_field(required=True, validate=validate.Length(min=2, max=100))

        @pre_load
        def normalize_roast(self, data, **kwargs):
              if "roast" in data and isinstance(data["roast"], str):
                    data["roast"] = data["roast"].lower().strip()
              return data

        class Meta:
             model = Bean
             load_instance = True


class CoffeeSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field(dump_only=True)
        brand = ma.auto_field(required=True,
                validate=validate.Length(min=2, max=50, error="Brand name must be between 2 and 50 characters"))
        presentation = ma.auto_field(required=True,
                     validate=validate.OneOf(['Ground','Whole Bean'],
                     error ="Presentation must be one of: Ground, Whole Bean"))
        price = ma.auto_field(required=True,
                validate=validate.Range(min=0.01, error="Price must be greater than 0"))

        user_id = ma.auto_field(load_only=True)
        store_id = ma.auto_field(load_only=True)
        bean_id = ma.auto_field(load_only=True)

        store = ma.Nested(StoreSchema, dump_only=True)
        bean = ma.Nested(BeanSchema, dump_only=True)

        class Meta:
             model = Coffee
             load_instance = True
             include_fk = True


class UserWithStoresSchema(ma.SQLAlchemySchema):
        id = ma.auto_field()
        name = ma.auto_field()
      
        stores = ma.Nested(StoreSchema, many=True)
      
        class Meta:
            model = User
            load_instance = True


class UserWithBeansSchema(ma.SQLAlchemySchema):
        id = ma.auto_field()
        name = ma.auto_field()
      
        beans = ma.Nested(BeanSchema, many=True)

        class Meta:
            model = User
            load_instance = True


class UserWithCoffeesSchema(ma.SQLAlchemySchema):
        id = ma.auto_field()
        name = ma.auto_field()
      
        coffees = ma.Nested(CoffeeSchema, many=True)
      
        class Meta:
            model = User
            load_instance = True





