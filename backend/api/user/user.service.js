
const dbService = require('../../services/db.service')
const reviewService = require('../review/review.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    if (filterBy.top) {
        console.log('going to iner function');

        return _getTopPlayers(filterBy.top)
    }
    const collection = await dbService.getCollection('user')
    try {
        const users = await collection.find(criteria).toArray();
        users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password

        user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
        user.givenReviews = user.givenReviews.map(review => {
            delete review.byUser
            return review
        })


        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    user.lastLogin = [Date.now()]
    user.wins = []
    user.loses = []
    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.username = filterBy.txt
    }
    if (filterBy.top) {
    }
    return criteria;
}

async function _getTopPlayers(limit) {


    const collection = await dbService.getCollection('user')

    try {
        const users = await collection.aggregate([
            {
                $addFields: { wins_count: { $size: { "$ifNull": ["$wins", []] } } }
            },
            {
                $sort: { "wins_count": -1 }
            },
            { $limit: +limit }
        ]).toArray();
        users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find top users')
        throw err;
    }

}


// db.test.aggregate([
//     {
//         $project : { wins_count: {$size: { "$ifNull": [ "$wins", [] ] } } }
//     }, 
//     {   
//         $sort: {"wins_count":1} 
//     }
// ])


