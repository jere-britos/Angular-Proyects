const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
	const { email, name, password } = req.body;

	try {
		//Verificar el email
		const usuario = await Usuario.findOne({ email });
		
		if( usuario ) { //Si Hay usuario
			return res.status(400).json({
				ok: false,
				msg: 'El usuario ya existe con este email'
			})
		}

		//Crear usuario con el modelo
		const dbUser = new Usuario( req.body );
		//Hashear contraseña
		const salt = bcrypt.genSaltSync();
		dbUser.password = bcrypt.hashSync( password, salt );
		//Generar JWT
		const token = await generarJWT(dbUser.id, name);
		await dbUser.save();
		//Generar una respuesa al usuario exitosa
		return res.status(201).json({
			ok: true,
			uid: dbUser.id, //me lo generó mongo
			name,
			email,
			token
		})
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador'
		})
	}
}

const loginUsuario = async(req, res = response) => {
	const { email, password } = req.body;
	try {
		//Verificar si el email existe
		const dbUser = await Usuario.findOne({ email });
		if( !dbUser ){
			return res.status(400).json({
				ok: false,
				msg: 'El correo no existe'
			});
		}

		//Confirmar si la contraseña hace match
		const validPassword = bcrypt.compareSync(password, dbUser.password);
		if(!validPassword){
			return res.status(400).json({
				ok: false,
				msg: 'El password no es valido'
			});
		}

		//Generar el JWT 
		const token = await generarJWT( dbUser.id, dbUser.name );

		//Respuestas del servicio
		return res.json({
			ok: true,
			uid: dbUser.id,
			name: dbUser.name,
			email: dbUser.email,
			token
		})

	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
	}
}

const revalidarToken = async(req, res = response) =>{
	const { uid } = req;

	//Leer la base de datos
	
	const dbUser = await Usuario.findById(uid);

	try {
		//Generar el JWT
		const token = await generarJWT(uid, dbUser.name);
		return res.json({
		 ok: true,
		 uid,
		 name: dbUser.name,
		 email: dbUser.email,
		 token
		});
		
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: 'Hable con el administrador'
		})
	}
	
}

module.exports = {
    crearUsuario: crearUsuario,
    loginUsuario: loginUsuario,
    revalidarToken: revalidarToken
}