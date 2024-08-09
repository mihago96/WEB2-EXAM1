import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import data from '../../data/data.json';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [date, setDate]=useState(new Date())
const list = data;
const [valeurPat, setValeurPat] = useState(null);



const calculatevaleurPat = () => {
        const possessions = data[1].data.possessions;
        const time = date.getTime();

        const valeur = possessions.reduce((acc, possession) => {
            const dateDebut = new Date(possession.dateDebut).getTime();
            const dateFin = possession.dateFin ? new Date(possession.dateFin).getTime() : null;

            if (time < dateDebut || (dateFin && time > dateFin)) {
                return acc;
            }

            let valeurActuelle = possession.valeur;

            if (possession.tauxAmortissement) {
                const anneeAmort = (time - dateDebut) / (1000 * 60 * 60 * 24 * 365);
                const tauxAmort = valeurActuelle * (possession.tauxAmortissement / 100) * anneeAmort;
                valeurActuelle = Math.max(0, valeurActuelle - tauxAmort);
            }

            if (possession.valeurConstante) {
                valeurActuelle += possession.valeurConstante;
            }

            return acc + valeurActuelle;
        }, 0);

        setValeurPat(valeur);
    };

  return (
    <>
    <div className="machin">
    <h2>Patrimoine de {list[1].data.possesseur.nom} : {valeurPat !== null && (
                    <span>{valeurPat} Ar</span>
                )}  
    </h2>
    
      <table
        class="table table-striped table-hover table-borderless table-primary align-middle"
        
      >
        <thead className="table-dark">
         
          <tr className='tittreTab'>
            <th className="border-start border-end">Libelle</th>
            <th className="border-start border-end">Valeur</th>
            <th className="border-start border-end">Date de debut</th>
            <th className="border-start border-end">Taux d'amortissement</th>
            <th className="border-start border-end">Valeur actuelle</th>
          </tr>
        </thead>
        <tbody className="table-dark">
          {list[1].data.possessions.map(e => {
            const dateDebut= new Date(e.dateDebut).toLocaleDateString();
            let valeurActuelle = e.valeur;

                        if (e.tauxAmortissement) {
                            const anneeAmort = (new Date().getTime() - new Date(e.dateDebut).getTime()) / (1000 * 60 * 60 * 24 * 365);
                            const tauxAmort = valeurActuelle * (e.tauxAmortissement / 100) * anneeAmort;
                            valeurActuelle = Math.max(0, valeurActuelle - tauxAmort);
                        }

                        if (e.valeurConstante) {
                            valeurActuelle += e.valeurConstante;
                        }

    return (<tr key={e.libelle}>
              <td className="border-start border-end">{e.libelle} </td>
              <td className="border-start border-end">{e.valeur} ar </td>
              <td className="border-start border-end">{dateDebut } </td>
              <td className="border-start border-end">{e.tauxAmortissement} % </td>
              <td className="border-start border-end">{valeurActuelle}</td>
            </tr>);
          })}
        </tbody>
        <tfoot>
          
        </tfoot>
      </table>
    </div>
<span className='span'>
  Veuillez insérer votre date : </span>

    <DatePicker
    selected={date}
    onChange={(date)=>setDate(date)}
    className='datePick'
    />
  
  
    <button onClick={calculatevaleurPat} className="Validation">Valider</button>
   
       </>
  )
}

export default App
