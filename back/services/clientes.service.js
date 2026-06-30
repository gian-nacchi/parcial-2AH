import { readFile, writeFile, access } from "fs/promises"
import { constants } from "fs/promises"
import { MongoClient, ObjectId } from "mongodb"

const uri = "mongodb://admin:admin@ac-spiwr7q-shard-00-00.otvlb1o.mongodb.net:27017,ac-spiwr7q-shard-00-01.otvlb1o.mongodb.net:27017,ac-spiwr7q-shard-00-02.otvlb1o.mongodb.net:27017/?ssl=true&replicaSet=atlas-7jooxs-shard-0&authSource=admin&appName=parcial-1";

const client = new MongoClient(uri);

const db = client.db("AH20232CP1")   

export async function getProductosPorCliente(id) {
    await client.connect();

    return db.collection("productos")
        .find({ clienteId: new ObjectId(id) })
        .toArray();
}

export async function createCliente(cliente) {
    await client.connect();
    return db.collection("clientes").insertOne(cliente);
}

export async function getClientes() {
    await client.connect();
    return db.collection("clientes").find().toArray();
}