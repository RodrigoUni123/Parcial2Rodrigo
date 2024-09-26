module.exports = (sequelize, Sequelize) => {
	const Tareas = sequelize.define('tareas', {	
	  id_tarea: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Nombre: {
			type: Sequelize.STRING(100),
	  },
	  Estado: {
			type: Sequelize.STRING(100),
  	},
	  Fecha_creacion: {
			type: Sequelize.DATE,
	},
    Fecha_vencimiento: {
          type: Sequelize.DATE,
      },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Tareas;
}