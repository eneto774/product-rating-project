
db = db.getSiblingDB('dfcom');

db.createCollection('products', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'description', 'price'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'Product name is required and must be a string'
        },
        description: {
          bsonType: 'string',
          description: 'Product description is required and must be a string'
        },
        price: {
          bsonType: 'number',
          minimum: 0,
          description: 'Product price is required and must be a positive number'
        },
        category: {
          bsonType: 'string',
          description: 'Product category must be a string'
        },
        imageUrl: {
          bsonType: 'string',
          description: 'Product image URL must be a string'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation date must be a date'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Update date must be a date'
        }
      }
    }
  }
});

db.createCollection('reviews', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['productId', 'rating', 'comment'],
      properties: {
        productId: {
          bsonType: 'objectId',
          description: 'Product ID is required and must be an ObjectId'
        },
        rating: {
          bsonType: 'number',
          minimum: 1,
          maximum: 5,
          description: 'Rating is required and must be between 1 and 5'
        },
        comment: {
          bsonType: 'string',
          description: 'Comment is required and must be a string'
        },
        reviewerName: {
          bsonType: 'string',
          description: 'Reviewer name must be a string'
        },
        createdAt: {
          bsonType: 'date',
          description: 'Creation date must be a date'
        },
        updatedAt: {
          bsonType: 'date',
          description: 'Update date must be a date'
        }
      }
    }
  }
});

db.products.createIndex({ name: 1 });
db.products.createIndex({ category: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ createdAt: -1 });

db.reviews.createIndex({ productId: 1 });
db.reviews.createIndex({ rating: 1 });
db.reviews.createIndex({ createdAt: -1 });

print('Database initialized successfully with collections and indexes');
