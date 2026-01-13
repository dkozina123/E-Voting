import { useState, useEffect } from "react";
import "../assets/styles/Vote.css"; // Reusing styles

function Result() {
    const [elections, setElections] = useState([]);
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [elecRes, candRes] = await Promise.all([
                    fetch("http://localhost:5000/api/elections").then(r => r.json()),
                    fetch("http://localhost:5000/api/candidates").then(r => r.json())
                ]);
                setElections(elecRes);
                setCandidates(candRes);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    // Filter finished elections
    const finishedElections = elections.filter(e => {
        if (!e.endTime) return false;
        return new Date() >= new Date(e.endTime);
    });

    const getWinner = (type) => {
        const typeCandidates = candidates.filter(c => c.electionType === type);
        if (typeCandidates.length === 0) return null;
        return typeCandidates.reduce((max, c) => c.votes > max.votes ? c : max, typeCandidates[0]);
    };

    return (
        <div className="result-container" style={{ padding: 20 }}>
            <h1>Rezultati Izbora</h1>

            {finishedElections.length === 0 ? (
                <p>Nema završenih izbora.</p>
            ) : (
                <div className="election-dashboard">
                    {finishedElections.map(e => {
                        const winner = getWinner(e.name);
                        return (
                            <div key={e._id} className="election-card closed" style={{ borderColor: 'gold', backgroundColor: '#fffbe6' }}>
                                <h2>{e.name}</h2>
                                <p><strong>Status:</strong> ZAVRŠENO</p>
                                <hr />
                                {winner ? (
                                    <div>
                                        <h3>Pobjednik:</h3>
                                        <p style={{ fontSize: '1.2rem', color: '#2e7d32' }}>{winner.name}</p>
                                        <p>{winner.votes} glasova</p>
                                    </div>
                                ) : (
                                    <p>Nema glasova</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Result;