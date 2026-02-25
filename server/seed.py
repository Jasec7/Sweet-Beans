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
        print("creating stores...")
        print("creating beans...")
        print("creating coffees...")


        print("Seeding done!")