import { useState } from "react";

function AdminCandidateManager({ candidates, deleteCandidate, addCandidate, resetVotes }) {
    const types = ['Presidential', 'Parliamentary', 'Local', 'EU'];
    const [activeTab, setActiveTab] = useState(types[0]);
    const [newCandidateName, setNewCandidateName] = useState("");

    const handleAdd = () => {
        if (!newCandidateName.trim()) return;
        addCandidate(newCandidateName, activeTab);
        setNewCandidateName("");
    };

    const filteredCandidates = candidates ? candidates.filter(c => c.electionType === activeTab) : [];

    return (
        <div className="admin-section">
            <h2>Upravljanje Kandidatima</h2>

            <div className="tabs">
                {types.map(type => (
                    <button
                        key={type}
                        className={`tab-btn ${activeTab === type ? 'active' : ''}`}
                        onClick={() => setActiveTab(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="tab-content">
                <div className="add-candidate-form">
                    <input
                        type="text"
                        placeholder={`Novi kandidat za ${activeTab}`}
                        value={newCandidateName}
                        onChange={(e) => setNewCandidateName(e.target.value)}
                    />
                    <button className="btn-add" onClick={handleAdd}>Dodaj</button>
                </div>

                <div className="candidate-list">
                    {filteredCandidates.length > 0 ? (
                        filteredCandidates.map(c => (
                            <div key={c._id} className="candidate-item">
                                <span className="candidate-info">
                                    <strong>{c.name}</strong>
                                    <span className="vote-count">Glasova: {c.votes}</span>
                                </span>
                                <button className="btn-delete" onClick={() => deleteCandidate(c._id)}>
                                    Ukloni
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="empty-msg">Nema kandidata u ovoj kategoriji.</p>
                    )}
                </div>
            </div>

            <hr className="divider" />
            <div className="danger-zone">
                <button className="btn-danger" onClick={resetVotes}>Resetiraj sve glasove</button>
            </div>
        </div>
    );
}

export default AdminCandidateManager;
