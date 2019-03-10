var mongo = require('mongodb');
var MongodbClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
//console.log(ObjectID);
var urls = "mongodb://localhost:27017";
var mongos = {
    dbName: "exam",
    colname: "study",
    query: {},
    limit: 0,
    sort: {},
    skip: 0,
    newVal: {},
    type: "find",
    ck: null,
    connect: function(opt) {
        Object.assign(mongos, opt);
        MongodbClient.connect(urls, { useNewUrlParser: true }, function(err, db) {
            var fn = function(err, result) {
                if (err) {
                    return err;
                }
                mongos.ck && mongos.ck(result);
                db.close();
            }
            if (err) {
                return err;
            }
            var database = db.db(mongos.dbName);
            var collection = database.collection(mongos.colname);
            if (mongos.type === "find") {
                collection.find(mongos.query).skip(mongos.skip).limit(mongos.limit).toArray(fn)
            } else if (mongos.type === "insert") {
                collection.insert(mongos.query, fn);
            } else if (mongos.type === "update") {
                collection.update(mongos.query, mongos.newVal, fn);
            } else {
                collection[mongos.type](mongos.query, fn);
                // collection.deleteOne(mongos.query, fn);
            }
            //删除数据
            // collection.deleteOne(mongos.query, fn);
        })
    },
    createObjectID: function(id) {
        if (id && typeof id === "string") {
            return ObjectID(id);
        }
    }
}
module.exports = mongos;