import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb://admin:admin@ac-spiwr7q-shard-00-00.otvlb1o.mongodb.net:27017,ac-spiwr7q-shard-00-01.otvlb1o.mongodb.net:27017,ac-spiwr7q-shard-00-02.otvlb1o.mongodb.net:27017/?ssl=true&replicaSet=atlas-7jooxs-shard-0&authSource=admin&appName=parcial-1";

const client = new MongoClient(uri);
const db = client.db("AH20232CP1");

function filtroPorId(id) {
    if (ObjectId.isValid(id)) {
        return {
            $or: [
                { _id: new ObjectId(id) },
                { _id: id }
            ]
        };
    }

    return { _id: id };
}

export async function getProductos(filter = {}) {
    await client.connect();

    const filterMongo = {};

    if (filter?.nombre) {
        filterMongo.$text = { $search: filter.nombre };
    }

    if (filter?.marca) {
        filterMongo.marca = filter.marca;
    }

    if (filter?.categoria) {
        filterMongo.categoria = filter.categoria;
    }

    return db.collection("productos").find(filterMongo).toArray();
}

export async function getProductosId(id) {
    await client.connect();

    return db.collection("productos").findOne(filtroPorId(id));
}

export async function borrarProductos(id) {
    await client.connect();

    return db.collection("productos").deleteOne(filtroPorId(id));
}

export async function saveProductos(producto) {
    await client.connect();

    return db.collection("productos").insertOne(producto);
}

export async function editProducto(id, datos) {
    await client.connect();

    return db.collection("productos").updateOne(
        filtroPorId(id),
        { $set: datos }
    );
}