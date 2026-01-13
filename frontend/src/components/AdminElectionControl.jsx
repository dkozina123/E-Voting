import { useState } from "react";

function AdminElectionCard({ election, updateElection }) {
    // Helpers to get initial values
    const getInitialDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString);
        const offset = date.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - offset);
        return localDate.toISOString().slice(0, 10);
    };

    const getInitialHour = (isoString) => {
        if (!isoString) return "12";
        const date = new Date(isoString);
        return date.getHours().toString().padStart(2, '0');
    };

    const getInitialMinute = (isoString) => {
        if (!isoString) return "00";
        const date = new Date(isoString);
        return date.getMinutes().toString().padStart(2, '0');
    };

    // State
    const [startDate, setStartDate] = useState(getInitialDate(election.startTime));
    const [startHour, setStartHour] = useState(getInitialHour(election.startTime));
    const [startMinute, setStartMinute] = useState(getInitialMinute(election.startTime));

    const [endDate, setEndDate] = useState(getInitialDate(election.endTime));
    const [endHour, setEndHour] = useState(getInitialHour(election.endTime));
    const [endMinute, setEndMinute] = useState(getInitialMinute(election.endTime));

    const handleUpdate = () => {
        let startCombined = "";
        let endCombined = "";

        if (startDate) {
            startCombined = new Date(`${startDate}T${startHour}:${startMinute}:00`).toISOString();
        }
        if (endDate) {
            endCombined = new Date(`${endDate}T${endHour}:${endMinute}:00`).toISOString();
        }

        updateElection(election.name, startCombined, endCombined);
    };

    // Helper to get current combined times for status check
    const getCurrentStartTime = () => {
        if (startDate) return new Date(`${startDate}T${startHour}:${startMinute}:00`);
        return null;
    };

    const getCurrentEndTime = () => {
        if (endDate) return new Date(`${endDate}T${endHour}:${endMinute}:00`);
        return null;
    };

    const isActive = () => {
        const currentStartTime = getCurrentStartTime();
        const currentEndTime = getCurrentEndTime();
        if (!currentStartTime || !currentEndTime) return election.isOpen;
        const now = new Date();
        return now >= currentStartTime && now < currentEndTime;
    };

    const isFinished = () => {
        const currentEndTime = getCurrentEndTime();
        if (!currentEndTime) return false;
        return new Date() >= currentEndTime;
    };

    let status = "ZAKAZANO";
    let statusClass = "scheduled";

    if (isActive()) {
        status = "OTVORENO";
        statusClass = "open";
    } else if (isFinished()) {
        status = "ZAVRŠENO";
        statusClass = "closed";
    }

    // Generate options 00-23 and 00-59
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
        <div className={`admin-card ${statusClass}`}>
            <div className="election-info">
                <h3>{election.name}</h3>
                <p className="status-text">Status: {status}</p>
            </div>

            <div className="election-controls">
                <div className="control-group">
                    <label>Početak</label>
                    <div className="input-row">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <div className="time-selects">
                            <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                                {hours.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span>:</span>
                            <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
                                {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="control-group">
                    <label>Kraj</label>
                    <div className="input-row">
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <div className="time-selects">
                            <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                                {hours.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span>:</span>
                            <select value={endMinute} onChange={(e) => setEndMinute(e.target.value)}>
                                {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <button
                    className="btn-update"
                    onClick={handleUpdate}
                >
                    Spremi
                </button>
            </div>
        </div>
    );
}

function AdminElectionControl({ elections, updateElection }) {
    return (
        <div className="admin-section">
            <h2>Upravljanje Izborima (Termini)</h2>
            <div className="election-grid">
                {elections.map(e => (
                    <AdminElectionCard
                        key={e._id}
                        election={e}
                        updateElection={updateElection}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminElectionControl;
