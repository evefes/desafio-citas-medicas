// importar librerias

const express = require ('express')
const axios = require ('axios')
const { v4:uuid } = require ('uuid')
const _ = require ('lodash')
const moment = require ('moment')
const chalk = require ('chalk')

// instanciar 
const app = express ()

app.listen(3000, () => {console.log("app escuchando puerto 3000")})

app.get("/crear", (req,res) => {
    console.log("ruta crear")
    axios.get('https://randomuser.me/api/?results=10')
    .then( ({data}) => {
        // userAPI -> OBJETO
        const userAPI = data.results[0]
        const { gender: gender, name:name,} = userAPI
        users.push({
            gender: gender,
            first:name.first,
            last:name.last,
            id:uuid().slice(0,6),
            timestamp:moment().format("MMMM Do YYYY, h:mm:ss a")
        });
        
        var result = _.chain(users)
        .groupBy("gender")
        .value();

        let Masculina = result['male'] || [];
        let Femenino = result['female'] || [];

        let listaFemenino = ''
        if (Femenino.length >= 1) {
            Femenino.forEach(persona => {
                listaFemenino += `<li>${persona.gender} - ${persona.first} - ${persona.last}`
            })
        }

        let listaMasculino = ''
        if (Masculino.length >= 1) {
            Masculino.forEach(persona => {
                listaMasculino += `<li>${persona.gender} - ${persona.first} - ${persona.last}`
            })
        }

        let respuestaFemenino = `<h2>Mujeres:</h2>
        <ol>
        ${listaFemenino}
        </ol`

        let respuestaMasculino = `<h2>Hombres:</h2>
        <ol>
        ${listaMasculino}
        </ol>`

        console.log(chalk.bgWhite.blue.bold(respuestaFemenino + "/n" + respuestaMasculino))

        res.send (respuestaFemenino + respuestaMasculino)
    })
})
