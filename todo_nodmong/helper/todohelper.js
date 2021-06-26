var db = require('../db/connection')
var collection = require('../db/collection')
var objectid = require('mongodb').ObjectID


module.exports = {

    getalllist: async (callback) => {

        let list = await db.get().collection(collection.TODO_COLLECTION).find().sort({status:1}).toArray()
        return callback(list)

    },
    deletefromlist: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.TODO_COLLECTION).removeOne({ _id: objectid(id) }).then((response) => {
                resolve(response)
            })
        })

    },
    updatelist: (obj) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.TODO_COLLECTION).updateOne({ _id: objectid(obj.id) }, {
                $set: {
                status:obj.status
                }
            }).then((response) => {
                resolve()
            })
        })

    },
    addtolist: (newlist, callback) => {
        db.get().collection(collection.TODO_COLLECTION).insertOne(newlist).then((data) => {

            return callback(data.ops[0]._id)
        })
    },

}