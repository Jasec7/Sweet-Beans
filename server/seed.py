from app import app
from models import db, User, Coffee, Store, Bean

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        print("Deleting data...")
        Coffee.query.delete()
        Bean.query.delete()
        Store.query.delete()
        User.query.delete()

        print("creating users...")
        u1 = User(name = 'Jake')
        u1.password_hash = 'password123'
        u2 = User(name = 'Alex')
        u2.password_hash = 'password321'
        users = [u1, u2]
        db.session.add_all(users)
        db.session.commit()

        print("creating stores...")
        s1 = Store(name ='Arguello Market', address ='782 Arguello Blvd, San Francisco, CA 94118', phone_number ='4157515121')
        s2 = Store(name ='Cal-Mart', address ='3585 California St, San Francisco, CA 94118', phone_number ='4157513516')
        s3 = Store(name ='Lucky', address = '1750 Fulton St, San Francisco, CA 94117', phone_number ='4159236411')
        s4 = Store(name ='Falleti Foods', address = '308 Broderick St, San Francisco, CA 94117', phone_number ='4156264400')
        stores = [s1,s2, s3, s4]
        db.session.add_all(stores)
        db.session.commit()

        print("creating beans...")
        b1 = Bean(roast ='medium', origin ='ethiopia')
        b2 = Bean(roast ='dark', origin ='ethiopia')
        b3 = Bean(roast ='dark', origin ='guatemala')
        b4 = Bean(roast ='light', origin ='colombia')
        beans = [b1, b2, b3, b4]
        db.session.add_all(beans)
        db.session.commit()
        
        print("creating coffees...")
        c1 = Coffee(brand ='Noeh Valley', presentation ='Ground', price = 18.70, user = u1, store = s1, bean = b1)
        c2 = Coffee(brand ='Stumptown', presentation = 'Ground', price = 16.20, user = u1, store = s2, bean = b2)
        c3 = Coffee(brand ='Sight Glass', presentation ='Whole Bean', price = 19.15, user = u2, store = s3, bean = b3)
        c4 = Coffee(brand ='Linea', presentation ='Ground', price = 15.00, user = u2, store = s4, bean = b4)
        coffees = [c1, c2, c3, c4]
        db.session.add_all(coffees)
        db.session.commit()

        print("Seeding done!")