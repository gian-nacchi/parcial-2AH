import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { createToken } from "./token.service.js";

const uri = "mongodb://admin:admin@ac-spiwr7q-shard-00-00.otvlb1o.mongodb.net:27017,ac-spiwr7q-shard-00-01.otvlb1o.mongodb.net:27017,ac-spiwr7q-shard-00-02.otvlb1o.mongodb.net:27017/?ssl=true&replicaSet=atlas-7jooxs-shard-0&authSource=admin&appName=parcial-1";
const client = new MongoClient(uri);
const db = client.db("AH20232CP1");


export async function createUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if( existe ) throw new Error("No se pudo registrar")

    usuario.password = await bcrypt.hash(usuario.password, 11)

    await db.collection("usuarios").insertOne({...usuario, passwordConfirm: undefined})

    return { ...usuario, password: undefined }
}

export async function login(usuario) {
    await client.connect()
    const existe = await db.collection("usuarios").findOne({ email: usuario.email })

    if (!existe) throw new Error("No se pudo ingresar")

    const esValido = await bcrypt.compare( usuario.password, existe.password )

    if ( !esValido ) throw new Error("No se pudo ingresar")
    
    const token = createToken(existe)

    return { ...existe, password: undefined, _id: undefined, token: token }
}