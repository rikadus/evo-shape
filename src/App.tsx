import { MeasurementForm } from './components/MeasurementForm';
import { useMeasurements } from './hooks/useMeasurements';
import './App.css';

// ID temporário para desenvolvimento
const TEMP_USER_ID = 'dev-user-v1';
function App() {
  // Inicializar o hook com um ID de usuário
  // Em uma app real, isso viria de um contexto de autenticação
  const { measurements, addMeasurement, deleteMeasurement } = useMeasurements(TEMP_USER_ID);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-2">
            Evo Shape
          </h1>
          <p className="text-lg text-slate-600">
            Acompanhe sua evolução corporal
          </p>
        </header>

        <main className="space-y-8">
          <section>
            <MeasurementForm onSubmit={addMeasurement} />
          </section>

          <section className="rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Histórico de Medidas</h2>
            
            {measurements.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <p>Nenhuma medida registrada ainda.</p>
                <p className="text-sm mt-2">Adicione sua primeira medida acima!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {measurements.map((measurement) => (
                  <div 
                    key={measurement.id} 
                    className="flex justify-between items-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200"
                  >
                    <div>
                      <p className="font-bold text-slate-900">
                        {new Date(measurement.date).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-sm text-slate-600">
                        Peso: {measurement.weight}kg
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMeasurement(measurement.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      Excluir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
