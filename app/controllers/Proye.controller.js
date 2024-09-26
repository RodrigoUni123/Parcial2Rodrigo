const db = require('../config/db.config.js');
const Proyecto = db.Proyectos; // Cambiado a Proyectos

// Crear un nuevo proyecto
exports.create = (req, res) => {
    let proyecto = {};

    try {
        // Construir el objeto Proyecto a partir del cuerpo de la solicitud
        proyecto.Nombre = req.body.Nombre;
        proyecto.Descripcion = req.body.Descripcion;
        proyecto.Fecha_creacion = req.body.Fecha_creacion;

        // Guardar en la base de datos MySQL
        Proyecto.create(proyecto).then(result => {
            // Enviar mensaje de éxito al cliente    
            res.status(200).json({
                message: "Proyecto creado con éxito con id = " + result.id_proyecto,
                proyecto: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el proyecto",
            error: error.message
        });
    }
}

// Obtener todos los proyectos
exports.retrieveAllProyectos = (req, res) => {
    // Obtener todos los proyectos de la base de datos
    Proyecto.findAll()
        .then(proyectos => {
            res.status(200).json({
                message: "Proyectos obtenidos con éxito",
                proyectos: proyectos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los proyectos",
                error: error
            });
        });
}

// Actualizar un proyecto por ID
exports.updateById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No se encontró el proyecto con id = " + proyectoId,
                proyecto: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                Nombre: req.body.Nombre,
                Descripcion: req.body.Descripcion,
                Fecha_creacion: req.body.Fecha_creacion
            }
            let result = await Proyecto.update(updatedObject, { returning: true, where: { id_proyecto: proyectoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el proyecto con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Proyecto actualizado con éxito con id = " + proyectoId,
                proyecto: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el proyecto con id = " + req.params.id,
            error: error.message
        });
    }
}

// Eliminar un proyecto por ID
exports.deleteById = async (req, res) => {
    try {
        let proyectoId = req.params.id;
        let proyecto = await Proyecto.findByPk(proyectoId);

        if (!proyecto) {
            res.status(404).json({
                message: "No existe un proyecto con id = " + proyectoId,
                error: "404",
            });
        } else {
            await proyecto.destroy();
            res.status(200).json({
                message: "Proyecto eliminado con éxito con id = " + proyectoId,
                proyecto: proyecto,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el proyecto con id = " + req.params.id,
            error: error.message,
        });
    }
}