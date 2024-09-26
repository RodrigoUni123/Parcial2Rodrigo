module.exports = (sequelize, Sequelize) => {
	const Proyecto = sequelize.define('proyecto', {	
	  id_proyecto: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Nombre: {
			type: Sequelize.STRING(100),
	  },
	  Descripcion: {
			type: Sequelize.TEXT,
  	},
	  Fecha_creacion: {
			type: Sequelize.DATE,
	  },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Proyecto;
}