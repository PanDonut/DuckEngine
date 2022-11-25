import fs from 'fs'
import express, { json } from 'express'
import Router from 'express-promise-router'
import { Server } from 'socket.io'
import config from './config.json'
import cors from 'cors'
const cert = fs.readFileSync('./cert/CA.pem');

// Create router
const router = Router()

// Main route serves the index HTML

// Everything else that's not index 404s
// router.use('*', (req, res) => {
//     res.status(404).send({ message: 'Not Found' })
// })



// Create express app and listen on port 4444
const app = express()

app.use(cors());

const server = app.listen(process.env.PORT || 4444, () => {
    console.log(`Listening on port http://localhost:4444...`)
})

const ioServer = new Server(server, {
  cors: {
    origin: "*"
  }
})

let clients = {}

app.get("/players", function (req, res) {
    res.json(clients);
});

app.get("/config", function (req, res) {
    res.json(config);
});

var GameData = {
    "points": {
        "blue": 0,
        "green": 0
    }   
}

function UpdateGameData() {
    ioServer.sockets.emit("gamedata", GameData)
}

setInterval(() => {
    UpdateGameData()
}, config.sv.gamedataInterval)

// Socket app msgs
ioServer.on('connection', (client) => {
    console.log(
        `${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
    )  
  
    clients[client.id] = {}
    clients[client.id].team = Object.entries(clients).filter(item => item[1].team == "green").length > Object.entries(clients).filter(item => item[1].team == "blue").length ? "blue" : "green";
    console.log(Object.entries(clients))
    console.log(clients[client.id].team)
    clients[client.id].health = 125;

    if (Object.keys(clients).length == config.maxplayers + 1) {
        console.warn(`Disconnecting ${client.id}`, "Reason: Server full")
        client.disconnect();
        delete clients[client.id]
    }

    client.on("UserData", (dat) => {
        var data = JSON.parse(dat);
        clients[client.id].name = data.name;        
        console.log(client.id + " logged in as " + data.name + " (" + data.uid + ")")
    })

    client.on("state", (state) => {
        clients[client.id].state = state;
    })
    client.on("respawn", (state) => {
        clients[client.id].health = 125;
    })

    client.on("weaponstate", (state) => {
        clients[client.id].WState = state; 
        setTimeout(() => {
            clients[client.id].WState = "not_av"; 
        }, 100)      
    })

    client.on("dmg", (data) => {    
        if (clients[data.id].health > 0) {
            if (config.sv.friendlyFire == false) {
                if (clients[data.id].team != clients[client.id].team || client.id == data.id) {
                    console.log(`(${data.id}) ${clients[data.id].name} took ${data.dmg} damage (now ${clients[data.id].health - data.dmg})`)
                    clients[data.id].health = clients[data.id].health - data.dmg;
                    clients[data.id].lastDamage = client.id;
                }
            } else {
                console.log(`(${data.id}) ${clients[data.id].name} took ${data.dmg} damage (now ${clients[data.id].health - data.dmg})`)
                clients[data.id].health = clients[data.id].health - data.dmg;
            }        
            if (clients[data.id].health <= 0) {
                ioServer.sockets.emit("kill", { who: [data.id, clients[data.id].team], by: [client.id, clients[client.id].team], weapon: data.weapon })
                if (config.map.includes("de_")) {
                    ++GameData.points[clients[client.id].team]
                }
            }
        }
    })

    client.on("selW", (data) => {
        clients[client.id].selW = data;
    })

    client.on("loadout", (data) => {
        clients[client.id].loadout = data;
    })

    client.on("audioEmit", (data) => {
        ioServer.sockets.emit("audio", data)
    })

    client.on("spawnProjectileEmit", (data) => {
        ioServer.sockets.emit("spawnProjectile", data)
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