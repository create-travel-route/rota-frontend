import { useTranslation } from 'react-i18next';
import './App.css';

function App() {
  const { t } = useTranslation();
  return <div className="App">{t('project.name')}</div>;
}

export default App;
