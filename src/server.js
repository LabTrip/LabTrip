import LabTrip from './app';

const app = LabTrip();

app.listen(PORT || 80, function(){
        console.log('Rodando na porta 3000!');
});