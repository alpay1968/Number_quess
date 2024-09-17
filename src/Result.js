import React from "react";

const Result = ({ term, secretNum, attempts,  }) => {
    let result;

    if (term) {
        const guess = parseInt(term, 10);
        if (isNaN(guess)) {
            result = 'Enter Valid Input';
        } else {
            if (secretNum > guess) {
                result = 'Yükselt bakam';
            } else if (secretNum < guess) {
                result = 'Düşür bakam';
            } else if (secretNum === guess) {
                result = `Bildin lan, Helal lan! ${attempts} denemede buldun.`;
            }
        }
    }

    return (
        <div>
            <h3>Tahminini: {term ? result : "yap entera bas"}</h3>
        </div>
    );
}

export default Result;
