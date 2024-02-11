import mongoose from 'mongoose'

const MongoDB_URI = process.env.MongoDB_URI

let cashed = (global as any).mongoose || { conn: null, promise: null }

export const connectToDB = async () => {
    if(cashed.conn) return cashed.conn;
    
    if(!MongoDB_URI) throw new Error('MongoDB URI is missing!')
    
    cashed.promise = cashed.promise || mongoose.connect(MongoDB_URI, {
        dbName: 'evently',
        bufferCommands: false
    })
    
    cashed.conn = await cashed.promise
    
    return cashed.conn
}