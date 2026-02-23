from config import ma
from models import User, Store, Bean, Coffee

class UserSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field()
        name = ma.auto_field()
        password = ma.auto_field(load_only=True)

        class Meta:
             model = User
             load_instance = True



class StoreSchema(ma.SQLAlchemyAutoSchema):
        
        id = ma.auto_field()
        name = ma.auto_field()
        address = ma.auto_field()
        phone_number = ma.auto_field()

        class Meta:
             model = Store
             load_instance = True



class BeanSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field()
        roast = ma.auto_field()
        origin = ma.auto_field()

        class Meta:
             model = Bean
             load_instance = True


class CoffeeSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field()
        brand = ma.auto_field()
        presentation = ma.auto_field()
        price = ma.auto_field()

        user_id = ma.auto_field(load_only=True)
        store_id = ma.auto_field(load_only=True)
        bean_id = ma.auto_field(load_only=True)

        store = ma.Nested(StoreSchema, dump_only=True)
        bean = ma.Nested(BeanSchema, dump_only=True)

        class Meta:
             model = Coffee
             load_instance = True


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





