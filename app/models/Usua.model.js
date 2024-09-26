module.exports = (sequelize, Sequelize) => {
	const Usuario = sequelize.define('usuario', {	
	  id_usuario: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  Nombre: {
			type: Sequelize.STRING(100),
	  },
	  Correo: {
			type: Sequelize.STRING(100),
  	},
	  Password: {
			type: Sequelize.STRING(255),
	  },
	  Fecha_creacion: {
			type: Sequelize.DATE,
    },
    copyrightby: {
		type: Sequelize.STRING,
		defaultValue: 'UMG Antigua'
	  }
	});
	
	return Usuario;
}