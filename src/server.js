require('dotenv/config');
import LabTrip from './app';

const app = LabTrip();

app.listen(process.env.PORT || 5001, function(){
        console.log('Hello!');
});