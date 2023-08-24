import express from 'express' 
const app = express();
import exphbs from 'express-handlebars';
import sequelize from './DB/connection.js';
import path from 'path'
import flash from 'express-flash';
import {configSession} from './middleware/configSession.js';
import {sessionClient} from './middleware/SessionService.js';

//ROUTES
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productsRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve('views'));

 
app.use(configSession());
app.use(flash());
app.use(sessionClient)

app.use('/report',reportRoutes);
app.use('/products', productRoutes);
app.use('/', authRoutes);
app.get('/', (req, res) => res.render('auth_pages/login'));
app.use('/', (req, res) => res.status(404).render('notFound'));


sequelize
  .sync()
  // .sync({force:true})
  .then(() => {
    app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));

  })
  .catch((e) => {
    console.log(e);
  })


