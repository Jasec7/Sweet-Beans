from config import db

class User(db.Model):
    __tablename__="users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.Integer)

    def __repr__(self):
        return f'<User {self.id}, {self.name}> '
    
class Store(db.Model):
    __tablename__="stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'<Store {self.id}, {self.name}, {self.address}, {self.phone_number}> '
    
class Bean(db.Model):
    __tablename__="beans"

    id = db.Column(db.Integer, primary_key=True)
    roast = db.Column(db.String, nullable=False)
    origin = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Bean {self.id}, {self.roast}, {self.origin}> '
    
class Coffee(db.Model):
    __tablename__="coffees"

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String, nullable=False)
    presentation = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    user_id = db.Column(db.Integer, ForeignKey=('users.id'))
    store_id = db.Column(db.Integer, ForeignKey=('stores.id'))
    bean_id = db.column(db.Integer, ForeignKey=('beans.id'))

    def __repr__(self):
        return f'<Coffee {self.id}, {self.brand}, {self.presentation}, {self.price}> '

