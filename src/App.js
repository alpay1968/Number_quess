import React, { Component } from 'react';
import Result from './Result';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: '',
            attempts: 0,
            submittedTerm: null,
            round: 1,
            roundAttempts: [],
            totalAttempts: 0,
            secret: Math.floor(Math.random() * 20) + 1 // İlk gizli sayı
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            const guess = parseInt(this.state.term, 10);
            if (isNaN(guess)) {
                
                return ;
            }

            this.setState(prevState => {
                const newAttempts = prevState.attempts + 1;
                const newRoundAttempts = [...prevState.roundAttempts];

                if (prevState.secret === guess) {
                    if (prevState.round === 5) {
                        return {
                            round: 1,
                            roundAttempts: [...newRoundAttempts, newAttempts],
                            totalAttempts: prevState.totalAttempts + newAttempts,
                            attempts: 0,
                            submittedTerm: prevState.term,
                            term: '',
                            secret: Math.floor(Math.random() * 20) + 1 // Yeni gizli sayı oluştur
                        };
                    } else {
                        return {
                            round: prevState.round + 1,
                            roundAttempts: [...newRoundAttempts, newAttempts],
                            totalAttempts: prevState.totalAttempts + newAttempts,
                            attempts: 0,
                            submittedTerm: prevState.term,
                            term: '',
                            secret: Math.floor(Math.random() * 20) + 1 // Yeni gizli sayı oluştur
                            

                        };
                    }
                } else {
                    return {
                        attempts: newAttempts,
                        submittedTerm: prevState.term,
                        term: ''
                    };
                }
            });
        }
    }

    resetGame() {
        this.setState({
            round: 1,
            roundAttempts: [],
            totalAttempts: 0,
            attempts: 0,
            submittedTerm: null,
            term: '',
            secret: Math.floor(Math.random() * 20) + 1 // Yeni gizli sayı oluştur
        });
    }

    render() {
        return (
            <div className='container'>
                <div className='head'>
                    <label htmlFor='term'>
                        1-20 arasında bir sayı
                    </label>
                </div>
                <input
                    id='term'
                    type='text'
                    name='term'
                    value={this.state.term}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    autoComplete="off"
                />

                <Result
                    term={this.state.submittedTerm}
                    secretNum={this.state.secret}
                    attempts={this.state.attempts}
                    onReset={this.state.secret === parseInt(this.state.term, 10) ? this.resetGame : null}
                />

                <div className='attempts-info'>
                   
                    <table>
                        <thead>
                            <tr>
                                <th>Tur Deneme Sayısı</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.roundAttempts.map((attempt, index) => (
                                <tr key={index}>
                                    <td>Tur {index + 1}</td>
                                    <td>{attempt} denemede</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h4>Toplam Deneme: {this.state.totalAttempts}</h4>
                </div>
            </div>
        );
    }
}

export default App;
