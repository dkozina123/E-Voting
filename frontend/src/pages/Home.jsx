import '../assets/styles/Home.css';
import homeimage from '../assets/images/josjedancetnik.jpg';
function Home() {
    return (
        <>
            <h1>Početna</h1>
            <span className="home-span">
                <div>
                <p className="home-p">E-Voting (elektroničko glasanje) je web platforma osmišljena za omogućavanje elektroničkog glasanja i obrade rezultata tijekom izbora i anketiranja. 
                    Za njeno funkcioniranje potreban je elektronički uređaj s pristupom internetu.</p>
                <p className="home-p">Glavni cilj E-Voting sustava jest olakšati građanima Republike Hrvatske sudjelovanje u izbornom procesu, 
                    povećati izlaznost birača te smanjiti logističke poteškoće povezane s fizičkim glasačkim mjestima. 
                    Sustav omogućuje smanjenje korištenja tiskanih materijala, pruža brže rezultate glasanja, 
                    uklanja potrebu za čekanjem u redovima te omogućuje glasanje osobama koje fizički ne mogu pristupiti glasačkom mjestu primjenom brojnih funkcionalnosti.</p>
                <p className="home-p">Internetska stranica namijenjena je svim punoljetnim građanima Republike Hrvatske i implementira najviše standarde sigurnosti, autentifikacije i validacije glasova, 
                    čime se osigurava pouzdanost i integritet izbornog procesa.</p>
                </div>
                <img src={homeimage} alt="Početna slika" />
            </span>
        </>);
}

export default Home;