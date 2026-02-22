from config import db
from sqlalchemy import ForeignKey

class User(db.Model):
    __tablename__="users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)

    stores = db.relationship('Store', secondary='coffees', back_populates='users')
    beans = db.relationship('Bean', secondary='coffees', back_populates='users')
    coffees = db.relationship('Coffee', back_populates='user', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.id}, {self.name}> '
    
class Store(db.Model):
    __tablename__="stores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)

    users = db.relationship('User', secondary='coffees', back_populates='stores')
    beans = db.relationship('Bean',  secondary='coffees', back_populates='stores')
    coffees = db.relationship('Coffee', back_populates='store')

    def __repr__(self):
        return f'<Store {self.id}, {self.name}, {self.address}, {self.phone_number}> '
    
class Bean(db.Model):
    __tablename__="beans"

    id = db.Column(db.Integer, primary_key=True)
    roast = db.Column(db.String, nullable=False)
    origin = db.Column(db.String, nullable=False)

    users = db.relationship('User', secondary='coffees', back_populates='beans')
    stores = db.relationship('Store', secondary ='coffees', back_populates='beans')
    coffees = db.relationship('Coffee', back_populates='bean' )

    def __repr__(self):
        return f'<Bean {self.id}, {self.roast}, {self.origin}> '
    
class Coffee(db.Model):
    __tablename__="coffees"

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String, nullable=False)
    presentation = db.Column(db.String, nullable=False)
    price = db.Column(db.Float, nullable=False)

    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    store_id = db.Column(db.Integer, ForeignKey('stores.id'), nullable=False)
    bean_id = db.Column(db.Integer, ForeignKey('beans.id'), nullable=False)

    user = db.relationship('User', back_populates='coffees')
    store = db.relationship('Store', back_populates='coffees')
    bean = db.relationship('Bean', back_populates='coffees')

    def __repr__(self):
        return f'<Coffee {self.id}, {self.brand}, {self.presentation}, {self.price}> '

