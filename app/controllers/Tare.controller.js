const db = require('../config/db.config.js');
const Tareas = db.Tareas;

exports.create = (req, res) => {
    let tarea = {};

    try {
        tarea.Nombre = req.body.Nombre;
        tarea.Estado = req.body.Estado;
        tarea.Fecha_creacion = req.body.Fecha_creacion;
        tarea.Fecha_vencimiento = req.body.Fecha_vencimiento;

        Tareas.create(tarea).then(result => {  
            res.status(200).json({
                message: "Tarea creada con éxito con id = " + result.id_tarea,
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la tarea",
            error: error.message
        });
    }
}

exports.retrieveAllTareas = (req, res) => {
    Tareas.findAll()
        .then(tareas => {
            res.status(200).json({
                message: "Tareas obtenidas con éxito",
                tareas: tareas
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener las tareas",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tareas.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No se encontró la tarea con id = " + tareaId,
                tarea: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                Nombre: req.body.Nombre,
                Estado: req.body.Estado,
                Fecha_creacion: req.body.Fecha_creacion,
                Fecha_vencimiento: req.body.Fecha_vencimiento
            }
            let result = await Tareas.update(updatedObject, { returning: true, where: { id_tarea: tareaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar la tarea con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Tarea actualizada con éxito con id = " + tareaId,
                tarea: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la tarea con id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tareas.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No existe una tarea con id = " + tareaId,
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Tarea eliminada con éxito con id = " + tareaId,
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la tarea con id = " + req.params.id,
            error: error.message,
        });
    }
}