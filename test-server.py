#!/usr/bin/env python3
import flask
import flask.ext.sqlalchemy
import flask.ext.restless

# Create the Flask application and the Flask-SQLAlchemy object.
app = flask.Flask(__name__)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///./test.db'
db = flask.ext.sqlalchemy.SQLAlchemy(app)

# Create your Flask-SQLALchemy models as usual but with the following two
# (reasonable) restrictions:
#   1. They must have a primary key column of type sqlalchemy.Integer or
#      type sqlalchemy.Unicode.
#   2. They must have an __init__ method which accepts keyword arguments for
#      all columns (the constructor in flask.ext.sqlalchemy.SQLAlchemy.Model
#      supplies such a method, so you don't need to declare a new one).
class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True)
    phone = db.Column(db.Integer)

class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    from_id = db.Column(db.Integer, db.ForeignKey('person.name'))
    to_id = db.Column(db.Integer, db.ForeignKey('person.name'))
    amount = db.Column(db.Float)
    date = db.Column(db.Date)

# Create the database tables.
db.create_all()

# Create the Flask-Restless API manager.
manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Person, methods=['GET', 'POST', 'DELETE'])
manager.create_api(Expense, methods=['GET','POST'])

# start the flask loop
app.run()