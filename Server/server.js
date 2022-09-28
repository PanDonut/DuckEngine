import fs from 'fs'
import express, { json } from 'express'
import Router from 'express-promise-router'
import { Server } from 'socket.io'
import config from './config.json'

// Create router
const router = Router()

// Main route serves the index HTML

// Everything else that's not index 404s
router.use('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Create express app and listen on port 4444
const app = express()
app.use(router)
const server = app.listen(process.env.PORT || 4444, () => {
    console.log(`Listening on port http://localhost:4444...`)
})

const ioServer = new Server(server, {
  cors: {
    origin: "*"
  }
})

let clients = {}

// Socket app msgs
ioServer.on('connection', (client) => {
    console.log(
        `${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
    )

    if (Object.keys(clients).length == config.maxplayers) {
        console.warn(`Disconnecting ${client.id}`, "Reason: Server full")
        client.disconnect();
    }
    clients[client.id] = {}

    client.on("UserData", (dat) => {
        var data = JSON.parse(dat);
        clients[client.id].name = data.name;
        console.log(client.id + " logged in as " + data.name + " (" + data.uid + ")")
    })

    //Add a new client indexed by his id
    // clients[client.id] = {
    //     position: [0, 0, 0],
    //     rotation: [0, 0, 0],
    // }

    ioServer.sockets.emit('move', clients)

    client.on('move', ({ id, rotation, position }) => {
        if (clients[id]) {
            clients[id].position = position
            clients[id].rotation = rotation
        }

        ioServer.sockets.emit('move', clients)
    })

    client.on('disconnect', () => {
        console.log(
            `User ${client.id} disconnected, there are currently ${ioServer.engine.clientsCount} users connected`
        )

        //Delete this client from the object
        delete clients[client.id]

        ioServer.sockets.emit('move', clients)
    })
})