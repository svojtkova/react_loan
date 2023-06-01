import './App.css';
import { Form } from './components/form';
import { Card } from 'primereact/card';
import "primereact/resources/themes/soho-light/theme.css";     
import "primereact/resources/primereact.min.css";   


function App() {
  return (
    <div className="App backgound" >
        <Card className="form-card" title="Loan Defaulters Prediction">
       <Form/>
        </Card>
    </div>
  );
}

export default App;
