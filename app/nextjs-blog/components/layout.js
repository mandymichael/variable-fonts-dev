import Header from '../components/header';
import Generic from '../styles/Generic.module.css';

export default function Layout({ children }) {
    return (
        <div className={Generic.pageContainer}>
            <Header />
            <main>{children}</main> 
        </div>
    ) ;
  }