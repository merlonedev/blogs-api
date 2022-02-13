module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return BlogPost;
};