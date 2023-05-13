import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function postMobilesInDB(data) {
    return await client
        .db("Mobiles")
        .collection("mobilesDetails")
        .insertMany(data);
}
export async function getAllMobiles() {
    return await client
        .db("Mobiles")
        .collection("mobilesDetails")
        .find({})
        .toArray();
}

export async function deleteOne(id) {
    return await client
        .db("Mobiles")
        .collection("mobilesDetails")
        .deleteOne({_id : ObjectId(id)})
}
