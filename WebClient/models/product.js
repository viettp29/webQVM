const ObjectId = require('mongodb').ObjectId;
const { dbs } = require('../dbs');

const detail = async (id) => {
  const results = await dbs.production.collection('products').find({_id: ObjectId(id)})
    .toArray();
  return results[0];
};
exports.detail = detail;

const count = async() => {
  return await dbs.production.collection('products').find().count();
}
exports.count=count;

const count1 = async(loai) => {
  return await dbs.production.collection('products').find({loai}).count();
}
exports.count1=count1;

module.exports.list = async () => {
  return await dbs.production.collection('products').find().toArray();
};

module.exports.list1 = async (productInPage,n) => {
  return await dbs.production.collection('products').find().limit(productInPage).skip(productInPage*n).toArray();
};

module.exports.category = async (loai,productInPage,n) => {
  return await dbs.production.collection('products').find({loai}).limit(productInPage).skip(productInPage*n).toArray();
};

module.exports.category1 = async (loai) => {
  return await dbs.production.collection('products').find({loai}).toArray();
};

module.exports.search = async (key,productInPage,n) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).limit(productInPage).skip(productInPage*n).toArray();
};

const countSearch = async (key) => {
  await dbs.production.collection('products').createIndex( { ten: "text", loai: "text", gia: "text", manHinh: "text", rom: "text" } );
  return await dbs.production.collection('products').find({$text:{$search:key}}).count();
};
exports.countSearch=countSearch;