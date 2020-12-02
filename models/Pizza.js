const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                type: Schema.Types.ObjectId,
                // the ref property tells the Pizza model which documents to search to find the right comments
                ref: 'Comment'
            }
        ]
    },
    // tells the schema that it can use virtuals
    {
        toJSON: {
            virtuals: true,
        },
        // we set id to false because this is a virtual that Mongoose returns, and we don't need it
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const pizza = await Pizza.findOne()
pizza.commentCount // 5

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;