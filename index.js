const { Client, Intents, MessageEmbed , MessageAttachment } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login('ODcyMTA2NjM2MDIwNDQ1MTk0.YQlCmA.thXJJ-hxsUFcBsw-5Bvno2tOeFc');

const Canvas = require('canvas');

DisTube = require('distube'),
config = {
    prefix: "!",
    token: process.env.TOKEN || "NTQ2NzgxMjIxNjI0MjE3NjEw.YQlCVA.QwSudpsNmkSzWI9WYiQmxH_3v-I"
};


const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift();

    if (command == "play")
        distube.play(message, args.join(" "));

    if (["repeat", "loop"].includes(command))
        distube.setRepeatMode(message, parseInt(args[0]));

    if (command == "stop") {
        distube.stop(message);
        message.channel.send("Stopped the music!");
    }

    if (command == "skip")
        distube.skip(message);

    if (command == "queue") {
        let queue = distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
        let filter = distube.setFilter(message, command);
        message.channel.send("Current queue filter: " + (filter || "Off"));
    }
});

// Queue status template
const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

// DisTube event listeners, more in the documentation page
distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    ))
    .on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))
    .on("playList", (message, queue, playlist, song) => message.channel.send(
        `Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`
    ))
    .on("addList", (message, queue, playlist) => message.channel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });


client.on('guildMemberAdd', async member => {

	context.strokeRect(0, 0, canvas.width, canvas.height);

	context.font = '28px sans-serif';
	context.fillStyle = '#ffffff';
	context.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);


	context.font = applyText(canvas, `${member.displayName}!`);
	context.fillStyle = '#ffffff';
	context.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

});

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'join') {
		client.emit('guildMemberAdd', interaction.member);
	}
});

client.on('ready', () => {
    console.log(`Bot is ready as: ${client.user.tag}`);
    client.user.setStatus('online');

    console.log(client.user.presence.status);

});

client.on('message', async message => {
    //  RECIVIENDO EL MENSAJE
    console.log(message.content);
    if(message.content == "!ping"){
        message.reply("pong");
    }
    if(message.content === "!hola"){
        message.channel.send(`Hola : ${message.author}!`);
    }
    if(message.content === "!adios"){
        message.channel.send(`Adios : ${message.author}!`);
    }
    if(message.content.includes(`!test`)){
        message.channel.send(`PRUEBA TEST`);
        message.delete();
    }

    if (message.content === '!cualesmiavatar') {

        message.reply(message.author.displayAvatarURL());
    }

    if (message.content === '!join') {
        
        if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
        } else {
        message.reply('Necesitas unirte a un canal de voz');
        }
    }

    if (message.content === '!leave') {
        
        if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.leave();
        } else {
        message.reply('Necesitas unirte a un canal de voz');
        }
    }

    if(message.content === `!creador`){
        message.channel.send(`https://github.com/RodrigoSendinoSanz`);
    }

    if(message.content === `!CODEBOT`){
        const embed = new MessageEmbed()
        .setTitle(`Informacion de C0D3 _B0T`)
        .setColor(`#4BE400`)
        .setDescription(`Bot orientado a el desarrollo y la programacion \nCreado con node.js y discord.js`)
        .addField(`Nombre del servidor alojado`, message.guild.name, true)
        .addField(`Integrantes:`, message.guild.memberCount, true)
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(`https://media.giphy.com/media/jM23UwlHPtBZ7vHJCK/giphy.gif`)
        .setImage(`https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif`)
        .setFooter(`Creado por RodrigoSendinoSanz`)
        .setTimestamp()
        .setURL(`https://github.com/RodrigoSendinoSanz`)
        message.channel.send({embed});
    }

    if(message.content === `!comandos`){
        const embed = new MessageEmbed()
        .setTitle(`COMANDOS:`)
        .setColor(`#E49B00`)
        .addFields(
            { name: '!ping', value: 'responde pong' },
            { name: '!hola', value: 'te saluda' },
            { name: '!adios', value: 'te dice adios' },
            { name: '!test', value: 'hace una prueba' },
            { name: '!cualesmiavatar', value: 'te muestra tu avatar' },
            { name: '/join', value: 'se une al canal de voz' },
            { name: '/leave', value: 'sale del canal de voz' },
            { name: '!play (nombre de la cancion)', value: 'pone musica' },
            { name: '!stop', value: 'para la musica' },
            { name: '!creador', value: 'mustra el creador' },
            { name: '!CODEBOT', value: 'infromacion del bot' },
            { name: '!comandos', value: 'muestra estos comandos' },
            { name: '!operadoresrelacionales', value: 'Informacion de operadores relacionales' },
            { name: '!operadoreslogicos', value: 'Informacion de operadores logicos' },
            { name: '!ordenevaluacionoperadores', value: 'Informacion de ordende evaluacion' },
            { name: '!contadores', value: 'Informacion de contadore' },
            { name: '!acumuladores', value: 'Informacion de acumuladores' },
            { name: '!conmutadores', value: 'Informacion de conmutadores' },
            { name: '!procedimientos', value: 'Informacion de procedimientos' },
            { name: '!funciones', value: 'Informacion de funciones' },
            { name: '!for', value: 'Informacion de for' },
            { name: '!while', value: 'Informacion de while' },
            { name: '!switch', value: 'Informacion de switch' },
            { name: '!if', value: 'Informacion de if' },
            { name: '!ifelse', value: 'Informacion de if else' },
            { name: '!estructuras', value: 'Informacion de estructuras' },
            { name: '!array', value: 'Informacion dearrays' },
            { name: '!trabajarconarrays', value: 'Informacion de manipulacion de arrays' },
            { name: '!busquedaenarrays', value: 'Informacion de busqueda en arrays' },
            { name: '!ordenacionarrays', value: 'Informacion de ordenacionde arrays' },
            { name: '!conexionbasededatos', value: 'Informacion de conexion a la base de datos' },
            { name: '!registrobasededatos', value: 'Informacion de registro en base de datos' },
            { name: '!selecionarregistrobasededatos', value: 'Informacion de selecion de registros en base de datos' },
            { name: '!eliminararregistrobasededatos', value: 'Informacion de eliminacion de registros en base de datos' },
            { name: '!crearbasededatos', value: 'Informacion de creacionde base de datos' },
            { name: '!consultasbasicasbasededatos', value: 'Informacion deconsultas de bases de datos' },
            { name: '!borrar', value: 'borra 100 mensajes' },
            { name: 'cls', value: 'borra 100 mensajes' },
            { name: '!borrar1', value: 'borra 1 mensaje' },
            { name: '!borrar2', value: 'borra 2 mensajes' },
            { name: '!borrar3', value: 'borra 3 mensajes' },
            { name: '!borrar4', value: 'borra 4 mensajes' },
            { name: '!borrar5', value: 'borra 5 mensajes' },
            { name: '!borrar10', value: 'borra 10 mensajes' },
        )
        .setAuthor(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(`https://media.giphy.com/media/jM23UwlHPtBZ7vHJCK/giphy.gif`)
        .setFooter(`Creado por RodrigoSendinoSanz`)
        .setTimestamp()
        .setURL(`https://github.com/RodrigoSendinoSanz`)
        message.channel.send({embed});
    }

    if(message.content === `!operadoresrelacionales`){
        const embed = new MessageEmbed()
        .setTitle(`Operadores relacionales:`)
        .setColor(`#0000FF`)
        message.channel.send({embed})

        message.channel.send(`\n
        Los operadores relacionales comparan dos operandos y ofrecen como resultado un valor booleano (verdadero o falso). Se aplican a cualquier tipo de datos.

                '<' (menor que).
                
                '>' (mayor que).
                
                '<=' (menor o igual a).
                
                '>=' (mayor o igual a).
                
                '<>' (distinto de).
                
                '=' (igual a).
        
            x = 3>5
        `);
    }

    if(message.content === `!operadoreslogicos`){
        const embed = new MessageEmbed()
        .setTitle(`Operadores lógicos:`)
        .setColor(`#0099FF`)
        message.channel.send({embed})
        message.channel.send(`\n

        Los operadores lógicos se utilizan para construir expresiones de tipo booleano (resultado verdadero o falso) más complejas.

            And (conjunción): une dos expresiones booleanas (de resultado verdadero o falso). El resultado final será verdadero si las dos expresiones son verdaderas. 

            Or (disyunción): une dos expresiones booleanas. El resultado final será verdadero si las dos o una de las dos expresiones es verdadera.

            Not (negación): se aplica a un solo operando y cambia su valor de verdadero a falso o viceversa.

                a=3
                b=5
                evaluacion1 = a>b And b>1
                evaluacion2 = a>b Or b>1
                evaluacion3 = Not (a>b)
            
            Ejemplo:
                a=3
                b=5
                evaluacion1 = a>b && b>1
                evaluacion2 = a>b || b>1
                evaluacion3 = !(a>b)

    \nEsquema(OR,AND,NOT):`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/5ba1c35d-1a7f-497d-9955-b857ba8b3965/scormcontent/assets/RKabI66Al_hzkIW3_jfDlJ3UIsxZKM5sa.png`)
        message.channel.send(img);
    }

    if(message.content === `!ordenevaluacionoperadores`){
        const embed = new MessageEmbed()
        .setTitle(`Orden de evaluación de operadores:`)
        .setColor(`#3300CC`)
        message.channel.send({embed})
        message.channel.send(`
        Dentro de una expresión no todas las operaciones son resueltas a la vez. Por ejemplo, todos sabemos desde pequeños que una multiplicación tiene más prioridad que una suma.

        Veamos el orden de evaluación de los operadores más utilizados:
        
            1- ( )  Paréntesis, comenzando por los más internos.
            
            2- ^ Potencias.
            
            3- *   / Multiplicación, división.
            
            4- +   - Suma y resta.
            
            5- + Concatenación.
            
            6- >   <   >=   <=   <>  = Mayor que, menor que, mayor o igual a, menor o igual a, distinto de, igual a.
            
            7- Not Negación.
            
            8- And Conjunción.
            
            9- Or Disyunción.
        `);
    }
    /* CONTADORES ACUMULADORES Y  CONMUTADORES*/

    if(message.content === `!contadores`){
        const embed = new MessageEmbed()
        .setTitle(`Contadores:`)
        .setColor(`#FF6633`)
        message.channel.send({embed})
        message.channel.send(`\n
        Un contador es una variable de memoria cuyo valor se incrementa en una cantidad fija positiva o negativa. Normalmente va asociado a un bucle
        Hay 2 tipos:

        Contador de control de bucle: sirve para determinar el momento en que debe terminar un bucle o iteración. El siguiente ordinograma muestra una porción de programa que debe ejecutarse 10 veces. Cuando el contador alcanza el valor 10 el programa termina. En cada iteración escribe el valor del contador.
        
        Algoritmo contar
            c=0
            Repetir
                c=c+1
                Escribir c
            Mientras Que c<10
        FinAlgoritmo

        c=0
        do{
            c=c+1
            System.out.println(c)
        }while(c<10)

        Contador de sucesos: sirve para contar el número de veces que se cumple alguna condición. En el siguiente ejemplo queremos introducir la edad de 10 personas y contar cuántos son mayores de edad. La variable c nos sirve de contador de control de bucle para saber cuándo tiene que terminar el programa.
        La variable mayor es un contador de sucesos porque cuenta el número de veces que ocurre el suceso “entrada de una edad mayor o igual de 18 años”.

        Algoritmo contar
            c=0
            mayor=0
            Repetir
                c=c+1
                Leer edad
                Si edad>=18 Entonces
                    mayor=mayor+1
                FinSi
            Mientras Que c<10
            Escribir "Mayores de edad: ", mayor
        FinAlgoritmo

        c=0
        mayor=0
        do{
            c=c+1
            System.out.println("Introduce la edad: ")
            edad=in.nextInt()
            if(edad>=18){
                mayor=mayor+1
        }while(c<10)
        System.out.println("Mayores de edad: ", mayor)



    \nEsquema (Contador de control de bucle,Contador de sucesos):`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/03enCKrKbZtlWetc_xAPLaemjnfMuAETq.png`)
        const img1 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/n0UgvdjMuu1WcVOI_6cYS-L5f7U7nkZLc.png`)
        message.channel.send(img)
        message.channel.send(img1);
    }

    /* ACUMULADORES */
    if(message.content === `!acumuladores`){
        const embed = new MessageEmbed()
        .setTitle(`Acumuladores:`)
        .setColor(`#FFCC66`)
        message.channel.send({embed})
        message.channel.send(`\n
        
        Un acumulador es una variable de memoria cuyo valor se incrementa sucesivas veces en cantidades variables. 
        Se utiliza en aquellos casos en que se desea obtener el total acumulado de una serie de valores.

        Algoritmo contar
            suma=0
            prod=1
            c=8
            Repetir
                c=c+2
                suma=suma+c
                prod=prod*c
            Mientras Que c<30
            Escribir "Suma = ", suma
            Escribir "Producto = ", prod
        FinAlgoritmo


    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/STrRywTm2fU-2Jd4_h42KyAGMqK3sXEW7.png`)
        message.channel.send(img);
    }

    if(message.content === `!conmutadores`){
        const embed = new MessageEmbed()
        .setTitle(`Conmutadores:`)
        .setColor(`#FF6600`)
        message.channel.send({embed})
        message.channel.send(`\n
        Los conmutadores son variables de memoria que pueden tomar dos valores exclusivos: true/false, 0/1, 1/1, etc.\n
        
        - Recordar un suceso:\n
            Recordar en un determinado punto del programa la ocurrencia o no de un suceso anterior.


            El siguiente programa permite introducir la edad de 10 personas y detecta posteriormente si entró algún menor de edad. Para conseguirlo establecemos inicialmente la variable sw (switch) con el valor false y lo cambiaremos a true en cuanto se detecte la entrada de un menor de edad.

            Recordar un suceso: entrada de un menor de edad:

            Algoritmo comprobarSuceso
                c=0
                sw=Falso
                Repetir
                    c=c+1
                    Leer edad
                    Si edad<18 Entonces
                        sw=Verdadero
                    FinSi
                Mientras Que c<10
                Si sw=Verdadero Entonces
                    Escribir "Ha entrado un menor"
                FinSi
            FinAlgoritmo
             c=0
             sw=False
             do{
                 c=c+1
                 System.out.println("Introduce la edad: ")
                 edad=in.nextInt()
                 if(edad<18){
                     sw=True
                 }while(c<10)
                 if(sw=True){
                     System.out.println("Ha entrado un menor")
                 }


                 `);
        message.channel.send(`
            ¿Y si queremos optimizar el algoritmo de manera que si entra un menor de edad termine el proceso sin necesidad de tener que completar las 10 iteraciones? La solución es fácil, vamos a resolverlo con el siguiente pseudocódigo:

            Algoritmo comprobarSuceso
                c=0
                sw=Falso
                Repetir
                    c=c+1
                    Leer edad
                    Si edad<18 Entonces
                        sw=Verdadero
                    FinSi
                Mientras que sw=Falso y c<10
                Si sw=Verdadero Entonces
                    Escribir "Ha entrado un menor"
                FinSi
            FinAlgoritmo


            c=0
            sw=Falso
            do{
                c=c+1
                System.out.println("Introduce la edad: ")
                edad=in.nextInt()
                if(edad<18){
                    sw=Verdadero
            }while(c<10 && sw=Falso)
                if(sw=Verdadero){
                    System.out.println("Ha entrado un menor")
                }
        `);
        message.channel.send(`
        - Ejecución alternativa:\n
            Para hacer que dos acciones se ejecuten alternativamente dentro de un bucle.

            El siguiente programa permite mostrar alternativamente los mensajes “Hola” y “Adiós” en función de la variable sw (switch), que tomará los valores 1 y -1.


            Ejecución alternativa: Hola y Adiós

            Algoritmo conmutar
                c=0
                sw=1
                Repetir
                    c=c+1
                    sw=-sw
                    Si sw=1 Entonces
                        Escribir "Hola"
                    SiNo
                        Escribir "Adiós"
                    FinSi
                Mientras Que c<10
            FinAlgoritmo
            
            c=0
            sw=1
            do{
                c=c+1
                sw=-sw
                if(sw=1){
                    System.out.println("Hola")
                }else{
                    System.out.println("Adiós")
                }while(c<10)

    \nEsquemas:(Recordar susceso,Ejecución alternativa)`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/BG_QrtNNqmNWVz3s_gTsV6HJV6uWiHZi9.png`)
        const img1 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/cKZQM5agvBg-nq8S_8t0-2dSqN4ZbiJNu.png`)
        message.channel.send(img)
        message.channel.send(img1);
    }

    /*  PROCEDIMIENTOS Y FUNCIONES */
    if(message.content === `!procedimientos`){
        const embed = new MessageEmbed()
        .setTitle(`Procedimientos:`)
        .setColor(`#FFCC33`)
        message.channel.send({embed})
        message.channel.send(`\n
        
        En este apartado verás el ordinograma y el pseudocódigo de un pequeño programa modular que lee los tres lados de un triángulo e invoca a un procedimiento para comprobar si es equilátero, isósceles o escaleno.

        La diferencia con una función es que un procedimiento no entrega ningún valor como resultado.

        Algoritmo triangulos
            Leer l1
            Leer l2
            Leer l3
            tipoTriangulo(l1,l2,l3)
            Escribir "Fin del programa"
        FinAlgoritmo


        SubProceso tipoTriangulo(lado1, lado2, lado3)
            Escribir "Lados del triángulo: ", lado1, " - ", lado2, " - ", lado3
            Si lado1=lado2 Y lado2=lado3 Entonces
                Escribir "Equilátero"
            SiNo
                Si lado1=lado2 O lado2=lado3 O lado1=lado3 Entonces
                    Escribir "Isósceles"
                SiNo
                    Escribir "Escaleno"
                FinSi
            FinSi
        FinSubProceso


    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/XHjQhErX4NRQqQ1o_RebLrfowoQmFOfw9.png`)
        message.channel.send(img);
    }

    if(message.content === `!funciones`){
        const embed = new MessageEmbed()
        .setTitle(`Funciones:`)
        .setColor(`#FFFF33`)
        message.channel.send({embed})
        message.channel.send(`\n
        La diferencia es que la función retorna un valor. 

        Algoritmo triangulos
            Leer l1
            Leer l2
            Leer l3
            Escribir "Lados del triángulo: ", l1, " - ", l2, " - ", l3
            tipo = tipoTriangulo(l1,l2,l3)
            Escribir tipo
            Escribir "Fin del programa"
        FinAlgoritmo

        Funcion tipoTriangulo(lado1, lado2, lado3)
            Si lado1=lado2 Y lado2=lado3 Entonces
                resultado = "Equilátero"
            SiNo
                Si lado1=lado2 O lado2=lado3 O lado1=lado3 Entonces
                    resultado = "Isósceles"
                SiNo
                    resultado = "Escaleno"
                FinSi
            FinSi
                Devolver resultado
        FinFuncion

    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/9Sg4EXcZb3WqFF_X_xx2l_QJdBhxJ01BF.png`)
        message.channel.send(img);
    }

    /* ARRAY */

    if(message.content === `!array`){
        const embed = new MessageEmbed()
        .setTitle(`Array:`)
        .setColor(`#FF0033`)
        message.channel.send({embed})
        message.channel.send(`\n
        
        Un array es un conjunto de elementos organizados en memoria en posiciones contiguas. Todos los elementos son del mismo tipo y se puede acceder a ellos a partir de subíndices.

        Vector (array de una dimensión)

            Los vectores son arrays de una dimensión porque para acceder a cada uno de los elementos solo necesitamos un subíndice.

            Para acceder al elemento nº 7 (Lucas) lo hacemos así:

            nombre[7]

        Matriz (array de dos dimensiones)

            Las matrices son arrays de dos dimensiones porque para acceder a cada uno de los elementos necesitamos 2 subíndices.

            Para acceder al elemento de la fila 4 y la columna 3 (matrícula 7654ABJ) lo hacemos así:

            plaza[4,3]

        Cubos (array de tres dimensiones)

            Los cubos son arrays de tres dimensiones porque para acceder a cada uno de los elementos necesitamos 3 subíndices.

            Para acceder al elemento de la fila 4, la columna 3 y profundidad 0 (matrícula 7654ABJ) lo hacemos así:
            
            plaza[4,3,0]
            


        Arrays de más de tres dimensiones

            La mayoría de los lenguajes de programación permiten crear arrays de más de 3 dimensiones, aunque no es posible dibujarlos.
            
            Este es un ejemplo para acceder a un array de 4 dimensiones:
            
            plaza[4,3,2,1]


    \nEsquema (Vector,Matriz,Cubo):`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/uwVpAWmSHMc2VVb1_qrb2f7XM37HgqWaA.png`)
        const img2 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/jH8P1RT_eKeBs_wL_Rz0fn0cDyMkmhT4W.png`)
        const img3 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/WWeNACzrDBt6hAJF_K5eC7Z3nESSs3UYu.png`)
        message.channel.send(img)
        message.channel.send(img2)
        message.channel.send(img3);

    }
    if(message.content === `!trabajarconarrays`){
        const embed = new MessageEmbed()
        .setTitle(`Trabajar con arrays:`)
        .setColor(`#FF0099`)
        message.channel.send({embed})
        message.channel.send(`\n

        Pseudocódigo completo de carga y recorrido del vector nombre

            Algoritmo procesarVector
            // Declaración del vector.
            Dimension nombre[10]
            
            // Inicialización de los valores del vector.
            nombre[0] = "Pepe"
            nombre[1] = "Juan"
            nombre[2] = "Luis"
            nombre[3] = "Alicia"
            nombre[4] = "Rosa"
            nombre[5] = "Carlos"
            nombre[6] = "Pedro"
            nombre[7] = "Lucas"
            nombre[8] = "María"
            nombre[9] = "Carlota"
            
            // Recorrido del vector.
                para i=0 Hasta 9 Con Paso 1 Hacer
                    Escribir nombre[i]
                FinPara
            FinAlgoritmo

        Para recorrer los elementos de un vector necesitamos una estructura repetitiva de tipo para (for) con un contador que tome los valores de las distintas posiciones del array.

            para i=0 Hasta 9 Con Paso 1 Hacer
                Escribir nombre[i]
            FinPara
        `);
        message.channel.send(`

        Recorrido secuencial de una matriz

            Para recorrer secuencialmente cualquier tipo de array, necesitamos tantas estructuras para (for) como dimensiones tiene el array. En el caso de una matriz (2 dimensiones) necesitamos dos estructuras para, una dentro de otra. 
            En la imagen estamos recorriendo la matriz plaza utilizando los contadores f (para recorrer las filas) y c (para recorrer las columnas).

            Carga y recorrido de una matriz

            Utilizamos una matriz para gestionar la ocupación de plazas en un garaje. El garaje tiene 10 plantas (filas) y 7 plazas por planta (columnas). Cada celda de la matriz representa una plaza, que podrá contener el texto "Libre" o una matrícula cuando entre un coche.
            
                Algoritmo procesarMatriz
                    // Construcción de la matriz 
                    Dimension plaza[10,7]
                    
                    // Primero rellenamos todas las plazas como libres.
                    Para f=0 Hasta 9 Con Paso 1 Hacer
                        Para c=0 Hasta 6 Con Paso 1 Hacer
                            plaza[f,c]="libre"
                        FinPara
                    FinPara
                
                    `);
                    message.channel.send(`     
                    // Ahora entran coches. 
                    // Asigno a las plazas ocupadas la matricula correspondiente.
                    plaza[1,0]="1234BJK"
                    plaza[2,4]="9948LIP"
                    plaza[3,1]="2345HPJ"
                    plaza[4,3]="7654ABJ"
                    plaza[6,0]="3395RJK"
                    plaza[6,4]="3357BHA"
                    plaza[7,2]="9954PRJ"
                    plaza[8,6]="5594PJR"
                    
                    // Recorremos el array (las plazas) para informar sobre la ocupación.
                    Para f=0 Hasta 9 Con Paso 1 Hacer
                        Para c=0 Hasta 6 Con Paso 1 Hacer
                            Escribir "Plaza ", f, ".", c, ": ", plaza[f,c]
                        FinPara
                    FinPara
                FinAlgoritmo

    \nEsquema (Vector,Matriz):`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/Rlo5tDwL-rGMyktP_H80gUwuoZZaoK45q.png`)
        const img2 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/WcaFB7kvaXKLwb0Q_tGQPxnyjF4bRzdLJ.png`)
        message.channel.send(img)
        message.channel.send(img2);
    }

    if(message.content === `!busquedaenarrays`){
        const embed = new MessageEmbed()
        .setTitle(`Busqueda en arrays:`)
        .setColor(`#CC00FF`)
        message.channel.send({embed})
        message.channel.send(`\n

        Algoritmo de búsqueda secuencial

            Se trata de buscar un elemento determinado en el vector recorriendo todos los elementos desde la posición 0 hasta que lo encontremos, o bien hasta que lleguemos al final del vector sin encontrarlo.

            Sirve igualmente para buscar en vectores ordenados que desordenados.

            Algoritmo procesarVector
            // Declaración del vector.
            Dimension nombre[10]
            
            // Inicialización de los valores del vector.
            nombre[0] = "Pepe"
            nombre[1] = "Juan"
            nombre[2] = "Luis"
            nombre[3] = "Alicia"
            nombre[4] = "Rosa"
            nombre[5] = "Carlos"
            nombre[6] = "Pedro"
            nombre[7] = "Lucas"
            nombre[8] = "María"
            nombre[9] = "Carlota"
            `);
            message.channel.send(`   
            // Algoritmo de búsqueda
            Leer buscado
            Mientras i<10 Y nombre[i]<>buscado Hacer
                i=i+1
            Fin Mientras
            Si i=10 Entonces
                Escribir "No encontrado"
            SiNo
                Escribir "Encontrado en posición ", i
            FinSi
        FinAlgoritmo


    Algoritmo de búsqueda binaria

        Solo puede utilizarse en vectores ordenados. Consiste en determinar el elemento central del vector y utilizarlo para compararlo con el elemento buscado.
        Si el elemento buscado es menor que el central, sabremos que el elemento buscado está en la mitad inferior. Si el elemento buscado es mayor sabremos que esta en la mitad superior. Si el elemento buscado es igual al central habremos terminado nuestra búsqueda.

        Por lo explicado anteriormente llegamos a la conclusión de que hay que dividir el array en dos subarrays más pequeños, acotando así la búsqueda a la mitad del array. Después volveremos a dividir el subarray en otros dos y así sucesivamente hasta completar la búsqueda. Este procedimiento resulta mucho más rápido que la búsqueda secuencial, pero no hay que olvidar que es imprescindible que el array esté ordenado.

            Algoritmo procesarVector
                // Declaración del vector.
                Dimension nombre[10]
                `);
                message.channel.send(`   
                // Inicialización de los valores del vector.
                nombre[0] = "Alicia"
                nombre[1] = "Carlos"
                nombre[2] = "Carlota"
                nombre[3] = "Juan"
                nombre[4] = "Lucas"
                nombre[5] = "Luis"
                nombre[6] = "María"
                nombre[7] = "Pedro"
                nombre[8] = "Pepe"
                nombre[9] = "Rosa"
                
                // Búsqueda binaria
                Leer buscado
                
                inicio = 0
                final = 9
                posicion = -1 
                `);
                message.channel.send(`   
                Mientras posicion=-1 Y inicio <= final
                    medio = trunc((inicio+final)/2)
                    Si (nombre[medio]=buscado) Entonces
                        posicion = medio
                    SiNo
                        Si buscado<nombre[medio] Entonces
                            final=medio-1
                        SiNo
                            inicio = medio+1
                        FinSi
                    FinSi
                FinMientras	
                
                Si posicion > -1 Entonces
                    Escribir "Encontrado en posición ", posicion
                SiNo
                    Escribir "No encontrado"
                FinSi
            FinAlgoritmo
                    
    \nEsquema(búsqueda secuencial):`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/JO6l8PEJFuY1NSu1_1fnsR-_AochZsDi0.png`)
        message.channel.send(img);
    }

    if(message.content === `!ordenacionarrays`){
        const embed = new MessageEmbed()
        .setTitle(`Ordenación de arrays:`)
        .setColor(`#CC00CC`)
        message.channel.send({embed})
        message.channel.send(`\n
        
        En este apartado conocerás el algoritmo para ordenar un array por el método de la burbuja.

        El método de la burbuja consiste en ir comparando cada elemento del array con el siguiente e intercambiarlos si no están ordenados de la manera correcta. Este proceso tendrá que repetirse varias veces hasta que el array esté completamente ordenado.
   
            Algoritmo ordenarArray
                Dimension nombre(5);
                
                // Lee por teclado el nombre de 5 personas
                Para i=0 Hasta 4 Hacer
                    Leer nombre(i)
                FinPara
                
                // Ordena por el método de la burbuja
                Para i=0 hasta 4 Hacer
                    para j=0 hasta 3 Hacer
                        Si nombre(j)>nombre(j+1)
                            aux = nombre(j)
                            nombre(j) = nombre(j+1)
                            nombre(j+1) = aux
                        FinSi
                    FinPara
                FinPara
                
                // Muestra en pantalla los 5 nombres ya ordenados
                Para i=0 Hasta 4 Hacer
                    Escribir nombre(i)
                FinPara
                
            FinAlgoritmo


    \nEsquema:`);
        const img = new MessageAttachment(`https://upload.wikimedia.org/wikipedia/commons/c/c8/Bubble-sort-example-300px.gif`)
        message.channel.send(img);

    }

    /*BASE DE DATOS */

    if(message.content === `!conexionbasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Conexión a base de datos:`)
        .setColor(`#660099`)
        message.channel.send({embed})
        message.channel.send(`\n

    <?php

        class Conexion{
            static public function conectar(){
                #PDO("nombre del servidor; nombre de la base de datos", "usuario", "contraseña"))

                $link = new PDO("mysql:host=localhost;dbname=php",
                                "root",
                                "");

                $link->exec("SET NAMES utf8");

                return $link;
            }
        }

    ?>
    `);

    }

    if(message.content === `!registrobasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Registro de base de datos:`)
        .setColor(`#9933FF`)
        message.channel.send({embed})
        message.channel.send(`\n

        static public function mdlRegistro($tabla,$datos){

            #statement declaracion
             /* prepare() prepara una sentencia SQL para ser ejecutada por el metodo PDOStatement::execute() */
            $stmt = Conexion::conectar() -> prepare("INSERT INTO $tabla(nombre, email, password) VALUES
             (:nombre, :email, :password)");

             #bindParan(): para poder hacer aparecer a las variables ocultas(:nombre)
            $stmt -> bindParam(":nombre", $datos["nombre"],PDO::PARAM_STR);
            $stmt -> bindParam(":email", $datos["email"],PDO::PARAM_STR);
            $stmt -> bindParam(":password", $datos["password"],PDO::PARAM_STR);

            if($stmt -> execute()){
                return "ok";
            }
             else{
                print_r(Conexion::conectar()->errorInfo());
            }
            $stmt -> close();

            $stmt = null;
 
        }

    `);

    }

    if(message.content === `!selecionarregistrobasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Selección de registro de base de datos:`)
        .setColor(`#990066`)
        message.channel.send({embed})
        message.channel.send(`\n

        static public function mdlSeleccionarRegistros($tabla,$item,$valor){

            if($item == null && $valor == null){

                $stmt = Conexion::conectar() -> prepare("SELECT *,DATE_FORMAT(fecha,'%d/%m/%Y') AS
                 fecha FROM $tabla ORDER BY id DESC");

                $stmt -> execute();
    
                return $stmt -> fetchAll();

            }else{

                $stmt = Conexion::conectar() -> prepare("SELECT *,DATE_FORMAT(fecha,'%d/%m/%Y') AS
                 fecha FROM $tabla WHERE $item = :$item ORDER BY id DESC");


                $stmt -> bindParam(":".$item, $valor,PDO::PARAM_STR);

                $stmt -> execute();
    
                return $stmt -> fetch();

            }

            $stmt -> close();

            $stmt = null;

        }

    `);

    }

    if(message.content === `!actualizarregistrobasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Actualizar registro de base de datos:`)
        .setColor(`#660066`)
        message.channel.send({embed})
        message.channel.send(`\n

        static public function mdlActualizarRegistro($tabla,$datos){

            $stmt = Conexion::conectar() -> prepare("UPDATE $tabla SET nombre=:nombre, email=:email, password=:password WHERE id=:id");

            $stmt -> bindParam(":nombre", $datos["nombre"],PDO::PARAM_STR);
            $stmt -> bindParam(":email", $datos["email"],PDO::PARAM_STR);
            $stmt -> bindParam(":password", $datos["password"],PDO::PARAM_STR);
            $stmt -> bindParam(":id", $datos["id"],PDO::PARAM_INT);

            if($stmt -> execute()){
                return "ok";
            }
             else{
                print_r(Conexion::conectar()->errorInfo());
            }
            $stmt -> close();

            $stmt = null;
 
        }


    `);

    }

    if(message.content === `!eliminararregistrobasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Eliminar registro de base de datos:`)
        .setColor(`#990033`)
        message.channel.send({embed})
        message.channel.send(`\n

        static public function mdlEliminarRegistro($tabla,$valor){

            $stmt = Conexion::conectar() -> prepare("DELETE FROM $tabla WHERE id=:id");

            $stmt -> bindParam(":id", $valor,PDO::PARAM_INT);

            if($stmt -> execute()){
                return "ok";
            }
             else{
                print_r(Conexion::conectar()->errorInfo());
            }
            $stmt -> close();

            $stmt = null;
 
        }

    `);

    }

    if(message.content === `!crearbasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Crear base de datos:`)
        .setColor(`#6633CC`)
        message.channel.send({embed})
        message.channel.send(`\n

        create DATABASE IF NOT EXISTS BANCO;
            CREATE TABLE ´clientes´ (
            ´DNI´ char(9) NOT NULL,
            ´NOMBRE´ varchar(15) NOT NULL,
            ´APELLIDOS´ varchar(15) NOT NULL,
            ´DIRECCION´ varchar(50) DEFAULT ' ',
            ´FECHA_DE_ALTA´ date DEFAULT NULL,
            ´CREDITO´ int(11) DEFAULT NULL,
            ´NSUCURSAL´ int(11) DEFAULT NULL
            );

            INSERT INTO ´clientes´ (´DNI´, ´NOMBRE´, ´APELLIDOS´, ´DIRECCION´, ´FECHA_DE_ALTA´, ´CREDITO´, ´NSUCURSAL´) VALUES
            ('30515454K', 'Ana', 'Martín Martín', 'Calle del Socorro, 1', '2008-01-18', 1500, 1001),
            ('33358796A', 'Marta', 'López Ruiz', 'Calle Martinez, 76', '2014-09-17', 600, 1001),
            ('78458784B', 'Antonio', 'Castillo Mentas', 'Calle Soles, 14', NULL, 500, 1002);

            CREATE TABLE ´directores´ (
            ´ID´ int(11) NOT NULL,
            ´NOMBRE´ varchar(15) DEFAULT NULL,
            ´APELLIDOS´ varchar(15) DEFAULT NULL,
            ´SUELDO´ float DEFAULT NULL
            );
            `);
            message.channel.send(` 

            INSERT INTO ´directores´ (´ID´, ´NOMBRE´, ´APELLIDOS´, ´SUELDO´) VALUES
            (12, 'Alberto', 'Pérez Martín', 1800),
            (13, 'Pedro', 'García Martín', 1900),
            (15, 'Antonio', 'López López', 1500),
            (20, 'Silvia', 'Martín Martín', 1300);


            CREATE TABLE ´sucursales´ (
            ´NSUCURSAL´ int(11) NOT NULL,
            ´NOMBRE´ varchar(50) DEFAULT NULL,
            ´DIRECCION´ varchar(50) DEFAULT NULL,
            ´DIRECTOR´ int(11) DEFAULT NULL
            ) ;

            `);
            message.channel.send(` 

            INSERT INTO ´sucursales´ (´NSUCURSAL´, ´NOMBRE´, ´DIRECCION´, ´DIRECTOR´) VALUES
            (1001, 'Sucursal Centro', 'Avd. del Estilo, 45', 12),
            (1002, 'Sucursal Oeste', 'Avd. Mediterráneo, 14', 15),
            (1003, 'Sucursal Este', 'Calle Martínez, 45', 20),
            (1004, 'Sucursal Norte', 'Calle Especias, 23', NULL);

            --
            -- Índices para tablas volcadas
            --

            --
            -- Indices de la tabla ´clientes´
            --
            ALTER TABLE ´clientes´
            ADD PRIMARY KEY (´DNI´),
            ADD KEY ´DNI´ (´DNI´),
            ADD KEY ´NSUCURSAL´ (´NSUCURSAL´);

            --
            -- Indices de la tabla ´directores´
            --
            ALTER TABLE ´directores´
            ADD PRIMARY KEY (´ID´);

            --
            -- Indices de la tabla ´sucursales´
            --
            ALTER TABLE ´sucursales´
            ADD PRIMARY KEY (´NSUCURSAL´),
            ADD KEY ´DIRECTOR´ (´DIRECTOR´);

            --
            -- Restricciones para tablas volcadas
            --
            `);
            message.channel.send(` 
            --
            -- Filtros para la tabla ´clientes´
            --
            ALTER TABLE ´clientes´
            ADD CONSTRAINT ´clientes_ibfk_1´ FOREIGN KEY (´NSUCURSAL´) REFERENCES ´sucursales´ (´NSUCURSAL´) ON DELETE NO ACTION ON UPDATE NO ACTION;

            --
            -- Filtros para la tabla ´sucursales´
            --
            ALTER TABLE ´sucursales´
            ADD CONSTRAINT ´sucursales_ibfk_1´ FOREIGN KEY (´DIRECTOR´) REFERENCES ´directores´ (´ID´) ON DELETE NO ACTION ON UPDATE NO ACTION;
            COMMIT;

    `);

    }

    
    if(message.content === `!consultasbasicasbasededatos`){
        const embed = new MessageEmbed()
        .setTitle(`Consultas básicas:`)
        .setColor(`#6666FF`)
        message.channel.send({embed})
        message.channel.send(`\n
        use sakila;
            select * from sakila.actor where first_name='DAN';

            select * from sakila.inventory where film_id > 50;

            select distinct amount from sakila.payment where amount < 3;

            select * from sakila.city where city_id= 102;

            SELECT * FROM sakila.customer where store_id = 1;

            select * FROM  sakila.staff where staff_id <> 2;

            select * FROM sakila.language where name <> 'German';

            select description, release_year FROM sakila.film where title='IMPACT ALADDIN';

            SELECT * FROM sakila.payment where amount > 0.99;

            SELECT * FROM sakila.country WHERE country = 'Algeria' and country_id = 2;
            `);
            message.channel.send(` 
            SELECT * FROM sakila.country WHERE country = 'Algeria' or country_id = 12;

            select * from sakila.language where language_id = 1 or name= 'German';

            SELECT * FROM sakila.category WHERE not name='Action';

            select distinct(rating) from sakila.film where NOT rating = 'PG';

            select * from sakila.payment where customer_id =36 and amount > 0.99 and staff_id =1;

            select * from sakila.rental where not staff_id=1 and customer_id > 250 and inventory_id < 100;

            select *from sakila.customer where first_name IN('MARY','PATRICIA');

            SELECT * FROM sakila.film where special_features in('Trallers','Trailers,Deleted Scenes') and rating in('G','NC-17') and length> 50;

            select * from sakila.category where name not in('Action','Animation','Children');

            select * from sakila.film_text where title in ('ZORRO ARK','VIRGIN DAISY','UNITED PILOT');

            select * from sakila.city WHERE city in ('Chiayi','Dongying','Fukuyama','Kilis');
            `);
            message.channel.send(` 
            select * from sakila.rental where (customer_id between 300 and 350) and staff_id =1;

            select * from sakila.payment  where amount not between 3 and 5;

            select * from sakila. payment where (amount  between 2.99 and 4.99 ) and staff_id = 2 and customer_id in (1,2);

            select * from sakila.address where city_id between 300 and 350;

            select * from sakila.film where (rental_rate between 0.99 and 2.99) and (length <= 50 )and (replacement_cost < 20);
            `);
            message.channel.send(` 
            select * from sakila.actor where first_name LIKE "A%" and last_name like "B%";

            select * from sakila.actor where first_name LIKE "%A" AND last_name LIKE "%N";

            select * from sakila.actor where first_name LIKE "%NE%"AND last_name like "%RO%";

            select * from sakila.actor where first_name LIKE "C%N" AND last_name LIKE "G%";

            select * FROM sakila.film where release_year = 2006 and title LIKE "ALI%";

            select f.title,f.description,f.release_year,f.language_id
            from sakila.film f 
            inner join sakila.language l on (f.language_id=l.language_id);

    `);

    }

    /* BUCLES */

    /* FOR */
    if(message.content === `!for`){
        const embed = new MessageEmbed()
        .setTitle(`FOR:`)
        .setColor(`#0000CC`)
        message.channel.send({embed})
        message.channel.send(`\n
    El ciclo de una estructura for consta de estos pasos:\n

    for( inicialización; condición; incremento) {
        acciones
    }\n

    1. Inicializar el contador.
    2. Asignar una condición para que el contador se incremente.
    3. Mientras la condición sea verdadera, se ejecuta el código.
    4. Se incrementa el contador.


       1- Se inicializa un índice o contador con un valor inicial.
       2-Se evalúa la condición.
       3-Si la condición ha sido falsa termina la iteración y si la condición ha sido verdadera se ejecutan las acciones del bucle.
       4-Después de ejecutar las acciones del bucle se incrementa el contador en un valor positivo o negativo.
       5-Regreso al punto 3 (se evalúa la condición).\n

    Algoritmo contar
        Para i=1 Hasta 10 Con Paso 1 Hacer
            Escribir i
        Fin Para
    FinAlgoritmo\n

    for (var i = 0; i < 10; i++){
        console.log(i);
    }

    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/suFntn5UF0xUPwKz_xy_Q7cmKT7D_797H.png`)
        message.channel.send(img);
    }

    /* WHILE */

    if(message.content === `!while`){
        const embed = new MessageEmbed()
        .setTitle(`WHILE:`)
        .setColor(`#3300CC`)
        message.channel.send({embed})
        message.channel.send(`\n
        El ciclo de la estructura while tiene 2 variantes:

        - Condición / Acción: primero evalúa la condición y luego ejecuta el bloque de acciones. En este caso el bucle puede ejecutarse de 0 a infinitas veces.
        
        - Acción / Condición: primero ejecuta el bloque de acciones y luego evalúa la condición. En este caso el bucle puede ejecutarse de 1 a infinitas veces.\n

        Condición / Acción:
        while (condicion){
            acciones
        }

        Acción / Condición:
        do{
            acciones
        }while(condicion)\n



    Condición / Acción:
        Algoritmo contar
            i=0
            Mientras i<5 Hacer
                i=i+1
                Escribir i
            Fin Mientras
        FinAlgoritmo

        while(i<5){
            i=i+1
            console.log(i);
        }\n
    Acción / Condición:
        Algoritmo contar
            i=0
            Repetir
                i=i+1
                Escribir i
            Mientras Que i<5	
        FinAlgoritmo

        i=0
        do{
            i=i+1
            console.log(i);
        }while(i<5);
    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/knGT1YRYG-MJVjhv_7uNGhD0x1rpOwzVG.png`)
        message.channel.send(img);
    }

    /* SWITCH */

    if(message.content === `!switch`){
        const embed = new MessageEmbed()
        .setTitle(`SWITCH:`)
        .setColor(`#0033FF`)
        message.channel.send({embed})
        message.channel.send(`\n

        Dependiendo del contenido de una variable o del resultado de una expresión se ejecutará un bloque determinado de instrucciones dentro de un conjunto de ellos.

        switch (variable) {
            case valor1:
                accion1;
                break;
            case valor2:
                accion2;
                ...\n

        Algoritmo decision
            dia=3
            Segun dia Hacer
                1:
                    Escribir "Lunes"
                2:
                    Escribir "Martes"
                3:
                    Escribir "Miércoles"
                4:
                    Escribir "Jueves"
                5:
                    Escribir "Viernes"
                6:
                    Escribir "Sábado"
                7:
                    Escribir "Domíngo"
                De Otro Modo:
                    Escribir "Nº de día incorrecto"
            Fin Segun
        FinAlgoritmo\n

        switch(dia){
            case 1:
                console.log("Lunes");
                break;
            case 2:
                console.log("Martes");
                break;
            case 3:
                console.log("Miércoles");
                break;
            case 4:
                console.log("Jueves");
                break;
            case 5:
                console.log("Viernes");
                break;
            case 6:
                console.log("Sábado");
                break;
            case 7:
                console.log("Domingo");
                break;
            default:
                console.log("Nº de día incorrecto");
        }\n
     
    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/lSTm8qO1iF03h_Az_8kkMc2QS53dRparl.png`)
        message.channel.send(img);
    }


    /* IF */

    if(message.content === `!if`){
        const embed = new MessageEmbed()
        .setTitle(`IF:`)
        .setColor(`#0099FF`)
        message.channel.send({embed})
        message.channel.send(`\n
        Es un bloque de código compuesto por una o varias instrucciones se ejecutará en función del cumplimiento de una condición
        Si la condición es verdadera se ejecuta el bloque de código y si es falsa se salta el bloque de código.\n

        - El if se evalúa la condición y si es verdadera ejecuta el bloque de acciones.\n

    if (condicion){
        acciones
    }\n

    Algoritmo decision
        edad=12
        Si edad<18 entonces
            Escribir "Es menor de edad"
        FinSi
    FinAlgoritmo\n

    if(edad<18){
        console.log("Es menor de edad");
    }\n
     
    \nEsquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/_3xEIlD92aaNmgB5_X_tunWsEd7vtOCsR.png`)
        message.channel.send(img);
    }

    /* IFELSE */


    if(message.content === `!ifelse`){
        const embed = new MessageEmbed()
        .setTitle(`IFELSE:`)
        .setColor(`#00CCFF`)
        message.channel.send({embed})
        message.channel.send(`\n
        Si se cumple una condición se ejecuta un bloque de código y si no se cumple se ejecuta otro bloque de código diferente.\n

        - El if/else se evalúa la condición y si es verdadera ejecuta el bloque de acciones y si no ejecuta otro bloque de acciones.\n

        if(condicion){
            acciones
        }else{
            acciones2
        }\n

        Algoritmo decision
            edad=25
            Si edad<18 entonces
                Escribir "Es menor de edad"
            SiNo
                Escribir "Mayor de edad"
            FinSi
        FinAlgoritmo\n

        if(edad<18){
            console.log("Es menor de edad");
        }else{
            console.log("Es mayor de edad");
        }\n



        Algoritmo decision
            edad=12
            Si edad<13 Entonces
                Escribir "Infantil"
            SiNo Si edad<18 Entonces
                Escribir "Adolescente"
            SiNo Si edad<40 Entonces
                Escribir "Joven mayor de edad"
            SiNo Si edad<65 Entonces
                Escribir "Mayor de edad"
            SiNo
                Escribir "Jubilado"
            FinSi
        FinAlgoritmo\n

        if(edad<13){
            console.log("Infantil");
        }else if(edad<18){
            console.log("Adolescente");
        }else if(edad<40){
            console.log("Joven mayor de edad");
        }else if(edad<65){
            console.log("Mayor de edad");
        }else{
            console.log("Jubilado");
        }\n
    Esquema:`);
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/KxvRoOsenVcIqt_d_clQweUb1nyjy0qmW.png`)
        message.channel.send(img);
    }

    if(message.content === `!estructuras`){
        const embed = new MessageEmbed()
        .setTitle(`Estructuras:`)
        .setColor(`#00CC99`)
        message.channel.send({embed})
        const img = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/FoPFYB6YapK3d-y-_RzCLWAwYUxPQkuzt.png`)
        const img2 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/BotQ-N3AECM2XkSI_DJfkHwG2NNfu9K8s.png`)
        const img3 = new MessageAttachment(`https://institutotecnologico.edix.com/scorm-portlet/scorm/10154/58908/88949bc5-6907-4d94-8f1a-807a00c0f865/scormcontent/assets/Qp-BEfqFTXs_cPDa_ADf145MKTfQQXnck.png`)
        message.channel.send(`\n
        - Secuencial: ejecución lineal de una instrucción tras otra.
        - Alternativa: se ejecuta un bloque de instrucciones u otro dependiendo del cumplimiento de una condición.
        - Repetitiva: un bloque de instrucciones se ejecuta un número determinado de veces (bucle).

        Estructura secuencial:\n
            Algoritmo calcularLongitudCircunferencia
                Leer radio
                long=2*PI()*radio
                Escribir long
            FinAlgoritmo

        Estructura alternativa:\n
            Algoritmo comprobarEdad
                Leer edad
                Si edad<18
                    Escribir "Menor de edad"
                Sino
                    Escribir "Mayor de edad"
                FinSi
            FinAlgoritmo

        Estructura repetitiva:\n
            Algoritmo contar
                contador = 0;
                Mientras contador<10 Hacer
                    contador=contador+1
                    Escribir contador
                Fin Mientras
            FinAlgoritmo

        \nEsquemas(Secuencial,Alternativa,Repetitiva):`);
        message.channel.send(img);
        message.channel.send(img2);
        message.channel.send(img3);
    }



    /* BORRAR */
    if(message.content === `!borrar`){
        const fetched = await message.channel.messages.fetch({limit: 100});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `cls`){
        const fetched = await message.channel.messages.fetch({limit: 100});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `!borrar1`){
        const fetched = await message.channel.messages.fetch({limit: 1});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `!borrar2`){
        const fetched = await message.channel.messages.fetch({limit: 2});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `!borrar3`){
        const fetched = await message.channel.messages.fetch({limit: 3});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `!borrar4`){
        const fetched = await message.channel.messages.fetch({limit: 4});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `!borrar5`){
        const fetched = await message.channel.messages.fetch({limit: 5});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
    if(message.content === `!borrar10`){
        const fetched = await message.channel.messages.fetch({limit: 10});

        message.channel.bulkDelete(fetched);

        console.log(`Mensajes eliminados`);
    }
});