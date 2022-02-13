const express = require('express');
const { 
  userControllers, 
  loginControllers, 
  categoriesControllers, 
  postsControllers,
} = require('./src/controllers');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));

app.use(express.json());
app.use('/user', userControllers);
app.use('/login', loginControllers);
app.use('/categories', categoriesControllers);
app.use('/post', postsControllers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
