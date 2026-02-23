from config import ma
from models import User, Store, Bean, Coffee

class UserSchema(ma.SQLAlchemyAutoSchema):
        id = ma.auto_field()
        name = ma.auto_field()
        password = ma.auto_field()

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

        class Meta:
             model = Coffee
             load_instance = True





