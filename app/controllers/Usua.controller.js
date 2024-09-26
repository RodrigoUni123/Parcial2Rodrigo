const db = require('../config/db.config.js');
const Usuario = db.Usuario;

exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.Nombre = req.body.Nombre;
        usuario.Correo = req.body.Correo;
        usuario.Password = req.body.Password;
        usuario.Fecha_creacion = req.body.Fecha_creacion;

        Usuario.create(usuario).then(result => {   
            res.status(200).json({
                message: "Usuario creado con éxito con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        });
    }
}

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Usuarios obtenidos con éxito",
                usuarios: usuarios
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los usuarios",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                Nombre: req.body.Nombre,
                Correo: req.body.Correo,
                Password: req.body.Password,
                Fecha_creacion: req.body.Fecha_creacion
            }
            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con éxito con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
}