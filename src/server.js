require('dotenv/config');
import LabTrip from './app';

const app = LabTrip();

console.log(process.env.DATABASE_URL);

app.listen(process.env.PORT || 5001, function(){
        console.log('Rodando na porta 3000!');
});